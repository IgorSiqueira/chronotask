import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Leva } from "leva";
import DashboardNavbar from "../components/DashboardNavbar";
import { DEFAULT_CAMERA_POSITION } from "../components/character/CameraManager";
import { Experience } from "../components/character/Experience";
import { CharacterUI } from "../components/character/CharacterUI";

const Character = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <DashboardNavbar />

      <div className="relative h-[calc(100vh-4rem)]">
        <Leva hidden />
        <CharacterUI />
        <Canvas
          camera={{
            position: DEFAULT_CAMERA_POSITION,
            fov: 45,
          }}
          gl={{
            preserveDrawingBuffer: true,
          }}
          shadows
        >
          <color attach="background" args={["#130f30"]} />
          <fog attach="fog" args={["#130f30", 10, 40]} />
          <Suspense fallback={null}>
            <group position-y={-1}>
              <Experience />
            </group>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Character;
