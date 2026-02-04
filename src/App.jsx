import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import { Experience } from './components/Experience'
import { Overlay } from './components/Overlay'
import { CameraRig } from './components/CameraRig'
import { useMemo } from 'react'
import { createNoise2D } from 'simplex-noise'

function App() {
  const noise2D = useMemo(() => createNoise2D(), [])

  return (
    <>
      <Canvas
        shadows
        // Camera initial position will be overridden by CameraRig, 
        // but setting it here sets the initial state before first frame.
        camera={{ position: [0, 5, 20], fov: 45 }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <ScrollControls pages={7} damping={0.3}>
          <Experience noise2D={noise2D} />
          <CameraRig noise2D={noise2D} />

          <Scroll html>
            <Overlay />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  )
}

export default App
