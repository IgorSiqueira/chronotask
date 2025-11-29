import { useState, useEffect } from 'react';

export const DevTools = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [fps, setFps] = useState(0);
  const [characterData, setCharacterData] = useState(null);
  const [logs, setLogs] = useState([]);
  const [godMode, setGodMode] = useState(false);
  const [showCollision, setShowCollision] = useState(false);
  const [timeScale, setTimeScale] = useState(1);

  // FPS Counter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const countFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(countFPS);
    };

    const animationId = requestAnimationFrame(countFPS);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Intercept console.log
  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => {
      originalLog(...args);
      const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
      setLogs(prev => [...prev.slice(-49), { type: 'log', message, time: new Date().toLocaleTimeString() }]);
    };

    console.error = (...args) => {
      originalError(...args);
      const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
      setLogs(prev => [...prev.slice(-49), { type: 'error', message, time: new Date().toLocaleTimeString() }]);
    };

    console.warn = (...args) => {
      originalWarn(...args);
      const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
      setLogs(prev => [...prev.slice(-49), { type: 'warn', message, time: new Date().toLocaleTimeString() }]);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  // Load character data
  useEffect(() => {
    const loadCharacterData = () => {
      const data = {
        name: localStorage.getItem('characterName') || 'N/A',
        fullName: localStorage.getItem('userFullName') || 'N/A',
        email: localStorage.getItem('userEmail') || 'N/A',
        userId: localStorage.getItem('userId') || 'N/A',
        hasToken: !!localStorage.getItem('accessToken'),
      };
      setCharacterData(data);
    };

    loadCharacterData();

    // Refresh every 2 seconds
    const interval = setInterval(loadCharacterData, 2000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copiado para clipboard!');
  };

  const exportLogs = () => {
    const logsText = logs.map(log => `[${log.time}] ${log.type.toUpperCase()}: ${log.message}`).join('\n');
    const blob = new Blob([logsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chronotask-logs-${Date.now()}.txt`;
    a.click();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 right-4 z-10 bg-black/80 hover:bg-black/90 text-white px-3 py-2 rounded-lg border border-white/20 text-xs font-mono transition-colors"
      >
        🛠️ Dev Tools
      </button>
    );
  }

  return (
    <div className="absolute top-4 right-4 z-10 bg-black/90 backdrop-blur-md rounded-lg border border-cyan-500/30 shadow-2xl w-80 max-h-[calc(100vh-2rem)] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-cyan-500/30">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 text-lg">🛠️</span>
          <h3 className="text-cyan-400 font-bold text-sm font-mono">DEV TOOLS</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-cyan-500/30 overflow-x-auto">
        <button
          onClick={() => setActiveTab('info')}
          className={`px-3 py-2 text-xs font-mono transition-colors whitespace-nowrap ${
            activeTab === 'info'
              ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Info
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`px-3 py-2 text-xs font-mono transition-colors whitespace-nowrap ${
            activeTab === 'performance'
              ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Perf
        </button>
        <button
          onClick={() => setActiveTab('storage')}
          className={`px-3 py-2 text-xs font-mono transition-colors whitespace-nowrap ${
            activeTab === 'storage'
              ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Storage
        </button>
        <button
          onClick={() => setActiveTab('console')}
          className={`px-3 py-2 text-xs font-mono transition-colors whitespace-nowrap ${
            activeTab === 'console'
              ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Console
        </button>
        <button
          onClick={() => setActiveTab('cheats')}
          className={`px-3 py-2 text-xs font-mono transition-colors whitespace-nowrap ${
            activeTab === 'cheats'
              ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Cheats
        </button>
        <button
          onClick={() => setActiveTab('utils')}
          className={`px-3 py-2 text-xs font-mono transition-colors whitespace-nowrap ${
            activeTab === 'utils'
              ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Utils
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 text-xs font-mono">
        {activeTab === 'info' && (
          <div className="space-y-3">
            <div>
              <div className="text-cyan-400 font-bold mb-1">📊 Sistema</div>
              <div className="space-y-1 text-gray-300">
                <div>Ambiente: <span className="text-green-400">{import.meta.env.MODE}</span></div>
                <div>API: <span className="text-yellow-400">{import.meta.env.VITE_API_URL || '/api/v1'}</span></div>
                <div>React: <span className="text-blue-400">v18</span></div>
                <div>Three.js: <span className="text-purple-400">Active</span></div>
              </div>
            </div>

            <div>
              <div className="text-cyan-400 font-bold mb-1">👤 Usuário</div>
              <div className="space-y-1 text-gray-300">
                <div>Nome: <span className="text-white">{characterData?.fullName}</span></div>
                <div>Email: <span className="text-white">{characterData?.email}</span></div>
                <div>ID: <span className="text-gray-400 text-xs">{characterData?.userId}</span></div>
              </div>
            </div>

            <div>
              <div className="text-cyan-400 font-bold mb-1">🎮 Personagem</div>
              <div className="space-y-1 text-gray-300">
                <div>Nome: <span className="text-white">{characterData?.name}</span></div>
                <div>Auth: {characterData?.hasToken ? <span className="text-green-400">✓ Token válido</span> : <span className="text-red-400">✗ Sem token</span>}</div>
              </div>
            </div>

            <div>
              <div className="text-cyan-400 font-bold mb-1">🎯 Status</div>
              <div className="space-y-1 text-gray-300">
                <div>Fase: <span className="text-yellow-400">Pré-Alpha</span></div>
                <div>Data wipe: <span className="text-red-400">7 dias</span></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-3">
            <div>
              <div className="text-cyan-400 font-bold mb-1">⚡ FPS</div>
              <div className="text-2xl font-bold">
                <span className={fps >= 60 ? 'text-green-400' : fps >= 30 ? 'text-yellow-400' : 'text-red-400'}>
                  {fps}
                </span>
                <span className="text-gray-400 text-sm ml-1">fps</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full transition-all ${fps >= 60 ? 'bg-green-400' : fps >= 30 ? 'bg-yellow-400' : 'bg-red-400'}`}
                  style={{ width: `${Math.min((fps / 60) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="text-cyan-400 font-bold mb-1">🎨 Renderização</div>
              <div className="space-y-1 text-gray-300">
                <div>Engine: <span className="text-blue-400">Three.js + R3F</span></div>
                <div>Shadows: <span className="text-green-400">Enabled</span></div>
                <div>Fog: <span className="text-green-400">Active</span></div>
                <div>Camera FOV: <span className="text-white">60°</span></div>
              </div>
            </div>

            <div>
              <div className="text-cyan-400 font-bold mb-1">📦 Assets</div>
              <div className="space-y-1 text-gray-300">
                <div>Models: <span className="text-white">1 (Poses.glb)</span></div>
                <div>Textures: <span className="text-white">Procedural</span></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'storage' && (
          <div className="space-y-3">
            <div>
              <div className="text-cyan-400 font-bold mb-2">💾 LocalStorage</div>
              <div className="space-y-2">
                {Object.keys(localStorage).map((key) => (
                  <div key={key} className="bg-black/50 p-2 rounded border border-gray-700">
                    <div className="text-yellow-400 mb-1">{key}</div>
                    <div className="text-gray-400 text-xs break-all">
                      {key.includes('Token')
                        ? `${localStorage.getItem(key)?.substring(0, 20)}...`
                        : localStorage.getItem(key)?.substring(0, 50) || 'null'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (confirm('Limpar todo o localStorage? Você será deslogado.')) {
                  localStorage.clear();
                  window.location.href = '/login';
                }
              }}
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded border border-red-500/50 transition-colors"
            >
              🗑️ Limpar Storage
            </button>
          </div>
        )}

        {activeTab === 'console' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <div className="text-cyan-400 font-bold">📋 Console Logs</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setLogs([])}
                  className="text-xs px-2 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded border border-red-500/50"
                >
                  Limpar
                </button>
                <button
                  onClick={exportLogs}
                  className="text-xs px-2 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded border border-cyan-500/50"
                >
                  Exportar
                </button>
              </div>
            </div>

            <div className="space-y-1 max-h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <div className="text-gray-500 text-center py-4">Nenhum log ainda...</div>
              ) : (
                logs.map((log, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded text-xs font-mono ${
                      log.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
                      log.type === 'warn' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' :
                      'bg-black/30 text-gray-300 border border-gray-700'
                    }`}
                  >
                    <div className="text-gray-500 text-xs mb-1">[{log.time}]</div>
                    <div className="break-all">{log.message}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'cheats' && (
          <div className="space-y-3">
            <div className="text-yellow-400 font-bold mb-2">⚠️ Cheats & Debug</div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  const newHp = prompt('Novo HP (atual: 100):', '999');
                  if (newHp) console.log('HP modificado para:', newHp);
                }}
                className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded border border-red-500/50 transition-colors text-left"
              >
                ❤️ Modificar HP
              </button>

              <button
                onClick={() => {
                  const newMp = prompt('Novo MP (atual: 50):', '999');
                  if (newMp) console.log('MP modificado para:', newMp);
                }}
                className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded border border-blue-500/50 transition-colors text-left"
              >
                ✨ Modificar MP
              </button>

              <button
                onClick={() => {
                  const newXp = prompt('Novo XP (atual: 0):', '9999');
                  if (newXp) console.log('XP modificado para:', newXp);
                }}
                className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-3 py-2 rounded border border-purple-500/50 transition-colors text-left"
              >
                ⭐ Modificar XP
              </button>

              <button
                onClick={() => {
                  const newLevel = prompt('Novo Nível (atual: 1):', '99');
                  if (newLevel) console.log('Nível modificado para:', newLevel);
                }}
                className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-3 py-2 rounded border border-yellow-500/50 transition-colors text-left"
              >
                🏆 Modificar Nível
              </button>

              <div className="border-t border-gray-700 pt-2 mt-2">
                <label className="flex items-center justify-between p-2 bg-black/30 rounded border border-gray-700 cursor-pointer hover:bg-black/50">
                  <span className="text-gray-300">🛡️ God Mode (Invencibilidade)</span>
                  <input
                    type="checkbox"
                    checked={godMode}
                    onChange={(e) => {
                      setGodMode(e.target.checked);
                      console.log('God Mode:', e.target.checked ? 'ON' : 'OFF');
                    }}
                    className="w-4 h-4"
                  />
                </label>
              </div>

              <div>
                <label className="flex items-center justify-between p-2 bg-black/30 rounded border border-gray-700 cursor-pointer hover:bg-black/50">
                  <span className="text-gray-300">🎯 Mostrar Colliders</span>
                  <input
                    type="checkbox"
                    checked={showCollision}
                    onChange={(e) => {
                      setShowCollision(e.target.checked);
                      console.log('Show Colliders:', e.target.checked ? 'ON' : 'OFF');
                    }}
                    className="w-4 h-4"
                  />
                </label>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">⏱️ Time Scale: {timeScale}x</label>
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={timeScale}
                  onChange={(e) => {
                    setTimeScale(parseFloat(e.target.value));
                    console.log('Time Scale:', e.target.value);
                  }}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.1x</span>
                  <span>5x</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'utils' && (
          <div className="space-y-3">
            <div className="text-cyan-400 font-bold mb-2">🔧 Utilitários</div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  const coords = `X: ${position.x.toFixed(2)}, Y: ${position.y.toFixed(2)}, Z: ${position.z.toFixed(2)}`;
                  copyToClipboard(coords);
                }}
                className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 px-3 py-2 rounded border border-cyan-500/50 transition-colors text-left"
              >
                📍 Copiar Coordenadas Atuais
              </button>

              <button
                onClick={() => {
                  const token = localStorage.getItem('accessToken');
                  if (token) copyToClipboard(token);
                }}
                className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-2 rounded border border-green-500/50 transition-colors text-left"
              >
                🔑 Copiar Access Token
              </button>

              <button
                onClick={() => {
                  const userId = localStorage.getItem('userId');
                  if (userId) copyToClipboard(userId);
                }}
                className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded border border-blue-500/50 transition-colors text-left"
              >
                🆔 Copiar User ID
              </button>

              <button
                onClick={() => {
                  const debugInfo = {
                    user: characterData,
                    fps: fps,
                    position: position,
                    timestamp: new Date().toISOString(),
                    godMode,
                    showCollision,
                    timeScale
                  };
                  copyToClipboard(JSON.stringify(debugInfo, null, 2));
                }}
                className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-3 py-2 rounded border border-purple-500/50 transition-colors text-left"
              >
                📊 Copiar Debug Info (JSON)
              </button>

              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="w-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 px-3 py-2 rounded border border-orange-500/50 transition-colors text-left"
              >
                🔄 Recarregar Página
              </button>

              <button
                onClick={() => {
                  if (confirm('Voltar para página de criação de personagem?')) {
                    window.location.href = '/';
                  }
                }}
                className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-3 py-2 rounded border border-yellow-500/50 transition-colors text-left"
              >
                🎨 Voltar para Character Creation
              </button>

              <button
                onClick={() => {
                  const screenshot = confirm('Funcionalidade de screenshot ainda não implementada. Usar Print Screen do sistema?');
                  if (screenshot) alert('Use Print Screen (Windows) ou Cmd+Shift+3 (Mac)');
                }}
                className="w-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 px-3 py-2 rounded border border-pink-500/50 transition-colors text-left"
              >
                📸 Tirar Screenshot
              </button>

              <div className="border-t border-gray-700 pt-2 mt-2">
                <div className="text-gray-400 text-xs mb-2">⚡ Quick Actions</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => console.clear()}
                    className="bg-black/30 hover:bg-black/50 text-gray-300 px-2 py-1 rounded border border-gray-700 text-xs"
                  >
                    Clear Console
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="bg-black/30 hover:bg-black/50 text-gray-300 px-2 py-1 rounded border border-gray-700 text-xs"
                  >
                    Print Page
                  </button>
                  <button
                    onClick={() => window.open(window.location.href)}
                    className="bg-black/30 hover:bg-black/50 text-gray-300 px-2 py-1 rounded border border-gray-700 text-xs"
                  >
                    Nova Aba
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    className="bg-black/30 hover:bg-black/50 text-gray-300 px-2 py-1 rounded border border-gray-700 text-xs"
                  >
                    Copy URL
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-cyan-500/30 p-2 text-center">
        <div className="text-xs text-gray-500">
          ChronoTask Dev Tools v0.1.0
        </div>
      </div>
    </div>
  );
};
