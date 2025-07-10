"use client"

import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Suspense, useState, useEffect, useRef } from "react"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

// Simplified to just two camera points
const cameraPoints = [
    {
        id: 1,
        position: [-80, 40, 80],
        color: "#ff6b6b",
        label: "Front View",
    },
    {
        id: 2,
        position: [80, 40, -80],
        color: "#4ecdc4",
        label: "Back View",
    },
]

const defaultCameraAngle = {
    position: [-80, 40, 80],
    lookAt: [0, 0, 0],
}

// Wide angle starting position for the initial animation
const wideAngleStart = {
    position: [0, 80, 150], // High and far back to see the whole scene
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
        duration: 3000, // 3 seconds for smooth rotation
        startPosition: new THREE.Vector3(),
        targetPosition: new THREE.Vector3(),
        center: new THREE.Vector3(0, 0, 0),
    })

    useEffect(() => {
        if (enableAnimation && !animationRef.current.isAnimating) {
            // Start the rotation animation from wide angle to first camera point
            animationRef.current.isAnimating = true
            animationRef.current.startTime = Date.now()

            // Set starting position to wide angle and target to first camera point
            animationRef.current.startPosition.set(...wideAngleStart.position)
            animationRef.current.targetPosition.set(...cameraPoints[0].position)

            // Set initial camera position to wide angle
            camera.position.set(...wideAngleStart.position)
            camera.lookAt(0, 0, 0)
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

            // Interpolate position
            const currentPosition = new THREE.Vector3().lerpVectors(
                animationRef.current.startPosition,
                animationRef.current.targetPosition,
                easedProgress,
            )

            // Apply to camera
            camera.position.copy(currentPosition)
            camera.lookAt(0, 0, 0) // Always look at the center
            camera.updateProjectionMatrix()

            // Check if animation is complete
            if (progress >= 1) {
                animationRef.current.isAnimating = false
            }
        }
    })

    return null
}

function ClickablePoint({ position, color, label, onPointClick }) {
    const [hovered, setHovered] = useState(false)

    const handleClick = (event) => {
        event.stopPropagation()
        onPointClick(position)
    }

    return (
        <group position={position}>
            {/* Main clickable sphere */}
            <mesh onClick={handleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial
                    color={hovered ? "#ffffff" : color}
                    emissive={hovered ? color : "#000000"}
                    emissiveIntensity={hovered ? 0.4 : 0.2}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Pulsing ring effect */}
            {/* <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1.5, 2, 16]} />
                <meshBasicMaterial color={color} transparent opacity={hovered ? 0.8 : 0.4} />
            </mesh> */}

            {/* Label text when hovered */}
            {/* {hovered && (
                <mesh position={[0, 3, 0]}>
                    <planeGeometry args={[6, 1.5]} />
                    <meshBasicMaterial color="#000000" transparent opacity={0.8} />
                </mesh>
            )} */}
        </group>
    )
}

function Model() {
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

                        // Adjust material properties
                        if (child.material.metalness !== undefined) {
                            child.material.metalness = Math.min(child.material.metalness, 0.2)
                        }
                        if (child.material.roughness !== undefined) {
                            child.material.roughness = Math.max(child.material.roughness, 0.6)
                        }
                        // Brighten the materials slightly
                        if (child.material.color) {
                            child.material.color.multiplyScalar(1.1)
                        }
                        child.material.needsUpdate = true
                    }
                }
            })
        }
    }, [scene])

    return <primitive object={scene} scale={1.3} position={[0, -0.55, 0]} />
}

export const AfterTheRain = () => {
    const [currentCameraIndex, setCurrentCameraIndex] = useState(0)
    const [cameraPosition, setCameraPosition] = useState({
        position: cameraPoints[0].position,
        lookAt: [0, 0, 0],
    })
    const [initialAnimationComplete, setInitialAnimationComplete] = useState(false)

    // Track when initial animation should start
    useEffect(() => {
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
            }, 3200) // Slightly longer than animation duration
            return () => clearTimeout(timer)
        }
    }, [initialAnimationComplete])

    const handleSwitchCamera = () => {
        const nextIndex = (currentCameraIndex + 1) % cameraPoints.length
        setCurrentCameraIndex(nextIndex)
        setCameraPosition({
            position: cameraPoints[nextIndex].position,
            lookAt: [0, 0, 0],
        })
    }

    const handlePointClick = (pointPosition) => {
        // Find the index of the clicked point
        const clickedIndex = cameraPoints.findIndex(
            (point) =>
                point.position[0] === pointPosition[0] &&
                point.position[1] === pointPosition[1] &&
                point.position[2] === pointPosition[2],
        )

        if (clickedIndex !== -1) {
            setCurrentCameraIndex(clickedIndex)
        }

        setCameraPosition({
            position: pointPosition,
            lookAt: [0, 0, 0],
        })
    }

    return (
        <div className="w-full h-full relative">
            <button
                onClick={handleSwitchCamera}
                style={{
                    position: "absolute",
                    zIndex: 1,
                    top: 10,
                    left: 10,
                    padding: "12px 20px",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "2px solid #333",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "14px",
                }}
            >
                Switch to {cameraPoints[(currentCameraIndex + 1) % cameraPoints.length].label}
            </button>

            {/* Animation progress indicator */}
            {!initialAnimationComplete && (
                <div
                    style={{
                        position: "absolute",
                        zIndex: 1,
                        top: 10,
                        right: 10,
                        padding: "12px 20px",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "white",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "bold",
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
                dpr={[1, 2]}
                camera={{
                    position: wideAngleStart.position,
                    fov: 25,
                    near: 0.1,
                    far: 1000,
                }}
            >
                <CameraController cameraPosition={cameraPosition} enableAnimation={!initialAnimationComplete} />

                {/* Background */}
                <color attach="background" args={["#b8d4f0"]} />

                {/* Lighting setup for brighter, more natural colors */}
                <ambientLight intensity={1.2} color="#ffffff" />
                <directionalLight
                    position={[30, 60, 40]}
                    intensity={2.2}
                    color="#fff8dc"
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-far={200}
                    shadow-camera-left={-50}
                    shadow-camera-right={50}
                    shadow-camera-top={50}
                    shadow-camera-bottom={-50}
                />
                {/* Additional fill light for natural lighting */}
                <directionalLight position={[-20, 40, 30]} intensity={0.8} color="#e6f3ff" />
                {/* Subtle rim light */}
                <directionalLight position={[0, 20, -50]} intensity={0.6} color="#fff8dc" />

                <Suspense fallback={null}>
                    <Model />

                    {/* Render camera points */}
                    {cameraPoints.map((point) => (
                        <ClickablePoint
                            key={point.id}
                            position={point.position}
                            color={point.color}
                            label={point.label}
                            onPointClick={handlePointClick}
                        />
                    ))}
                </Suspense>

                {/* OrbitControls with target set to center */}
                <OrbitControls
                    target={[0, 0, 0]} // Always target the center
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    enableDamping={true}
                    dampingFactor={0.05}
                    zoomToCursor={true}
                    minDistance={20}
                    maxDistance={200}
                    maxPolarAngle={Math.PI * 0.75} // Prevent camera from going below ground
                    enabled={initialAnimationComplete} // Disable controls during animation
                />
            </Canvas>
        </div>
    )
}
