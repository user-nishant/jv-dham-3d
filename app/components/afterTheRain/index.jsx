"use client"

import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Suspense, useState, useEffect, useRef } from "react"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

// Exterior camera points
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

// Interior walking path waypoints
const walkingPath = [
    {
        position: [0, 1.7, 15], // Approach front door
        lookAt: [0, 1.7, 0],
        label: "Approaching Front Door",
    },
    {
        position: [0, 1.7, 8], // Enter through front door
        lookAt: [0, 1.7, 0],
        label: "Entering Main Hall",
    },
    {
        position: [0, 1.7, 2], // Main entrance hall
        lookAt: [0, 1.7, -5],
        label: "Main Entrance Hall",
    },
    {
        position: [-8, 1.7, 0], // Move to left room
        lookAt: [-15, 1.7, 0],
        label: "Left Wing",
    },
    {
        position: [-15, 1.7, -5], // Explore left room
        lookAt: [-15, 1.7, -15],
        label: "Left Room Interior",
    },
    {
        position: [-8, 1.7, -10], // Move toward center
        lookAt: [0, 1.7, -15],
        label: "Moving to Center",
    },
    {
        position: [0, 1.7, -12], // Central area
        lookAt: [0, 1.7, -20],
        label: "Central Hall",
    },
    {
        position: [8, 1.7, -10], // Move to right wing
        lookAt: [15, 1.7, -15],
        label: "Right Wing Approach",
    },
    {
        position: [15, 1.7, -5], // Right room
        lookAt: [15, 1.7, -15],
        label: "Right Room Interior",
    },
    {
        position: [8, 1.7, 0], // Move back toward center
        lookAt: [0, 1.7, 0],
        label: "Returning to Center",
    },
    {
        position: [0, 1.7, -8], // Back area
        lookAt: [0, 1.7, -20],
        label: "Rear Hall",
    },
    {
        position: [0, 1.7, -15], // Approach back door
        lookAt: [0, 1.7, -25],
        label: "Approaching Back Door",
    },
    {
        position: [0, 1.7, -22], // Exit through back door
        lookAt: [0, 1.7, -30],
        label: "Exiting Back Door",
    },
]

const defaultCameraAngle = {
    position: [-80, 40, 80],
    lookAt: [0, 0, 0],
}

