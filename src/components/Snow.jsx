import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const Snow = ({ count = 2000 }) => {
    const mesh = useRef()

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 80
            const y = Math.random() * 40
            const z = (Math.random() - 0.5) * 80
            const speed = 0.05 + Math.random() * 0.1
            temp.push({ x, y, z, mx: x, my: y, mz: z, speed })
        }
        return temp
    }, [count])

    const dummy = useMemo(() => new THREE.Object3D(), [])

    useFrame((state, delta) => {
        particles.forEach((particle, i) => {
            // Move down
            particle.my -= particle.speed * 10 * delta

            // Reset if below ground (approximate)
            if (particle.my < -5) {
                particle.my = 40
                particle.mx = (Math.random() - 0.5) * 80
                particle.mz = (Math.random() - 0.5) * 80 + state.camera.position.z
                // Bias towards camera z for visibility if moving
            }

            // Add some sway
            const t = state.clock.elapsedTime
            dummy.position.set(
                particle.mx + Math.sin(t * 0.5 + i) * 0.5,
                particle.my,
                particle.mz + Math.cos(t * 0.3 + i) * 0.5
            )

            dummy.updateMatrix()
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#ffe0d0" transparent opacity={0.6} />
        </instancedMesh>
    )
}
