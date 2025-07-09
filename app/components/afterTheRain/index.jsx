"use client"

import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Suspense, useState, useEffect, useRef } from "react"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

const cameraAngles = [
    {
        position: [-55.33539937889818, 39.30364290203104, 126.44447501955844],
        lookAt: [0, 0, 0],
    },
    // { position: [10, 5, 10], lookAt: [0, 0, 0] },
    // { position: [-10, 5, 10], lookAt: [0, 0, 0] },
]

const defaultCameraAngle = {
    position: [-55.33539937889818, 39.30364290203104, 126.44447501955844],
    lookAt: [0, 0, 0],
}

// Back starting position for the rotation animation
const backStartingAngle = {
    position: [55.33539937889818, 39.30364290203104, -126.44447501955844], // Opposite side (back of mansion)
    lookAt: [0, 0, 0],
}

// Easing function for smooth animation
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function CameraController({ cameraPosition, enableAnimation = false }) {
    const { camera } = useThree()
    const animationRef = useRef({
        isAnimating: false,
        startTime: 0,
        duration: 4000, // 4 seconds for smooth rotation
        startPosition: new THREE.Vector3(),
        targetPosition: new THREE.Vector3(),
        center: new THREE.Vector3(0, 0, 0), // Mansion center point
    })

    useEffect(() => {
        if (enableAnimation && !animationRef.current.isAnimating) {
            // Start the rotation animation
            animationRef.current.isAnimating = true
            animationRef.current.startTime = Date.now()

            // Set starting and target positions
            animationRef.current.startPosition.set(...backStartingAngle.position)
            animationRef.current.targetPosition.set(...defaultCameraAngle.position)

            // Set initial camera position
            camera.position.set(...backStartingAngle.position)
            camera.lookAt(0, 0, 0) // Always look at mansion center
            camera.updateProjectionMatrix()
        } else if (!enableAnimation) {
            // Manual camera position change (from button clicks)
            const { position, lookAt } = cameraPosition
            camera.position.set(...position)
            camera.lookAt(...lookAt)
            camera.updateProjectionMatrix()
        }
    }, [cameraPosition, camera, enableAnimation])

    useFrame(() => {
        if (animationRef.current.isAnimating) {
            const now = Date.now()
            const elapsed = now - animationRef.current.startTime
            const progress = Math.min(elapsed / animationRef.current.duration, 1)

            // Apply easing
            const easedProgress = easeInOutCubic(progress)

            // Calculate rotation around the mansion
            // Convert start and target positions to spherical coordinates relative to center
            const startVector = new THREE.Vector3().copy(animationRef.current.startPosition)
            const targetVector = new THREE.Vector3().copy(animationRef.current.targetPosition)

            // Create spherical coordinates
            const startSpherical = new THREE.Spherical().setFromVector3(startVector)
            const targetSpherical = new THREE.Spherical().setFromVector3(targetVector)

            // Interpolate spherical coordinates
            const currentRadius = THREE.MathUtils.lerp(startSpherical.radius, targetSpherical.radius, easedProgress)
            const currentPhi = THREE.MathUtils.lerp(startSpherical.phi, targetSpherical.phi, easedProgress)

            // For theta (azimuth), we need to handle the circular interpolation properly
            let startTheta = startSpherical.theta
            let targetTheta = targetSpherical.theta

            // Ensure we take the shorter path around the circle
            const thetaDiff = targetTheta - startTheta
            if (Math.abs(thetaDiff) > Math.PI) {
                if (thetaDiff > 0) {
                    startTheta += 2 * Math.PI
                } else {
                    targetTheta += 2 * Math.PI
                }
            }

            const currentTheta = THREE.MathUtils.lerp(startTheta, targetTheta, easedProgress)

            // Convert back to Cartesian coordinates
            const currentSpherical = new THREE.Spherical(currentRadius, currentPhi, currentTheta)
            const currentPosition = new THREE.Vector3().setFromSpherical(currentSpherical)

            // Apply to camera
            camera.position.copy(currentPosition)
            camera.lookAt(0, 0, 0) // Always look at the mansion center
            camera.updateProjectionMatrix()

            // Check if animation is complete
            if (progress >= 1) {
                animationRef.current.isAnimating = false
            }
        }
    })

    return null
}

function CameraPositionLogger() {
    const { camera } = useThree()

    useFrame(() => {
        // This function runs on every frame
        // Access the camera's position
        // console.log('Camera Position:', camera.position);
    })

    return null // This component doesn't render anything visually
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
        console.log("Clicked object:", clickedObject)
        console.log("Click position:", point)
        console.log("Face normal:", face?.normal)
        // Call the callback with useful information
        // onModelClick([point.x, point.y, point.z]);
    }

    return <primitive object={scene} scale={1.3} position={[0, -0.55, 0]} onClick={handleClick} />
}

export const AfterTheRain = () => {
    const [cameraIndex, setCameraIndex] = useState(0)
    const [cameraPosition, setCameraPosition] = useState(defaultCameraAngle)
    const [initialAnimationComplete, setInitialAnimationComplete] = useState(false)

    // Track when initial animation should start
    useEffect(() => {
        // Small delay to ensure everything is loaded
        const timer = setTimeout(() => {
            setInitialAnimationComplete(false)
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    // Track when animation is complete
    useEffect(() => {
        if (!initialAnimationComplete) {
            const timer = setTimeout(() => {
                setInitialAnimationComplete(true)
            }, 4200) // Slightly longer than animation duration

            return () => clearTimeout(timer)
        }
    }, [initialAnimationComplete])

    const handleNextCamera = () => {
        setCameraIndex((prev) => (prev + 1) % cameraAngles.length)
        setCameraPosition(cameraAngles[cameraIndex])
    }

    return (
        <div className="w-full h-full relative">
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

            {/* Animation progress indicator */}
            {!initialAnimationComplete && (
                <div
                    style={{
                        position: "absolute",
                        zIndex: 1,
                        top: 10,
                        right: 10,
                        padding: "8px 16px",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        borderRadius: "4px",
                        fontSize: "14px",
                    }}
                >
                    Camera rotating...
                </div>
            )}

            <Canvas
                style={{
                    height: "100%",
                }}
                gl={{
                    antialias: true,
                    outputColorSpace: THREE.SRGBColorSpace,
                }}
                dpr={[1, 1.5]}
                camera={{ position: backStartingAngle.position, fov: 20 }}
            >
                <CameraController cameraPosition={cameraPosition} enableAnimation={!initialAnimationComplete} />
                <CameraPositionLogger />

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

                <Suspense fallback={null}>
                    <Model
                        onModelClick={(data) =>
                            setCameraPosition((prevState) => ({
                                ...prevState,
                                position: data,
                            }))
                        }
                    />
                </Suspense>

                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    enableDamping={true}
                    dampingFactor={0.12}
                    zoomToCursor={true}
                    enabled={initialAnimationComplete} // Disable controls during animation
                />
            </Canvas>
        </div>
    )
}
