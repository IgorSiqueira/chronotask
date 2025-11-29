import { useState, useEffect } from 'react';
import { getUserCharacter } from '../../services/api';

export const GameHUD = () => {
  const [userData, setUserData] = useState(null);
  const [characterData, setCharacterData] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      // Load user data
      const fullName = localStorage.getItem('userFullName');
      const email = localStorage.getItem('userEmail');

      if (fullName && email) {
        setUserData({ fullName, email });
      }

      // Load character data from API
      try {
        const response = await getUserCharacter();
        console.log('API response:', response);

        if (response && response.characters && response.characters.length > 0) {
          const character = response.characters[0];
          console.log('Character data:', character);
          setCharacterData(character);
        }
      } catch (error) {
        console.error('Failed to load character data:', error);
        // Fallback to localStorage if API fails
        const mockCharacter = {
          name: localStorage.getItem('characterName') || 'Aventureiro',
          level: 1,
          currentXp: 0,
          maxXp: 100,
          currentHp: 100,
          maxHp: 100,
          currentMp: 50,
          maxMp: 50,
        };
        setCharacterData(mockCharacter);
      }
    };

    loadData();
  }, []);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!userData || !characterData) return null;

  return (
    <div className="absolute top-4 left-4 z-10 pointer-events-none">
      <div className={`bg-black/60 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl transition-all duration-300 pointer-events-auto ${isCollapsed ? 'p-2' : 'p-3'}`}>
        {/* Hamburger Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-3 bg-black/80 hover:bg-black/90 rounded-full p-1.5 border border-white/20 transition-colors"
          title={isCollapsed ? 'Expandir HUD' : 'Colapsar HUD'}
        >
          <div className="w-4 h-4 flex flex-col justify-center gap-0.5">
            <div className={`h-0.5 bg-white transition-all ${isCollapsed ? 'rotate-45 translate-y-1' : ''}`} />
            <div className={`h-0.5 bg-white transition-all ${isCollapsed ? 'opacity-0' : ''}`} />
            <div className={`h-0.5 bg-white transition-all ${isCollapsed ? '-rotate-45 -translate-y-1' : ''}`} />
          </div>
        </button>

        {isCollapsed ? (
          // Collapsed View - Only Mini Bars
          <div className="flex flex-col gap-1.5 w-16">
            {/* HP Bar */}
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-red-500"
                style={{ width: `${((characterData.currentHp || 0) / (characterData.maxHp || 100)) * 100}%` }}
              />
            </div>
            {/* MP Bar */}
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-blue-500"
                style={{ width: `${((characterData.currentMp || 0) / (characterData.maxMp || 50)) * 100}%` }}
              />
            </div>
            {/* XP Bar */}
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                style={{ width: `${(characterData.currentXp / characterData.maxXp) * 100}%` }}
              />
            </div>
            {/* Level Badge */}
            <div className="flex justify-center mt-0.5">
              <div className="bg-yellow-500 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-yellow-600">
                {characterData.level}
              </div>
            </div>
          </div>
        ) : (
          // Expanded View
          <div className="flex items-center gap-3" style={{ minWidth: '320px' }}>
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold border-2 border-white/20 shadow-lg">
                {getInitials(userData.fullName)}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 bg-yellow-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-black/60">
                {characterData.level}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              {/* Character Name */}
              <h3 className="text-white font-bold text-sm leading-tight mb-2">
                {characterData.name}
              </h3>

              {/* HP Bar */}
              <div className="space-y-0.5 mb-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-red-400 font-medium">❤️ HP</span>
                  <span className="text-slate-300 text-xs">{characterData.currentHp || 0}/{characterData.maxHp || 100}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300"
                    style={{ width: `${((characterData.currentHp || 0) / (characterData.maxHp || 100)) * 100}%` }}
                  />
                </div>
              </div>

              {/* MP Bar */}
              <div className="space-y-0.5 mb-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-blue-400 font-medium">✨ MP</span>
                  <span className="text-slate-300 text-xs">{characterData.currentMp || 0}/{characterData.maxMp || 50}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300"
                    style={{ width: `${((characterData.currentMp || 0) / (characterData.maxMp || 50)) * 100}%` }}
                  />
                </div>
              </div>

              {/* XP Bar */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Nível {characterData.level}</span>
                  <span className="text-xs">{characterData.currentXp}/{characterData.maxXp} XP</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${(characterData.currentXp / characterData.maxXp) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