const wideAngleStart = {
    position: [0, 80, 150],
    lookAt: [0, 0, 0],
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function CameraController({
    cameraPosition,
    enableAnimation = false,
    walkingAnimation = false,
    walkingProgress = 0,
    onWalkingComplete,
}) {
    const { camera } = useThree()
    const animationRef = useRef({
        isAnimating: false,
        startTime: 0,
        duration: 3000,
        startPosition: new THREE.Vector3(),
        targetPosition: new THREE.Vector3(),
        center: new THREE.Vector3(0, 0, 0),
    })

    const walkingRef = useRef({
        isWalking: false,
        startTime: 0,
        duration: 45000, // 45 seconds for full walk
        currentWaypoint: 0,
        waypointStartTime: 0,
        waypointDuration: 0,
    })

    useEffect(() => {
        if (walkingAnimation && !walkingRef.current.isWalking) {
            // Start walking animation
            walkingRef.current.isWalking = true
            walkingRef.current.startTime = Date.now()
            walkingRef.current.currentWaypoint = 0
            walkingRef.current.waypointStartTime = Date.now()
            walkingRef.current.waypointDuration = walkingRef.current.duration / walkingPath.length
        } else if (!walkingAnimation) {
            walkingRef.current.isWalking = false
        }

        if (enableAnimation && !animationRef.current.isAnimating && !walkingAnimation) {
            animationRef.current.isAnimating = true
            animationRef.current.startTime = Date.now()
            animationRef.current.startPosition.set(...wideAngleStart.position)
            animationRef.current.targetPosition.set(...cameraPoints[0].position)
            camera.position.set(...wideAngleStart.position)
            camera.lookAt(0, 0, 0)
            camera.updateProjectionMatrix()
        } else if (!enableAnimation && !walkingAnimation) {
            const { position, lookAt } = cameraPosition
            camera.position.set(...position)
            camera.lookAt(...lookAt)
            camera.updateProjectionMatrix()
        }
    }, [cameraPosition, camera, enableAnimation, walkingAnimation])

    useFrame(() => {
        if (walkingRef.current.isWalking) {
            const now = Date.now()
            const totalElapsed = now - walkingRef.current.startTime
            const totalProgress = Math.min(totalElapsed / walkingRef.current.duration, 1)

            if (totalProgress >= 1) {
                walkingRef.current.isWalking = false
                if (onWalkingComplete) {
                    onWalkingComplete()
                }
                return
            }

            // Calculate current waypoint
            const waypointIndex = Math.floor(totalProgress * walkingPath.length)
            const nextWaypointIndex = Math.min(waypointIndex + 1, walkingPath.length - 1)

            // Progress between current and next waypoint
            const waypointProgress = (totalProgress * walkingPath.length) % 1
            const easedProgress = easeInOutCubic(waypointProgress)

            const currentWaypoint = walkingPath[waypointIndex]
            const nextWaypoint = walkingPath[nextWaypointIndex]

            // Interpolate position
            const currentPosition = new THREE.Vector3(...currentWaypoint.position)
            const nextPosition = new THREE.Vector3(...nextWaypoint.position)
            const interpolatedPosition = currentPosition.lerp(nextPosition, easedProgress)

            // Interpolate look-at target
            const currentLookAt = new THREE.Vector3(...currentWaypoint.lookAt)
            const nextLookAt = new THREE.Vector3(...nextWaypoint.lookAt)
            const interpolatedLookAt = currentLookAt.lerp(nextLookAt, easedProgress)

            // Apply to camera
            camera.position.copy(interpolatedPosition)
            camera.lookAt(interpolatedLookAt)
            camera.updateProjectionMatrix()
        } else if (animationRef.current.isAnimating) {
            const now = Date.now()
            const elapsed = now - animationRef.current.startTime
            const progress = Math.min(elapsed / animationRef.current.duration, 1)
            const easedProgress = easeInOutCubic(progress)

            const currentPosition = new THREE.Vector3().lerpVectors(
                animationRef.current.startPosition,
                animationRef.current.targetPosition,
                easedProgress,
            )

            camera.position.copy(currentPosition)
            camera.lookAt(0, 0, 0)
            camera.updateProjectionMatrix()

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
        </group>
    )
}

function Model() {
    const { scene } = useGLTF("/models/mansion/scene.gltf")

    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true
                    child.receiveShadow = true
                    if (child.material) {
                        if (child.material.map) {
                            child.material.map.colorSpace = THREE.SRGBColorSpace
                        }
                        if (child.material.metalness !== undefined) {
                            child.material.metalness = Math.min(child.material.metalness, 0.2)
                        }
                        if (child.material.roughness !== undefined) {
                            child.material.roughness = Math.max(child.material.roughness, 0.6)
                        }
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
    const [isWalking, setIsWalking] = useState(false)
    const [walkingProgress, setWalkingProgress] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialAnimationComplete(false)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (!initialAnimationComplete) {
            const timer = setTimeout(() => {
                setInitialAnimationComplete(true)
            }, 3200)
            return () => clearTimeout(timer)
        }
    }, [initialAnimationComplete])

    const handleSwitchCamera = () => {
        if (isWalking) return // Don't switch during walking animation

        const nextIndex = (currentCameraIndex + 1) % cameraPoints.length
        setCurrentCameraIndex(nextIndex)
        setCameraPosition({
            position: cameraPoints[nextIndex].position,
            lookAt: [0, 0, 0],
        })
    }

    const handlePointClick = (pointPosition) => {
        if (isWalking) return // Don't switch during walking animation

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

    const handleStartWalking = () => {
        if (!initialAnimationComplete) return
        setIsWalking(true)
        setWalkingProgress(0)
    }

    const handleStopWalking = () => {
        setIsWalking(false)
        setWalkingProgress(0)
    }

    const handleWalkingComplete = () => {
        setIsWalking(false)
        setWalkingProgress(0)
    }

    return (
        <div className="w-full h-full relative">
            {/* Control buttons */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <button
                    onClick={handleSwitchCamera}
                    disabled={isWalking || !initialAnimationComplete}
                    className="px-4 py-2 bg-white/95 border-2 border-gray-800 rounded-lg font-bold text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                    Switch to {cameraPoints[(currentCameraIndex + 1) % cameraPoints.length].label}
                </button>

                <button
                    onClick={isWalking ? handleStopWalking : handleStartWalking}
                    disabled={!initialAnimationComplete}
                    className={`px-4 py-2 border-2 rounded-lg font-bold text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${isWalking
                        ? "bg-red-500 text-white border-red-600 hover:bg-red-600"
                        : "bg-green-500 text-white border-green-600 hover:bg-green-600"
                        }`}
                >
                    {isWalking ? "Stop Walking Tour" : "Start Walking Tour"}
                </button>
            </div>

            {/* Status indicators */}
            {!initialAnimationComplete && (
                <div className="absolute top-4 right-4 z-10 px-4 py-2 bg-black/80 text-white rounded-lg text-sm font-bold">
                    Camera rotating...
                </div>
            )}

            {isWalking && (
                <div className="absolute top-4 right-4 z-10 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">
                    Walking Tour in Progress...
                </div>
            )}

            <Canvas
                style={{ height: "100%" }}
                shadows
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
                <CameraController
                    cameraPosition={cameraPosition}
                    enableAnimation={!initialAnimationComplete}
                    walkingAnimation={isWalking}
                    walkingProgress={walkingProgress}
                    onWalkingComplete={handleWalkingComplete}
                />

                <color attach="background" args={["#b8d4f0"]} />

                {/* Enhanced lighting for interior visibility */}
                <ambientLight intensity={1.5} color="#ffffff" />
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
                <directionalLight position={[-20, 40, 30]} intensity={0.8} color="#e6f3ff" />
                <directionalLight position={[0, 20, -50]} intensity={0.6} color="#fff8dc" />

                {/* Additional interior lighting */}
                <pointLight position={[0, 10, 0]} intensity={1.2} color="#ffffff" distance={30} />
                <pointLight position={[-15, 8, -10]} intensity={0.8} color="#fff8dc" distance={25} />
                <pointLight position={[15, 8, -10]} intensity={0.8} color="#fff8dc" distance={25} />

                <Suspense fallback={null}>
                    <Model />
                    {!isWalking &&
                        cameraPoints.map((point) => (
                            <ClickablePoint
                                key={point.id}
                                position={point.position}
                                color={point.color}
                                label={point.label}
                                onPointClick={handlePointClick}
                            />
                        ))}
                </Suspense>

                <OrbitControls
                    target={[0, 0, 0]}
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    enableDamping={true}
                    dampingFactor={0.05}
                    zoomToCursor={true}
                    maxDistance={200}
                    maxPolarAngle={Math.PI * 0.75}
                    enabled={initialAnimationComplete && !isWalking}
                />
            </Canvas>
        </div>
    )
}
