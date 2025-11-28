import { CameraControls } from "@react-three/drei";
import { button, useControls } from "leva";
import { useEffect, useRef } from "react";
import { UI_MODES, useCharacterStore } from "../../stores/characterStore";

export const START_CAMERA_POSITION = [500, 10, 1000];
export const DEFAULT_CAMERA_POSITION = [-1, 1, 5];
export const DEFAULT_CAMERA_TARGET = [0, 0, 0];

export const CameraManager = ({ loading }) => {
  const controls = useRef();
  const currentCategory = useCharacterStore((state) => state.currentCategory);
  const initialLoading = useCharacterStore((state) => state.loading);
  const mode = useCharacterStore((state) => state.mode);

  useControls({
    getCameraPosition: button(() => {
      console.log("Camera Position", [...controls.current.getPosition()]);
    }),
    getCameraTarget: button(() => {
      console.log("Camera Target", [...controls.current.getTarget()]);
    }),
  });

  useEffect(() => {
    if (!controls.current) return;

    if (initialLoading) {
      controls.current.setLookAt(
        ...START_CAMERA_POSITION,
        ...DEFAULT_CAMERA_TARGET,
        false
      );
    } else if (
      !loading &&
      mode === UI_MODES.CUSTOMIZE &&
      currentCategory?.cameraPlacement
    ) {
      controls.current.setLookAt(
        ...currentCategory.cameraPlacement.position,
        ...currentCategory.cameraPlacement.target,
        true
      );
    } else if (!loading) {
      controls.current.setLookAt(
        ...DEFAULT_CAMERA_POSITION,
        ...DEFAULT_CAMERA_TARGET,
        true
      );
    }
  }, [currentCategory, mode, initialLoading, loading]);

  return (
    <CameraControls
      ref={controls}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
      minDistance={1}
      maxDistance={15}
      dollySpeed={0.5}
    />
  );
};
