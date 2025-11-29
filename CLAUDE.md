# ChronoTask - Contexto do Projeto

## Visão Geral
ChronoTask é um jogo RPG gamificado de produtividade onde usuários criam personagens 3D customizáveis e progridem através da conclusão de tarefas do dia a dia.

## Stack Tecnológica
- **Frontend**: React + Vite
- **3D Engine**: React Three Fiber (@react-three/fiber) + Three.js
- **UI**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router
- **3D Models**: GLB/GLTF format

## Estrutura do Projeto

### Principais Diretórios
```
src/
├── components/
│   ├── character/        # Componentes de criação/customização de personagem
│   │   └── CharacterUI.jsx
│   ├── gameplay/         # Componentes da cena de jogo
│   │   ├── GameScene.jsx      # Cena 3D principal com controles
│   │   ├── GameHUD.jsx        # Interface do jogador (HP, MP, XP)
│   │   └── PlayableAvatar.jsx # Avatar 3D do jogador
│   └── DashboardNavbar.jsx
├── pages/
│   ├── Gameplay.jsx      # Página principal do jogo
│   ├── Login.jsx
│   └── Register.jsx
├── services/
│   └── api.js           # Cliente API e interceptors
├── stores/
│   └── characterStore.js # Estado global do personagem
└── App.jsx

public/
└── models/              # Modelos 3D (.glb)
    └── Poses.glb       # Poses e animações do personagem
```

## Principais Funcionalidades

### 1. Sistema de Autenticação
- Login/Register com JWT tokens
- Tokens armazenados em localStorage
- Interceptor automático para adicionar Bearer token
- Redirecionamento automático para /login em 401

### 2. Criação de Personagem
- Customização 3D interativa (corpo, olhos, cabelo, roupa, acessórios)
- Preview em tempo real com React Three Fiber
- Salvamento em localStorage e API
- Verificação de personagem existente

### 3. Gameplay 3D
- **Controles**: WASD ou setas para movimento, Shift para correr
- **Câmera**: Segue o jogador automaticamente (terceira pessoa)
- **Física**: Sistema de colisão AABB com obstáculos
- **Animações**: Idle animation (walking animations removidas devido a incompatibilidade)

### 4. HUD (Interface do Jogador)
- Posição: Lado esquerdo da tela
- Informações exibidas:
  - Avatar do usuário (iniciais)
  - Nome do personagem
  - Nível
  - Barra de HP (Health Points)
  - Barra de MP (Mana Points)
  - Barra de XP (Experience Points)
- Funcionalidade de colapsar/expandir (hamburger menu)
- Estados:
  - Expandido: Todas as informações visíveis
  - Colapsado: Apenas mini barras (HP, MP, XP) e nível

## API Endpoints

```javascript
// Base URL: import.meta.env.VITE_API_URL || '/api/v1'

POST /user              // Criar usuário
POST /login             // Login
POST /character         // Criar personagem
GET /user/character     // Buscar personagens do usuário
```

### Resposta de GET /user/character
```json
{
  "characters": [
    {
      "id": "string",
      "name": "string",
      "level": 1,
      "currentXp": 0,
      "maxXp": 100,
      "currentHp": 100,
      "maxHp": 100,
      "currentMp": 50,
      "maxMp": 50,
      // outros atributos...
    }
  ]
}
```

## LocalStorage Keys
```javascript
'accessToken'              // JWT access token
'refreshToken'             // JWT refresh token
'userId'                   // ID do usuário
'userEmail'                // Email do usuário
'userFullName'             // Nome completo do usuário
'characterName'            // Nome do personagem (fallback)
'characterCustomization'   // JSON com customização do personagem
```

## Sistema de Colisão
- Algoritmo: AABB (Axis-Aligned Bounding Box)
- Player radius: 0.5 unidades
- Obstáculos definidos em GameScene.jsx
- Collision check antes de aplicar movimento

## Problemas Conhecidos e Soluções

### 1. Animações Mixamo
**Problema**: Animações do Mixamo causavam o personagem "cair de cara" no chão
**Causa**: Incompatibilidade de skeleton entre modelo customizado e animações Mixamo
**Solução**: Usar apenas Idle animation do Poses.glb (animações removidas)

### 2. Setas Scrollando a Página
**Problema**: Arrow keys faziam scroll na página durante gameplay
**Solução**: preventDefault() em keydown para setas (Gameplay.jsx:11-20)

### 3. Dropdown não Fechando
**Problema**: Menu dropdown do navbar não fechava ao clicar fora
**Solução**: Click-outside detection com useRef e mousedown listener

### 4. Reconhecimento de Personagem Existente
**Problema**: API retornava `{characters: []}` mas código verificava `character.name`
**Solução**: Acessar `response.characters[0]` em CharacterUI.jsx

## Variáveis de Ambiente

```bash
# .env.production
VITE_API_URL=https://api.chronotask.com/api/v1
```

## Estado Atual (Pré-Alpha)
- ⚠️ Todos os dados são deletados após 7 dias
- Sistema de movimento funcional com colisão
- HUD básico implementado com dados da API
- Customização de personagem 3D funcionando
- Autenticação com JWT implementada

## Próximos Passos (Roadmap)
- [ ] Sistema de missões/tarefas
- [ ] Sistema de inventário
- [ ] NPCs e diálogos
- [ ] Sistema de combate
- [ ] Multiplayer/Social features
- [ ] Mobile responsiveness
- [ ] Animações de walking compatíveis
- [ ] Sistema de achievements

## Notas de Desenvolvimento
- Sempre usar especialized tools (Read, Edit, Write) ao invés de bash para operações de arquivo
- Preferir edição de arquivos existentes ao invés de criar novos
- Manter componentes pequenos e focados
- Usar Tailwind para styling (evitar CSS customizado)
- Console.log liberalmente durante desenvolvimento para debugging
- Testar colisões e física em diferentes cenários

## Convenções de Código
- Components em PascalCase
- Funções/variáveis em camelCase
- Usar arrow functions para components
- Preferir const sobre let
- Destructuring quando possível
- Comments em português para clareza do time

## Performance
- Modelos 3D devem ser otimizados (low-poly quando possível)
- Usar Suspense para lazy loading de 3D assets
- Limitar shadow-mapSize para 2048x2048
- Fog para melhorar performance de renderização distante
