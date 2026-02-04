import { EffectComposer, DepthOfField, Bloom, Vignette, Noise } from '@react-three/postprocessing'

export const Effects = () => {
    return (
        <EffectComposer disableNormalPass>
            <DepthOfField
                focusDistance={0}
                focalLength={0.02}
                bokehScale={2}
                height={480}
            />
            <Bloom
                luminanceThreshold={0.55}
                luminanceSmoothing={0.9}
                height={300}
                intensity={1.0}
            />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
    )
}
