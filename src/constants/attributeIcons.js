/**
 * Mapeamento de ícones para atributos de personagem
 *
 * Para adicionar/modificar ícones:
 * 1. Adicione ou modifique a entrada no objeto ATTRIBUTE_ICONS
 * 2. A chave deve corresponder ao nome do atributo (case-insensitive)
 * 3. O valor é o emoji que será exibido
 *
 * Exemplo de uso:
 * - "Força(FOR)" -> busca por 'força' ou 'for' -> retorna '⚔️'
 * - "Destreza(DES)" -> busca por 'destreza' ou 'des' -> retorna '🏃'
 */

export const ATTRIBUTE_ICONS = {
  // Força
  'força': '⚔️',
  'for': '⚔️',
  'strength': '⚔️',
  'str': '⚔️',

  // Destreza
  'destreza': '🏃',
  'des': '🏃',
  'dexterity': '🏃',
  'dex': '🏃',

  // Constituição
  'constituição': '💪',
  'con': '💪',
  'constitution': '💪',

  // Inteligência
  'inteligência': '🧠',
  'int': '🧠',
  'intelligence': '🧠',

  // Sabedoria
  'sabedoria': '📚',
  'sab': '📚',
  'wisdom': '📚',
  'wis': '📚',

  // Carisma
  'carisma': '💬',
  'car': '💬',
  'charisma': '💬',
  'cha': '💬',

  // Vontade
  'vontade': '🎯',
  'von': '🎯',
  'willpower': '🎯',
  'wil': '🎯',

  // Outros atributos comuns (caso você adicione futuramente)
  'sorte': '✨',
  'luck': '✨',

  'defesa': '🛡️',
  'defense': '🛡️',
  'def': '🛡️',

  'agilidade': '⚡',
  'agility': '⚡',
  'agi': '⚡',

  'percepção': '👁️',
  'perception': '👁️',
  'per': '👁️',

  'furtividade': '🥷',
  'stealth': '🥷',

  'vigor': '❤️',
  'vitality': '❤️',
  'vit': '❤️',
};

/**
 * Ícone padrão para atributos não mapeados
 */
export const DEFAULT_ATTRIBUTE_ICON = '📊';

/**
 * Função helper para obter o ícone de um atributo
 * @param {string} attributeName - Nome do atributo (ex: "Força(FOR)")
 * @returns {string} Emoji correspondente ao atributo
 */
export const getAttributeIcon = (attributeName) => {
  if (!attributeName) return DEFAULT_ATTRIBUTE_ICON;

  const normalized = attributeName.toLowerCase();

  // Buscar por match exato ou parcial
  for (const [key, icon] of Object.entries(ATTRIBUTE_ICONS)) {
    if (normalized.includes(key)) {
      return icon;
    }
  }

  return DEFAULT_ATTRIBUTE_ICON;
};
