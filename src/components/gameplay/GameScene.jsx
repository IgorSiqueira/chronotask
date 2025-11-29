import { Environment, Grid } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PlayableAvatar } from "./PlayableAvatar";
import { useCharacterStore } from "../../stores/characterStore";

export const GameScene = () => {
  const playerRef = useRef();
  const isMovingRef = useRef(false);
  const speedRef = useRef(2.5);
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
  });

  // Obstacles positions and sizes
  const obstacles = useRef([
    { position: [5, 0.5, -5], size: [1, 1, 1] },
    { position: [-5, 0.5, -5], size: [1, 1, 1] },
    { position: [0, 0.5, -10], size: [2, 2, 2] },
  ]);

  // Load character customization from localStorage
  useEffect(() => {
    const savedCustomization = localStorage.getItem('characterCustomization');
    if (savedCustomization) {
      try {
        const customization = JSON.parse(savedCustomization);
        useCharacterStore.setState({ customization });
      } catch (err) {
        console.error('Failed to load character customization:', err);
      }
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowup":
          setKeys((k) => ({ ...k, forward: true }));
          break;
        case "s":
        case "arrowdown":
          setKeys((k) => ({ ...k, backward: true }));
          break;
        case "a":
        case "arrowleft":
          setKeys((k) => ({ ...k, left: true }));
          break;
        case "d":
        case "arrowright":
          setKeys((k) => ({ ...k, right: true }));
          break;
        case "shift":
          setKeys((k) => ({ ...k, shift: true }));
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowup":
          setKeys((k) => ({ ...k, forward: false }));
          break;
        case "s":
        case "arrowdown":
          setKeys((k) => ({ ...k, backward: false }));
          break;
        case "a":
        case "arrowleft":
          setKeys((k) => ({ ...k, left: false }));
          break;
        case "d":
        case "arrowright":
          setKeys((k) => ({ ...k, right: false }));
          break;
        case "shift":
          setKeys((k) => ({ ...k, shift: false }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Check collision with obstacles
  const checkCollision = (newX, newZ) => {
    const playerRadius = 0.5; // Player collision radius

    for (const obstacle of obstacles.current) {
      const [obsX, , obsZ] = obstacle.position;
      const [sizeX, , sizeZ] = obstacle.size;

      // AABB collision detection
      const halfSizeX = sizeX / 2;
      const halfSizeZ = sizeZ / 2;

      const distance = {
        x: Math.abs(newX - obsX),
        z: Math.abs(newZ - obsZ),
      };

      if (distance.x < halfSizeX + playerRadius && distance.z < halfSizeZ + playerRadius) {
        return true; // Collision detected
      }
    }
    return false;
  };

  // Movement logic
  useFrame((state, delta) => {
    if (!playerRef.current) return;

    const speed = keys.shift ? 5 : 2.5; // Run or walk speed
    const direction = new THREE.Vector3();

    if (keys.forward) direction.z -= 1;
    if (keys.backward) direction.z += 1;
    if (keys.left) direction.x -= 1;
    if (keys.right) direction.x += 1;

    const moving = direction.length() > 0;
    isMovingRef.current = moving;
    speedRef.current = speed;

    if (moving) {
      direction.normalize();

      // Calculate new position
      const newX = playerRef.current.position.x + direction.x * speed * delta;
      const newZ = playerRef.current.position.z + direction.z * speed * delta;

      // Only move if no collision
      if (!checkCollision(newX, newZ)) {
        playerRef.current.position.x = newX;
        playerRef.current.position.z = newZ;
      }

      // Rotate player to face movement direction smoothly
      const targetAngle = Math.atan2(direction.x, direction.z);

      // Smooth rotation interpolation
      let currentAngle = playerRef.current.rotation.y;
      let angleDiff = targetAngle - currentAngle;

      // Normalize angle difference to -PI to PI range
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      // Smoothly interpolate the rotation
      playerRef.current.rotation.y += angleDiff * 0.15;
    }

    // Camera follows player
    const idealOffset = new THREE.Vector3(0, 5, 10);
    const idealPosition = new THREE.Vector3();
    idealPosition.copy(playerRef.current.position);
    idealPosition.add(idealOffset);

    state.camera.position.lerp(idealPosition, 0.1);
    state.camera.lookAt(playerRef.current.position);
  });

  return (
    <>
      <Environment preset="sunset" />

      {/* Ground */}
      <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={0}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#8B5A3C" />
      </mesh>

      {/* Grid for better depth perception */}
      <Grid
        args={[100, 100]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#A0735C"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#6B4423"
        fadeDistance={50}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
        position-y={0.01}
      />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Player Character */}
      <group ref={playerRef} position={[0, 0, 0]}>
        <PlayableAvatar isMovingRef={isMovingRef} speedRef={speedRef} />
      </group>

      {/* Some decorative cubes */}
      <mesh position={[5, 0.5, -5]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-5, 0.5, -5]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 0.5, -10]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
    </>
  );
};
