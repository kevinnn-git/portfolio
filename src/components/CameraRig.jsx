import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'

export const CameraRig = ({ noise2D }) => {
    const scroll = useScroll()
    const cameraRef = useRef()

    // Waypoints for the camera path
    // [x, y, z] for position, target/lookAt could be separate or just fixed orientation
    const curve = useMemo(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 25, 25),     // 0: Start (Higher up to avoid clip)
        new THREE.Vector3(5, 12, 10),     // 1: About (Closer)
        new THREE.Vector3(-2, 14, 5),     // 2: Skills (Higher to avoid clipping)
        new THREE.Vector3(4, 13, 2),      // 3: Certifications (New angle)
        new THREE.Vector3(-5, 14, 0),     // 4: Experience (Side view)
        new THREE.Vector3(0, 20, -20),    // 5: Projects (Over the mountains)
        new THREE.Vector3(0, 15, -40),    // 6: Contact (Low valley)
    ]), [])

    useFrame((state, delta) => {
        // Current scroll offset (0 to 1)
        const offset = scroll.offset

        // Calculate position on curve
        const p = curve.getPoint(offset)

        // Smoothly set camera position
        state.camera.position.set(p.x, p.y, p.z)

        // TRACKING THE SKIER
        // Calculate where the Skier is right now
        // Skier Logic: lead = 0.08
        let skierT = offset + 0.08
        if (skierT > 1) skierT = 1

        const skierPoint = curve.getPoint(skierT)

        // Calculate Skier Height (match SkierRig logic!)
        const x = skierPoint.x
        const z = skierPoint.z
        let elevation = 0
        if (noise2D) {
            elevation += noise2D(x * 0.03, -z * 0.03) * 6
            elevation += noise2D(x * 0.1, -z * 0.1) * 2
            elevation += noise2D(x * 0.4, -z * 0.4) * 0.4
            elevation = Math.pow(Math.abs(elevation), 1.25)
            if (elevation < 0) elevation = 0
        }

        // Look at the skier's "head" level
        // Skier is at elevation + 0.05.
        // Let's look slightly above them or right at them.
        state.camera.lookAt(x, elevation + 1, z)
    })

    return null
}
