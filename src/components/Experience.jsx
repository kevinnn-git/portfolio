import { Environment } from '@react-three/drei'
import { Terrain } from './Terrain'
import { Snow } from './Snow'
import { Effects } from './Effects'
import { SkierRig } from './SkierRig'

export const Experience = ({ noise2D }) => {
    // Noise hoisted to App.js

    return (
        <>
            {/* Deep Sunset Background */}
            <color attach="background" args={['#2e1020']} />
            <fog attach="fog" args={['#2e1020', 10, 50]} />

            {/* Sunset Lighting Setup */}
            <ambientLight intensity={0.6} color="#402030" />
            <directionalLight
                position={[20, 10, 10]}
                intensity={2.0}
                castShadow
                color="#ff8800" // Intense Sunset Orange
                shadow-bias={-0.0001}
            />
            {/* Fill light: Deep Purple Shadows */}
            <directionalLight
                position={[-10, 10, -10]}
                intensity={1.0}
                color="#8800ff"
            />

            <Terrain noise2D={noise2D} />
            <SkierRig noise2D={noise2D} />
            <Snow />

            <Environment preset="city" blur={0.8} background={false} />
            <Effects />
        </>
    )
}
