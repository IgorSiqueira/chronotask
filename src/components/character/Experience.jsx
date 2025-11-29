import { animated, useSpring } from "@react-spring/three";
import {
  Environment,
  Float,
  Gltf,
  SoftShadows,
  useProgress,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useCharacterStore } from "../../stores/characterStore";
import { Avatar } from "./Avatar";
import { CameraManager } from "./CameraManager";
import { LoadingAvatar } from "./LoadingAvatar";

export const Experience = () => {
  const setScreenshot = useCharacterStore((state) => state.setScreenshot);
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const screenshot = () => {
      const overlayCanvas = document.createElement("canvas");

      overlayCanvas.width = gl.domElement.width;
      overlayCanvas.height = gl.domElement.height;
      const overlayCtx = overlayCanvas.getContext("2d");
      if (!overlayCtx) {
        return;
      }
      // Draw the original rendered image onto the overlay canvas
      overlayCtx.drawImage(gl.domElement, 0, 0);

      // Create a link element to download the image
      const link = document.createElement("a");
      const date = new Date();
      link.setAttribute(
        "download",
        `ChronoTask_Avatar_${
          date.toISOString().split("T")[0]
        }_${date.toLocaleTimeString()}.png`
      );
      link.setAttribute(
        "href",
        overlayCanvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
      link.click();
    };
    setScreenshot(screenshot);
  }, [gl, setScreenshot]);

  const { active } = useProgress();
  const [loading, setLoading] = useState(active);
  const setLoadingAt = useRef(0);

  useEffect(() => {
    let timeout;
    if (active) {
      timeout = setTimeout(() => {
        setLoading(true);
        setLoadingAt.current = Date.now();
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setLoading(false);
      }, Math.max(0, 2000 - (Date.now() - setLoadingAt.current)));
    }
    return () => clearTimeout(timeout);
  }, [active]);

  const { scale, spin, floatHeight } = useSpring({
    scale: loading ? 0.5 : 1,
    spin: loading ? Math.PI * 8 : 0,
    floatHeight: loading ? 0.5 : 0,
  });

  return (
    <>
      <CameraManager loading={loading} />
      <Environment preset="sunset" environmentIntensity={0.3} />

      {/* Ground plane - visible floor */}
      <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-0.31}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#1a1a2e"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Grid lines for better depth perception */}
      <gridHelper
        args={[50, 50, "#4a5568", "#2d3748"]}
        position-y={-0.3}
      />

      <SoftShadows size={52} samples={16} focus={0.5} />

      {/* Key Light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      {/* Fill Light */}
      <directionalLight position={[-5, 5, 5]} intensity={0.7} />
      {/* Back Lights */}
      <directionalLight position={[3, 3, -5]} intensity={6} color={"#ff3b3b"} />
      <directionalLight
        position={[-3, 3, -5]}
        intensity={8}
        color={"#3cb1ff"}
      />

      <AvatarWrapper loading={loading}>
        <animated.group
          scale={scale}
          position-y={floatHeight}
          rotation-y={spin}
        >
          <Avatar />
        </animated.group>
      </AvatarWrapper>
      <Gltf
        position-y={-0.31}
        src="/models/Teleporter Base.glb"
        castShadow
        receiveShadow
      />
      <LoadingAvatar loading={loading} />
    </>
  );
};

const AvatarWrapper = ({ loading, children }) => {
  return loading ? (
    <Float floatIntensity={1} speed={6}>
      {children}
    </Float>
  ) : (
    children
  );
};
