"use client";
import { OrbitControls } from '@react-three/drei';
import { useThree, useFrame, Canvas } from '@react-three/fiber';
import { useRef, useState } from 'react';
import React from 'react';
import * as THREE from 'three';
import styles from './styles.module.scss'; // Assuming you have a CSS module for styles
import { Button, Input } from 'antd';

// This component uses R3F hooks and must be inside Canvas
function AnimatedBox() {
    const { camera } = useThree();
    const [isAnimating, setIsAnimating] = useState(false);
    const animationProgress = useRef(0);
    const hasStarted = useRef(false);

    // Define start and end positions
    const startPosition = new THREE.Vector3(8, 2, 8); // Side view, wide angle
    const endPosition = new THREE.Vector3(0, 0, 4);   // Front view, closer

    const startZoomAnimation = () => {
        setIsAnimating(true);
        animationProgress.current = 0;
    };

    // Start animation on mount and set initial camera position
    // React.useEffect(() => {
    //     if (!hasStarted.current) {
    //         hasStarted.current = true;
    //         // Set initial camera position
    //         camera.position.copy(startPosition);
    //         camera.lookAt(0, 0, 0); // Look at the box center
    //         startZoomAnimation();
    //     }
    // }, [camera, startPosition]);

    useFrame(() => {
        if (isAnimating) {
            animationProgress.current += 0.015; // Slightly slower for smoother animation
            const alpha = Math.min(animationProgress.current, 1);

            // Smooth easing function for more natural movement
            const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const easedAlpha = easeInOutCubic(alpha);

            // Lerp camera position from side to front
            camera.position.lerpVectors(startPosition, endPosition, easedAlpha);

            // Keep camera looking at the box center
            camera.lookAt(0, 0, 0);

            if (alpha === 1) {
                setIsAnimating(false);
            }
        }
    });

    return (
        <mesh onClick={startZoomAnimation}>
            {/* Your 3D object to trigger the zoom */}
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
        </mesh>
    );
}

function AnimatedSecondBox() {
    const { camera } = useThree();
    const [isAnimating, setIsAnimating] = useState(false);
    const animationProgress = useRef(0);
    const hasStarted = useRef(false);

    // Define start and end positions
    const startPosition = new THREE.Vector3(8, 2, 8); // Side view, wide angle
    const endPosition = new THREE.Vector3(0, 0, 4);   // Front view, closer

    const startZoomAnimation = () => {
        setIsAnimating(true);
        animationProgress.current = 0;
    };

    // Start animation on mount and set initial camera position
    // React.useEffect(() => {
    //     if (!hasStarted.current) {
    //         hasStarted.current = true;
    //         // Set initial camera position
    //         camera.position.copy(startPosition);
    //         camera.lookAt(0, 0, 0); // Look at the box center
    //         startZoomAnimation();
    //     }
    // }, [camera, startPosition]);

    useFrame(() => {
        if (isAnimating) {
            animationProgress.current += 0.015; // Slightly slower for smoother animation
            const alpha = Math.min(animationProgress.current, 1);

            // Smooth easing function for more natural movement
            const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const easedAlpha = easeInOutCubic(alpha);

            // Lerp camera position from side to front
            camera.position.lerpVectors(startPosition, endPosition, easedAlpha);

            // Keep camera looking at the box center
            camera.lookAt(0, 0, 0);

            if (alpha === 1) {
                setIsAnimating(false);
            }
        }
    });

    return (
        <mesh onClick={startZoomAnimation}>
            {/* Your 3D object to trigger the zoom */}
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="green" />
        </mesh>
    );
}

// Main component that wraps everything in Canvas
function BoxModel() {
    return (
        <div className={styles.customModel}>
            {/* <Button type='primary'>
                Start Animation
            </Button> */}
            <Input prefix={(
                <Button type="primary" onClick={() => console.log('Button clicked!')}>
                    Click Me
                </Button>
            )}></Input>

            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <AnimatedBox />

                <AnimatedSecondBox />

                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default BoxModel;