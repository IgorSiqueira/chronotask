import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Avatar } from "../character/Avatar";

export const PlayableAvatar = ({ isMovingRef, speedRef }) => {
  const group = useRef();

  // Load only Idle animations for now
  const idleAnimations = useGLTF("/models/Poses.glb").animations;
  const { actions } = useAnimations(idleAnimations, group);

  // Initialize Idle animation once
  useEffect(() => {
    if (!actions || !actions.Idle) return;

    // Just play Idle animation and keep it
    actions.Idle.setLoop(THREE.LoopRepeat, Infinity);
    actions.Idle.play();
  }, [actions]);

  return (
    <group ref={group}>
      <Avatar />
    </group>
  );
};
