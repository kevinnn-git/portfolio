import { useMemo, useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { createNoise2D } from 'simplex-noise'

export const Terrain = ({ noise2D }) => {
    const meshRef = useRef()
    const treesRef = useRef()

    // Tree Geometry
    const treeGeo = useMemo(() => {
        const geo = new THREE.ConeGeometry(0.5, 2, 8)
        geo.translate(0, 1, 0)
        return geo
    }, [])


    // Config
    const width = 120
    const depth = 120
    const segments = 256

    const { geometry, treeTransforms } = useMemo(() => {
        const geo = new THREE.PlaneGeometry(width, depth, segments, segments)
        const posAttribute = geo.attributes.position

        // Trees
        const trees = []

        // Displace
        for (let i = 0; i < posAttribute.count; i++) {
            const x = posAttribute.getX(i)
            const z = posAttribute.getY(i)

            // Multi-octave noise
            let elevation = 0
            elevation += noise2D(x * 0.03, z * 0.03) * 6
            elevation += noise2D(x * 0.1, z * 0.1) * 2
            elevation += noise2D(x * 0.4, z * 0.4) * 0.4

            elevation = Math.pow(Math.abs(elevation), 1.25)
            if (elevation < 0) elevation = 0

            posAttribute.setZ(i, elevation)

            // Tree placement
            // More specific rules: not too high, not too steep
            // Normals aren't computed yet but we can guess slope by local variation?
            // Simpler: just randomness + height check
            if (Math.random() < 0.015 && x > -40 && x < 40 && elevation < 6 && elevation > 1) {
                trees.push({ x, y: elevation, z })
            }
        }

        geo.computeVertexNormals()

        const transforms = trees.map(t => {
            const dummy = new THREE.Object3D()
            dummy.position.set(t.x, t.y, -t.z)
            const scale = 0.5 + Math.random() * 0.8
            dummy.scale.set(scale, scale, scale)
            dummy.rotation.y = Math.random() * Math.PI
            dummy.updateMatrix()
            return dummy.matrix
        })

        return { geometry: geo, treeTransforms: transforms }
    }, [noise2D])

    useLayoutEffect(() => {
        if (treesRef.current) {
            treeTransforms.forEach((matrix, i) => {
                treesRef.current.setMatrixAt(i, matrix)
            })
            treesRef.current.instanceMatrix.needsUpdate = true
        }
    }, [treeTransforms])

    // Custom Shader Logic
    const onBeforeCompile = (shader) => {
        shader.uniforms.uTime = { value: 0 }

        shader.vertexShader = `
      varying float vSlope;
      varying vec3 vViewPosition2;
      ${shader.vertexShader}
    `
        // Convert 'normal' attribute to world space or just use object space normal if mesh is stationary?
        // Geometry is rotated -PI/2 in X. 
        // Usually 'normal' in shader is already transformed by normalMatrix (view space).
        // We want World Slope.

        shader.vertexShader = shader.vertexShader.replace(
            '#include <fog_vertex>',
            `
      #include <fog_vertex>
      
      // Calculate slope based on normal world-y
      // transformedNormal is View Space normal usually.
      // Let's use the object normal since our mesh is just rotated.
      
      vec3 worldNormal = normalize(mat3(modelMatrix) * objectNormal);
      vSlope = worldNormal.y;
      vViewPosition2 = -mvPosition.xyz;
      `
        )

        shader.fragmentShader = `
      varying float vSlope;
      varying vec3 vViewPosition2;
      ${shader.fragmentShader}
    `

        shader.fragmentShader = shader.fragmentShader.replace(
            '#include <color_fragment>',
            `
      // Base colors
      vec3 rockColor = vec3(0.3, 0.25, 0.3); // Lighter Warm Purple/Grey for softer shadows
      // Reduce snow albedo to allow lighting to make it white without blowing out (value > 1.0 triggers bloom)
      vec3 snowColor = vec3(0.35, 0.35, 0.4);
      
      // Snow Threshold
      float snowThreshold = 0.6; // Slope > 0.6 is flat enough for snow using normal.y
      
      // Smooth mixing
      float mixFactor = smoothstep(snowThreshold - 0.2, snowThreshold + 0.1, vSlope);
      
      // Add fake sparkles (specular)
      vec3 viewDir = normalize(vViewPosition2);
      vec3 normalEnd = normalize(vNormal);
      // Simple noise for sparkles?
      // Use world position (vPosition? no vWorldPosition doesn't exist by default)
      
      vec3 finalColor = mix(rockColor, snowColor, mixFactor);
      
      // Basic diffuse + ambient handled by standard material, but we set diffuseColor here
      diffuseColor.rgb = finalColor;
      `
        )

        shader.fragmentShader = shader.fragmentShader.replace(
            '#include <roughnessmap_fragment>',
            `
      float roughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 texelRoughness = texture2D( roughnessMap, vUv );
        // reads channel g, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
        roughnessFactor *= texelRoughness.g;
      #endif
      
      // Snow is glossier than rock? 
      // Rock = 0.9 roughness, Snow = 0.3 roughness (icy)
      // vSlope high = snow
      
      roughnessFactor = mix(0.9, 0.4, smoothstep(0.4, 0.8, vSlope));
      `
        )
    }

    return (
        <group>
            <mesh
                ref={meshRef}
                geometry={geometry}
                receiveShadow
                castShadow
                rotation={[-Math.PI / 2, 0, 0]}
            >
                <meshStandardMaterial
                    roughness={0.8}
                    metalness={0.1}
                    onBeforeCompile={onBeforeCompile}
                    // Need to set color to white so we can multiply/override in shader
                    color="white"
                />
            </mesh>

            {treeTransforms.length > 0 && (
                <instancedMesh ref={treesRef} args={[treeGeo, null, treeTransforms.length]} castShadow receiveShadow>
                    <meshStandardMaterial color="#0f1f15" roughness={0.9} />
                </instancedMesh>
            )}
        </group>
    )
}
