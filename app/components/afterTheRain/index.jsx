"use client"

import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Suspense, useState, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

const cameraAngles = [
    {
        position: [-55.33539937889818, 39.30364290203104,
            126.44447501955844], lookAt: [0, 0, 0]
    },
    // { position: [10, 5, 10], lookAt: [0, 0, 0] },
    // { position: [-10, 5, 10], lookAt: [0, 0, 0] },
]

const defaultCameraAngle = {
    position: [-55.33539937889818, 39.30364290203104, 126.44447501955844],
    lookAt: [0, 0, 0]
}

function CameraController({ cameraPosition }) {
    const { camera } = useThree()

    useEffect(() => {
        // console.log(camera, 'this is the camera');
        const { position, lookAt } = cameraPosition;
        camera.position.set(...position)
        camera.lookAt(...lookAt)
        camera.updateProjectionMatrix()
    }, [cameraPosition, camera])

    return null
}

function CameraPositionLogger() {
    const { camera } = useThree();

    useFrame(() => {
        // This function runs on every frame
        // Access the camera's position
        // console.log('Camera Position:', camera.position);
    });

    return null; // This component doesn't render anything visually
}

function Model({ onModelClick }) {
    const { scene } = useGLTF("/models/mansion/scene.gltf")

    useEffect(() => {
        if (scene) {
            // Traverse and fix materials
            scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true
                    child.receiveShadow = true

                    if (child.material) {
                        // Ensure materials use sRGB color space for textures
                        if (child.material.map) {
                            child.material.map.colorSpace = THREE.SRGBColorSpace
                        }

                        // Make sure material is not too reflective or emissive
                        if (child.material.metalness !== undefined) {
                            child.material.metalness = Math.min(child.material.metalness, 0.5)
                        }
                        if (child.material.roughness !== undefined) {
                            child.material.roughness = Math.max(child.material.roughness, 0.3)
                        }

                        child.material.needsUpdate = true
                    }
                }
            })
        }
    }, [scene])

    const handleClick = (event) => {
        event.stopPropagation()

        // Get information about what was clicked
        const clickedObject = event.object
        const point = event.point
        const face = event.face

        console.log('Clicked object:', clickedObject)
        console.log('Click position:', point)
        console.log('Face normal:', face?.normal)

        // Call the callback with useful information
        // onModelClick([point.x, point.y, point.z]);
    }

    return <primitive
        object={scene}
        scale={1.3}
        position={[0, -0.55, 0]}
        onClick={handleClick} />
}

export const AfterTheRain = () => {
    const [cameraIndex, setCameraIndex] = useState(0);
    const [cameraPosition, setCameraPosition] = useState(defaultCameraAngle);

    const handleNextCamera = () => {
        setCameraIndex((prev) => (prev + 1) % cameraAngles.length)
    }

    return (
        <div className="w-full h-full relative"
        // style={{ position: "relative", width: 900, height: 500 }}
        >
            <button
                onClick={handleNextCamera}
                style={{
                    position: "absolute",
                    zIndex: 1,
                    top: 10,
                    left: 10,
                    padding: "8px 16px",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
            >
                Next Camera Angle
            </button>

            <Canvas
                // style={{ width: 900, height: 500 }}
                style={{
                    height: "100%",
                }}
                gl={{
                    antialias: true,
                    outputColorSpace: THREE.SRGBColorSpace,
                }}
                dpr={[1, 1.5]}
                camera={{ position: cameraPosition.position, fov: 20 }}
            >
                <CameraController cameraPosition={cameraPosition} />
                <CameraPositionLogger /> {/* Add the logger component */}

                {/* Simple background color */}
                <color attach="background" args={["#808080"]} />

                {/* Basic lighting setup */}
                <ambientLight intensity={1} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={2}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
                {/* <directionalLight position={[-10, 100, -5]} intensity={0.3} /> */}

                <Suspense fallback={null}>
                    <Model onModelClick={data => setCameraPosition(prevState => ({
                        ...prevState,
                        position: data
                    }))} />
                </Suspense>

                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    enableDamping={true}
                    dampingFactor={0.12}
                    zoomToCursor={true}
                // minPolarAngle={Math.PI / 2.2}
                // maxPolarAngle={Math.PI / 2.2}
                />
            </Canvas>
        </div>
    )
}
