import { PHOTO_POSES, PHOTO_POSES_PT, UI_MODES, useCharacterStore } from "../../stores/characterStore";
import { useState, useEffect } from "react";
import { createCharacter, getUserCharacter } from "../../services/api";
import { useNavigate } from "react-router-dom";

const PosesBox = () => {
  const curPose = useCharacterStore((state) => state.pose);
  const setPose = useCharacterStore((state) => state.setPose);
  return (
    <div className="pointer-events-auto md:rounded-t-lg bg-gradient-to-br from-black/30 to-indigo-900/20 backdrop-blur-sm drop-shadow-md flex p-6 gap-3 overflow-x-auto noscrollbar">
      {Object.keys(PHOTO_POSES).map((pose) => (
        <button
          key={pose}
          className={`transition-colors duration-200 font-medium flex-shrink-0 border-b ${
            curPose === PHOTO_POSES[pose]
              ? "text-white shadow-purple-100 border-b-white"
              : "text-gray-200 hover:text-gray-100 border-b-transparent"
          }`}
          onClick={() => setPose(PHOTO_POSES[pose])}
        >
          {PHOTO_POSES_PT[pose]}
        </button>
      ))}
    </div>
  );
};

const AssetsBox = () => {
  const {
    categories,
    currentCategory,
    setCurrentCategory,
    changeAsset,
    customization,
    lockedGroups,
  } = useCharacterStore();

  return (
    <div className="md:rounded-t-lg bg-gradient-to-br from-black/30 to-indigo-900/20 backdrop-blur-sm drop-shadow-md flex flex-col py-6 gap-3 overflow-hidden">
      <div className="flex items-center gap-4 pointer-events-auto noscrollbar overflow-x-auto px-6 pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setCurrentCategory(category)}
            className={`transition-colors duration-200 font-medium flex-shrink-0 border-b whitespace-nowrap ${
              currentCategory?.name === category.name
                ? "text-white shadow-purple-100 border-b-white"
                : "text-gray-200 hover:text-gray-100 border-b-transparent"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      {lockedGroups[currentCategory?.name] && (
        <p className="text-red-400 px-6">
          Asset is hidden by{" "}
          {lockedGroups[currentCategory.name]
            .map((asset) => `${asset.name} (${asset.categoryName})`)
            .join(", ")}
        </p>
      )}
      <div className="flex gap-2 overflow-x-auto noscrollbar px-6">
        {currentCategory?.removable && (
          <button
            onClick={() => changeAsset(currentCategory.name, null)}
            className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300 bg-gradient-to-tr ${
              !customization[currentCategory.name].asset
                ? "border-white from-white/20 to-white/30"
                : "from-black/70 to-black/20 border-black"
            }`}
          >
            <div className="w-full h-full flex items-center justify-center bg-black/40 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </button>
        )}
        {currentCategory?.assets.map((asset) => (
          <button
            key={asset.id}
            onClick={() => changeAsset(currentCategory.name, asset)}
            className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300 bg-gradient-to-tr ${
              customization[currentCategory.name]?.asset?.id === asset.id
                ? "border-white from-white/20 to-white/30"
                : "from-black/70 to-black/20 border-black"
            }`}
          >
            {asset.thumbnail && (
              <img
                className="object-cover w-full h-full"
                src={asset.thumbnail}
                alt={asset.name}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

const RPGStatsForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [strength, setStrength] = useState(5);
  const [defense, setDefense] = useState(5);
  const [agility, setAgility] = useState(5);
  const [intelligence, setIntelligence] = useState(5);
  const [luck, setLuck] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [hasCharacter, setHasCharacter] = useState(false);
  const [existingCharacter, setExistingCharacter] = useState(null);

  // Verificar se usuário já possui personagem
  useEffect(() => {
    const checkExistingCharacter = async () => {
      // Verificar se existe token
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.log("Token não encontrado no localStorage");
        setError("Você precisa estar logado para criar um personagem");
        setLoading(false);
        return;
      }

      try {
        const response = await getUserCharacter();
        console.log("Resposta da API getUserCharacter:", response);
        console.log("Tipo da resposta:", typeof response);
        console.log("Estrutura:", JSON.stringify(response, null, 2));

        // A API retorna { characters: Array }
        if (response && response.characters && response.characters.length > 0) {
          const character = response.characters[0]; // Pegar o primeiro personagem
          console.log("Personagem encontrado:", character.name);
          setHasCharacter(true);
          setExistingCharacter(character);
          setName(character.name);
          setStrength(character.strength || 5);
          setDefense(character.defense || 5);
          setAgility(character.agility || 5);
          setIntelligence(character.intelligence || 5);
          setLuck(character.luck || 5);
        } else {
          console.log("Nenhum personagem encontrado no array characters");
        }
      } catch (err) {
        // Se retornar 404 ou erro, significa que não tem personagem
        console.log("Erro ao buscar personagem:", err.response?.data || err.message);

        // Se for erro de autenticação, mostrar mensagem
        if (err.response?.status === 401) {
          setError("Sessão expirada. Por favor, faça login novamente.");
        }
        // Se for 404, usuário não tem personagem ainda (ok)
        else if (err.response?.status !== 404) {
          console.error("Erro inesperado:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    checkExistingCharacter();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Por favor, insira o nome do personagem");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const characterData = {
        name: name.trim(),
        strength: 5,
        defense: 5,
        agility: 5,
        intelligence: 5,
        luck: 5
      };

      await createCharacter(characterData);
      setSuccess(true);
      setHasCharacter(true);
      setExistingCharacter(characterData);

      // Salvar customização no localStorage (mock)
      const customization = useCharacterStore.getState().customization;
      localStorage.setItem('characterCustomization', JSON.stringify(customization));
      localStorage.setItem('characterName', name.trim());

      // Redirecionar para gameplay após 2 segundos
      setTimeout(() => {
        navigate('/gameplay');
      }, 2000);
    } catch (err) {
      console.error("Erro ao criar personagem:", err);
      setError(err.response?.data?.message || "Erro ao salvar personagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Se está carregando
  if (loading) {
    return (
      <div className="pointer-events-auto bg-gradient-to-br from-black/40 to-indigo-900/30 backdrop-blur-sm rounded-lg p-6 w-80 shadow-xl border border-white/10">
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-300 animate-pulse">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-auto bg-gradient-to-br from-black/40 to-indigo-900/30 backdrop-blur-sm rounded-lg p-6 w-80 shadow-xl border border-white/10">
      <h2 className="text-white text-xl font-bold mb-4 text-center">
        {hasCharacter ? "Meu Personagem" : "Criar Personagem"}
      </h2>

      {/* Mensagens de erro/sucesso */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-red-200 text-sm text-center">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
          <p className="text-green-200 text-sm text-center">✓ Personagem criado com sucesso!</p>
        </div>
      )}

      {/* Nome do Personagem */}
      <div className="mb-4">
        <label className="block text-gray-200 text-sm font-medium mb-2">
          Nome do Personagem
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome..."
          className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={hasCharacter}
        />
      </div>

      {/* Atributos RPG */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <label className="text-gray-200 text-sm font-medium flex items-center gap-2">
            <span className="text-red-400">⚔️</span> Força
          </label>
          <span className="text-white font-bold text-lg bg-black/30 px-4 py-1 rounded-lg">{strength}</span>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-gray-200 text-sm font-medium flex items-center gap-2">
            <span className="text-blue-400">🛡️</span> Defesa
          </label>
          <span className="text-white font-bold text-lg bg-black/30 px-4 py-1 rounded-lg">{defense}</span>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-gray-200 text-sm font-medium flex items-center gap-2">
            <span className="text-green-400">⚡</span> Agilidade
          </label>
          <span className="text-white font-bold text-lg bg-black/30 px-4 py-1 rounded-lg">{agility}</span>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-gray-200 text-sm font-medium flex items-center gap-2">
            <span className="text-purple-400">🧠</span> Inteligência
          </label>
          <span className="text-white font-bold text-lg bg-black/30 px-4 py-1 rounded-lg">{intelligence}</span>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-gray-200 text-sm font-medium flex items-center gap-2">
            <span className="text-yellow-400">✨</span> Sorte
          </label>
          <span className="text-white font-bold text-lg bg-black/30 px-4 py-1 rounded-lg">{luck}</span>
        </div>
      </div>

      {/* Botão Salvar - apenas no modo criação */}
      {!hasCharacter && (
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          💾 Criar Personagem
        </button>
      )}

      {/* Botão quando já possui personagem */}
      {hasCharacter && (
        <button
          onClick={() => navigate('/gameplay')}
          className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
        >
          🎮 Ir para o Jogo
        </button>
      )}
    </div>
  );
};

const RandomizeButton = () => {
  const randomize = useCharacterStore((state) => state.randomize);
  return (
    <button
      className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto drop-shadow-md"
      onClick={randomize}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
        />
      </svg>
    </button>
  );
};

const ScreenshotButton = () => {
  const screenshot = useCharacterStore((state) => state.screenshot);
  return (
    <button
      className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto drop-shadow-md"
      onClick={screenshot}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
        />
      </svg>
    </button>
  );
};


export const CharacterUI = () => {
  const currentCategory = useCharacterStore((state) => state.currentCategory);
  const customization = useCharacterStore((state) => state.customization);
  const mode = useCharacterStore((state) => state.mode);
  const setMode = useCharacterStore((state) => state.setMode);
  const loading = useCharacterStore((state) => state.loading);

  return (
    <main className="pointer-events-none fixed z-10 inset-0 select-none">
      <div
        className={`absolute inset-0 bg-black z-10 pointer-events-none flex items-center justify-center transition-opacity duration-1000 ${
          loading ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-white text-4xl font-bold animate-pulse">
          ChronoTask
        </div>
      </div>

      {/* Pre-Alpha Warning */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
        <div className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/50 rounded-lg px-4 py-2">
          <p className="text-yellow-200 text-sm font-medium text-center">
            ⚠️ Versão Pré-Alpha - Esta é uma prévia em desenvolvimento
          </p>
        </div>
      </div>
      <div className="mx-auto h-full max-w-screen-xl w-full flex flex-col justify-between">
        <div className="flex justify-between items-start p-10 pt-20">
          {/* Formulário RPG no lado esquerdo */}
          <RPGStatsForm />

          {/* Botões no lado direito */}
          <div className="flex items-center gap-2">
            <RandomizeButton />
            <ScreenshotButton />
          </div>
        </div>
        <div className="md:px-10 flex flex-col">
          {mode === UI_MODES.CUSTOMIZE && (
            <>
              {currentCategory?.colorPalette &&
                customization[currentCategory.name] && <ColorPicker />}
              <AssetsBox />
            </>
          )}
          {mode === UI_MODES.PHOTO && <PosesBox />}
          <div className="flex justify-stretch">
            <button
              className={`flex-1 pointer-events-auto p-4 text-white transition-colors duration-200 font-medium ${
                mode === UI_MODES.CUSTOMIZE
                  ? "bg-indigo-500/90"
                  : "bg-indigo-500/30 hover:bg-indigo-500/50"
              }`}
              onClick={() => setMode(UI_MODES.CUSTOMIZE)}
            >
              Personalizar avatar
            </button>
            <div className="w-px bg-white/30"></div>
            <button
              className={`flex-1 pointer-events-auto p-4 text-white transition-colors duration-200 font-medium ${
                mode === UI_MODES.PHOTO
                  ? "bg-indigo-500/90"
                  : "bg-indigo-500/30 hover:bg-indigo-500/50"
              }`}
              onClick={() => setMode(UI_MODES.PHOTO)}
            >
              Cabine de fotos
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

const ColorPicker = () => {
  const updateColor = useCharacterStore((state) => state.updateColor);
  const currentCategory = useCharacterStore((state) => state.currentCategory);
  const handleColorChange = (color) => {
    updateColor(color);
  };
  const customization = useCharacterStore((state) => state.customization);

  if (!customization[currentCategory.name]?.asset) {
    return null;
  }
  return (
    <div className="pointer-events-auto relative flex gap-2 max-w-full overflow-x-auto backdrop-blur-sm py-2 drop-shadow-md noscrollbar px-2 md:px-0">
      {currentCategory.colorPalette?.colors.map((color, index) => (
        <button
          key={`${index}-${color}`}
          className={`w-10 h-10 p-1.5 drop-shadow-md bg-black/20 shrink-0 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
            customization[currentCategory.name].color === color
              ? "border-white"
              : "border-transparent"
          }`}
          onClick={() => handleColorChange(color)}
        >
          <div
            className="w-full h-full rounded-md"
            style={{ backgroundColor: color }}
          />
        </button>
      ))}
    </div>
  );
};
