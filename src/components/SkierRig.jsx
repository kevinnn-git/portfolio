import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Line } from '@react-three/drei'
import * as THREE from 'three'

export const SkierRig = ({ noise2D }) => {
    const group = useRef()
    const bodyRef = useRef()


    // Refs for individual parts if needed later


    const scroll = useScroll()

    // Reusing the same curve as the CameraRig but we will sample it with an offset
    // Ideally this curve should be shared (hoisted to App/Context), but for now we duplicate it to match.
    // Ensure this matches CameraRig.jsx exactly!
    const curve = useMemo(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 25, 25),
        new THREE.Vector3(5, 12, 10),
        new THREE.Vector3(-2, 14, 5),
        new THREE.Vector3(4, 13, 2),
        new THREE.Vector3(-5, 14, 0),
        new THREE.Vector3(0, 20, -20),
        new THREE.Vector3(0, 15, -40),
    ]), [])

    // Material for the rock
    const rockMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#FFD700',
        roughness: 0.2,
        metalness: 0.8,
        emissive: '#ffaa00',
        emissiveIntensity: 2.0,
        flatShading: true
    }), [])

    const curveLength = useMemo(() => curve.getLength(), [curve])

    useFrame((state, delta) => {
        if (!group.current) return

        // 1. Calculate Position along the path
        const scrollOffset = scroll.offset

        // We want the rock to be "ahead" of the camera.
        const lead = 0.08

        let skierT = scrollOffset + lead
        if (skierT > 1) skierT = 1

        const point = curve.getPoint(skierT)
        const tangent = curve.getTangent(skierT).normalize()

        // 2. Grounding (Terrain Height)
        const x = point.x
        const z = point.z

        let elevation = 0
        if (noise2D) {
            elevation += noise2D(x * 0.03, -z * 0.03) * 6
            elevation += noise2D(x * 0.1, -z * 0.1) * 2
            elevation += noise2D(x * 0.4, -z * 0.4) * 0.4

            elevation = Math.pow(Math.abs(elevation), 1.25)
            if (elevation < 0) elevation = 0
        }

        // Apply Position
        // y = elevation + offset.
        // Raise to 0.35 to ensure it sits on top of snow without clipping
        group.current.position.set(x, elevation + 0.35, z)

        // 3. Orientation (Slope Alignment)
        const d = 0.5
        const getElev = (x, z) => {
            if (!noise2D) return 0
            let e = 0
            e += noise2D(x * 0.03, -z * 0.03) * 6
            e += noise2D(x * 0.1, -z * 0.1) * 2
            e += noise2D(x * 0.4, -z * 0.4) * 0.4
            e = Math.pow(Math.abs(e), 1.25)
            return e < 0 ? 0 : e
        }

        const e0 = elevation
        const eX = getElev(x + d, z)
        const eZ = getElev(x, z + d)

        const vX = new THREE.Vector3(d, eX - e0, 0)
        const vZ = new THREE.Vector3(0, eZ - e0, d)
        const normal = new THREE.Vector3().crossVectors(vZ, vX).normalize()

        group.current.up.lerp(normal, 0.1)
        group.current.up.normalize()

        const lookTarget = point.clone().add(tangent)
        group.current.lookAt(lookTarget)

        // 4. Rolling Physics
        // Rolling Angle = Distance / Radius
        // Radius of rock = 0.5 (geometry) * 0.5 (scale) = 0.25
        const radius = 0.25
        const distance = skierT * curveLength
        const rotationAngle = distance / radius

        if (bodyRef.current) {
            bodyRef.current.rotation.x = rotationAngle
            // Add a little wobble for "imperfect" rolling
            bodyRef.current.rotation.z = Math.sin(rotationAngle * 0.5) * 0.2
            bodyRef.current.rotation.y = Math.cos(rotationAngle * 0.3) * 0.2
        }
    })

    return (
        <>
            <group ref={group} scale={[0.5, 0.5, 0.5]}>
                {/* Rolling Rock Character */}
                <group ref={bodyRef}>
                    <mesh material={rockMaterial} castShadow>
                        <dodecahedronGeometry args={[0.5, 0]} />
                    </mesh>
                    {/* Emitting Light Source */}
                    <pointLight color="#ffaa00" intensity={5} distance={8} decay={2} />
                </group>
            </group>

            {/* Golden Path Line */}
            <PathLine curve={curve} noise2D={noise2D} />
        </>
    )
}

const PathLine = ({ curve, noise2D }) => {
    const { pointsOutline, pointsCore } = useMemo(() => {
        if (!curve || !noise2D) return { pointsOutline: [], pointsCore: [] }
        const pts = curve.getPoints(800)

        const pointsOutline = pts.map(p => {
            const x = p.x
            const z = p.z
            let e = 0
            e += noise2D(x * 0.03, -z * 0.03) * 6
            e += noise2D(x * 0.1, -z * 0.1) * 2
            e += noise2D(x * 0.4, -z * 0.4) * 0.4
            e = Math.pow(Math.abs(e), 1.25)
            if (e < 0) e = 0
            return [x, e + 0.35, z] // Lifted higher
        })

        const pointsCore = pts.map(p => {
            const x = p.x
            const z = p.z
            let e = 0
            e += noise2D(x * 0.03, -z * 0.03) * 6
            e += noise2D(x * 0.1, -z * 0.1) * 2
            e += noise2D(x * 0.4, -z * 0.4) * 0.4
            e = Math.pow(Math.abs(e), 1.25)
            if (e < 0) e = 0
            return [x, e + 0.4, z]
        })

        return { pointsOutline, pointsCore }
    }, [curve, noise2D])

    return (
        <group>
            {/* Dark Outline/Shadow for Contrast on White Snow */}
            <Line
                points={pointsOutline}
                color="#000000"  // Solid Black Outline
                lineWidth={5}
                opacity={1}
                transparent={false}
            />

            {/* Bright Golden Core */}
            <Line
                points={pointsCore}
                color="#FFD700"
                lineWidth={2.5}
                opacity={1}
                transparent={false}
            />
        </group>
    )
}
