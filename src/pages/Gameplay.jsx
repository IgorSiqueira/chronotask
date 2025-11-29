import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import { GameScene } from "../components/gameplay/GameScene";
import { GameHUD } from "../components/gameplay/GameHUD";
import { DevTools } from "../components/gameplay/DevTools";

const Gameplay = () => {
  const [showNavbar, setShowNavbar] = useState(true);

  // Prevent arrow keys from scrolling the page
  useEffect(() => {
    const preventArrowScroll = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', preventArrowScroll);
    return () => window.removeEventListener('keydown', preventArrowScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {showNavbar && <DashboardNavbar />}

      <div className={`relative ${showNavbar ? 'h-[calc(100vh-4rem)]' : 'h-screen'}`}>
        {/* Game HUD */}
        <GameHUD />

        {/* Dev Tools */}
        <DevTools />

        {/* Pre-Alpha Warning */}
        <div className="absolute bottom-20 right-4 z-10 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/50 rounded-lg px-4 py-2 max-w-xs">
          <p className="text-yellow-200 text-xs text-center">
            ⚠️ <strong>Pré-Alpha:</strong> Todos os dados serão deletados após 7 dias
          </p>
        </div>

        {/* Game Instructions */}
        <div className="absolute bottom-4 left-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
          <h3 className="font-bold mb-2">Controles</h3>
          <p className="text-sm">WASD ou Setas: Mover</p>
          <p className="text-sm mb-3">Shift: Correr</p>

          <button
            onClick={() => setShowNavbar(!showNavbar)}
            className="w-full text-xs px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
          >
            {showNavbar ? '🙈 Ocultar Menu' : '👁️ Mostrar Menu'}
          </button>
        </div>

        <Canvas
          camera={{
            position: [0, 5, 10],
            fov: 60,
          }}
          shadows
        >
          <color attach="background" args={["#87CEEB"]} />
          <fog attach="fog" args={["#87CEEB", 10, 50]} />
          <Suspense fallback={null}>
            <GameScene />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Gameplay;
