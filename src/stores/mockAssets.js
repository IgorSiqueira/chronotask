// Mock data com TODOS os assets disponíveis organizados logicamente
export const mockCategories = [
  // ==================== CABEÇA E ROSTO (Obrigatório) ====================
  {
    id: "head",
    name: "Cabeça",
    position: 0,
    removable: false,
    startingAsset: "head1",
    colorPalette: {
      colors: ["#f5c6a5", "#e8b796", "#d4a574", "#c68642", "#8d5524", "#5d3a1a"],
    },
    cameraPlacement: { position: [0, 0.6, 2], target: [0, 0.5, 0] },
    assets: [
      { id: "head1", name: "Head 1", url: "/assets/Head.001.glb", group: "head", thumbnail: "/assets/head.jpg" },
      { id: "head2", name: "Head 2", url: "/assets/Head.002.glb", group: "head", thumbnail: "/assets/head.jpg" },
      { id: "head3", name: "Head 3", url: "/assets/Head.003.glb", group: "head", thumbnail: "/assets/head.jpg" },
      { id: "head4", name: "Head 4", url: "/assets/Head.004.glb", group: "head", thumbnail: "/assets/head.jpg" },
      { id: "pumpkinhead", name: "Pumpkin Head", url: "/assets/PumpkinHead.glb", group: "head", thumbnail: "/assets/head.jpg" },
    ],
  },

  {
    id: "eyes",
    name: "Olhos",
    position: 1,
    removable: false,
    startingAsset: "eyes1",
    colorPalette: {
      colors: ["#8b4513", "#4169e1", "#228b22", "#808080", "#000000", "#ffa500", "#ff1493"],
    },
    cameraPlacement: { position: [0, 0.55, 1.5], target: [0, 0.5, 0] },
    assets: [
      { id: "eyes1", name: "Eyes 1", url: "/assets/Eyes.001.glb", group: "eyes", thumbnail: "/assets/eyes.jpg" },
      { id: "eyes2", name: "Eyes 2", url: "/assets/Eyes.002.glb", group: "eyes", thumbnail: "/assets/eyes.jpg" },
      { id: "eyes3", name: "Eyes 3", url: "/assets/Eyes.003.glb", group: "eyes", thumbnail: "/assets/eyes.jpg" },
      { id: "eyes4", name: "Eyes 4", url: "/assets/Eyes.004.glb", group: "eyes", thumbnail: "/assets/eyes.jpg" },
      { id: "eyes5", name: "Eyes 5", url: "/assets/Eyes.005.glb", group: "eyes", thumbnail: "/assets/eyes.jpg" },
      { id: "eyes6", name: "Eyes 6", url: "/assets/Eyes.006.glb", group: "eyes", thumbnail: "/assets/eyes.jpg" },
      { id: "eyes7", name: "Eyes 7", url: "/assets/Eyes.007.glb", group: "eyes", thumbnail: "/assets/eyes.jpg" },
      { id: "eyes8", name: "Eyes 8", url: "/assets/Eyes.008.glb", group: "eyes", thumbnail: "/assets/eyes.jpg" },
      { id: "eyes9", name: "Eyes 9", url: "/assets/Eyes.009.glb", group: "eyes", thumbnail: "/assets/eyes.jpg" },
      { id: "eyes10", name: "Eyes 10", url: "/assets/Eyes.010.glb", group: "eyes", thumbnail: "/assets/eyes.jpg" },
      { id: "eyes11", name: "Eyes 11", url: "/assets/Eyes.011.glb", group: "eyes", thumbnail: "/assets/eyes.jpg" },
      { id: "eyes12", name: "Eyes 12", url: "/assets/Eyes.012.glb", group: "eyes", thumbnail: "/assets/eyes.jpg" },
    ],
  },

  {
    id: "eyebrows",
    name: "Sobrancelhas",
    position: 2,
    removable: false,
    startingAsset: "eyebrow1",
    colorPalette: {
      colors: ["#000000", "#3d2314", "#8b4513", "#daa520", "#ffffff"],
    },
    cameraPlacement: { position: [0, 0.6, 1.5], target: [0, 0.55, 0] },
    assets: [
      { id: "eyebrow1", name: "Eyebrow 1", url: "/assets/EyeBrow.001.glb", group: "eyebrows", thumbnail: "/assets/eyebrows.jpg" },
      { id: "eyebrow2", name: "Eyebrow 2", url: "/assets/EyeBrow.002.glb", group: "eyebrows", thumbnail: "/assets/eyebrows.jpg" },
      { id: "eyebrow3", name: "Eyebrow 3", url: "/assets/EyeBrow.003.glb", group: "eyebrows", thumbnail: "/assets/eyebrows.jpg" },
      { id: "eyebrow4", name: "Eyebrow 4", url: "/assets/EyeBrow.004.glb", group: "eyebrows", thumbnail: "/assets/eyebrows.jpg" },
      { id: "eyebrow5", name: "Eyebrow 5", url: "/assets/EyeBrow.005.glb", group: "eyebrows", thumbnail: "/assets/eyebrows.jpg" },
      { id: "eyebrow6", name: "Eyebrow 6", url: "/assets/EyeBrow.006.glb", group: "eyebrows", thumbnail: "/assets/eyebrows.jpg" },
      { id: "eyebrow7", name: "Eyebrow 7", url: "/assets/EyeBrow.007.glb", group: "eyebrows", thumbnail: "/assets/eyebrows.jpg" },
      { id: "eyebrow8", name: "Eyebrow 8", url: "/assets/EyeBrow.008.glb", group: "eyebrows", thumbnail: "/assets/eyebrows.jpg" },
      { id: "eyebrow9", name: "Eyebrow 9", url: "/assets/EyeBrow.009.glb", group: "eyebrows", thumbnail: "/assets/eyebrows.jpg" },
      { id: "eyebrow10", name: "Eyebrow 10", url: "/assets/EyeBrow.010.glb", group: "eyebrows", thumbnail: "/assets/eyebrows.jpg" },
    ],
  },

  {
    id: "nose",
    name: "Nariz",
    position: 3,
    removable: false,
    startingAsset: "nose1",
    colorPalette: {
      colors: ["#f5c6a5", "#e8b796", "#d4a574", "#c68642", "#8d5524"],
    },
    cameraPlacement: { position: [0, 0.45, 1.5], target: [0, 0.4, 0] },
    assets: [
      { id: "nose1", name: "Nose 1", url: "/assets/Nose.001.glb", group: "nose", thumbnail: "/assets/nose.jpg" },
      { id: "nose2", name: "Nose 2", url: "/assets/Nose.002.glb", group: "nose", thumbnail: "/assets/nose.jpg" },
      { id: "nose3", name: "Nose 3", url: "/assets/Nose.003.glb", group: "nose", thumbnail: "/assets/nose.jpg" },
      { id: "nose4", name: "Nose 4", url: "/assets/Nose.004.glb", group: "nose", thumbnail: "/assets/nose.jpg" },
    ],
  },

  // ==================== CABELO E ACESSÓRIOS DA CABEÇA ====================
  {
    id: "hair",
    name: "Cabelo",
    position: 4,
    removable: true,
    startingAsset: "hair1",
    colorPalette: {
      colors: ["#000000", "#3d2314", "#8b4513", "#daa520", "#ff0000", "#ffffff", "#0000ff", "#00ff00"],
    },
    cameraPlacement: { position: [0, 0.9, 2], target: [0, 0.7, 0] },
    assets: [
      { id: "hair1", name: "Hair 1", url: "/assets/Hair.001.glb", group: "hair", thumbnail: "/assets/hair.jpg" },
      { id: "hair2", name: "Hair 2", url: "/assets/Hair.002.glb", group: "hair", thumbnail: "/assets/hair.jpg" },
      { id: "hair3", name: "Hair 3", url: "/assets/Hair.003.glb", group: "hair", thumbnail: "/assets/hair.jpg" },
      { id: "hair4", name: "Hair 4", url: "/assets/Hair.004.glb", group: "hair", thumbnail: "/assets/hair.jpg" },
      { id: "hair5", name: "Hair 5", url: "/assets/Hair.005.glb", group: "hair", thumbnail: "/assets/hair.jpg" },
      { id: "hair6", name: "Hair 6", url: "/assets/Hair.006.glb", group: "hair", thumbnail: "/assets/hair.jpg" },
      { id: "hair7", name: "Hair 7", url: "/assets/Hair.007.glb", group: "hair", thumbnail: "/assets/hair.jpg" },
      { id: "hair8", name: "Hair 8", url: "/assets/Hair.008.glb", group: "hair", thumbnail: "/assets/hair.jpg" },
      { id: "hair9", name: "Hair 9", url: "/assets/Hair.009.glb", group: "hair", thumbnail: "/assets/hair.jpg" },
      { id: "hair10", name: "Hair 10", url: "/assets/Hair.010.glb", group: "hair", thumbnail: "/assets/hair.jpg" },
      { id: "hair11", name: "Hair 11", url: "/assets/Hair.011.glb", group: "hair", thumbnail: "/assets/hair.jpg" },
    ],
  },

  {
    id: "hat",
    name: "Chapéu",
    position: 5,
    removable: true,
    colorPalette: {
      colors: ["#000000", "#8b4513", "#ff0000", "#0000ff", "#ffffff", "#ffd700"],
    },
    cameraPlacement: { position: [0, 0.9, 2], target: [0, 0.7, 0] },
    assets: [
      { id: "hat1", name: "Hat 1", url: "/assets/Hat.001.glb", group: "hat", thumbnail: "/assets/hair.jpg" },
      { id: "hat2", name: "Hat 2", url: "/assets/Hat.002.glb", group: "hat", thumbnail: "/assets/hair.jpg" },
      { id: "hat3", name: "Hat 3", url: "/assets/Hat.003.glb", group: "hat", thumbnail: "/assets/hair.jpg" },
      { id: "hat4", name: "Hat 4", url: "/assets/Hat.004.glb", group: "hat", thumbnail: "/assets/hair.jpg" },
      { id: "hat5", name: "Hat 5", url: "/assets/Hat.005.glb", group: "hat", thumbnail: "/assets/hair.jpg" },
      { id: "hat6", name: "Hat 6", url: "/assets/Hat.006.glb", group: "hat", thumbnail: "/assets/hair.jpg" },
      { id: "hat7", name: "Hat 7", url: "/assets/Hat.007.glb", group: "hat", thumbnail: "/assets/hair.jpg" },
    ],
  },

  {
    id: "bow",
    name: "Laço",
    position: 6,
    removable: true,
    colorPalette: {
      colors: ["#ff1493", "#ff0000", "#ffd700", "#0000ff", "#ffffff", "#000000"],
    },
    cameraPlacement: { position: [0, 0.8, 2], target: [0, 0.65, 0] },
    assets: [
      { id: "bow1", name: "Bow 1", url: "/assets/Bow.001.glb", group: "bow", thumbnail: "/assets/hair.jpg" },
      { id: "bow2", name: "Bow 2", url: "/assets/Bow.002.glb", group: "bow", thumbnail: "/assets/hair.jpg" },
    ],
  },

  // ==================== ACESSÓRIOS FACIAIS (Opcionais) ====================
  {
    id: "facialhair",
    name: "Barba",
    position: 7,
    removable: true,
    colorPalette: {
      colors: ["#000000", "#3d2314", "#8b4513", "#daa520", "#808080", "#ffffff"],
    },
    cameraPlacement: { position: [0, 0.4, 1.5], target: [0, 0.35, 0] },
    assets: [
      { id: "facialhair1", name: "Beard 1", url: "/assets/FacialHair.001.glb", group: "facialhair", thumbnail: "/assets/head.jpg" },
      { id: "facialhair2", name: "Beard 2", url: "/assets/FacialHair.002.glb", group: "facialhair", thumbnail: "/assets/head.jpg" },
      { id: "facialhair3", name: "Beard 3", url: "/assets/FacialHair.003.glb", group: "facialhair", thumbnail: "/assets/head.jpg" },
      { id: "facialhair4", name: "Mustache 1", url: "/assets/FacialHair.004.glb", group: "facialhair", thumbnail: "/assets/head.jpg" },
      { id: "facialhair5", name: "Mustache 2", url: "/assets/FacialHair.005.glb", group: "facialhair", thumbnail: "/assets/head.jpg" },
      { id: "facialhair6", name: "Goatee", url: "/assets/FacialHair.006.glb", group: "facialhair", thumbnail: "/assets/head.jpg" },
      { id: "facialhair7", name: "Full Beard", url: "/assets/FacialHair.007.glb", group: "facialhair", thumbnail: "/assets/head.jpg" },
    ],
  },

  {
    id: "glasses",
    name: "Óculos",
    position: 8,
    removable: true,
    colorPalette: {
      colors: ["#000000", "#8b4513", "#c0c0c0", "#ffd700", "#ff0000", "#0000ff"],
    },
    cameraPlacement: { position: [0, 0.55, 1.5], target: [0, 0.5, 0] },
    assets: [
      { id: "glasses1", name: "Glasses 1", url: "/assets/Glasses.001.glb", group: "glasses", thumbnail: "/assets/head.jpg" },
      { id: "glasses2", name: "Glasses 2", url: "/assets/Glasses.002.glb", group: "glasses", thumbnail: "/assets/head.jpg" },
      { id: "glasses3", name: "Glasses 3", url: "/assets/Glasses.003.glb", group: "glasses", thumbnail: "/assets/head.jpg" },
      { id: "glasses4", name: "Glasses 4", url: "/assets/Glasses.004.glb", group: "glasses", thumbnail: "/assets/head.jpg" },
    ],
  },

  {
    id: "facemask",
    name: "Máscara",
    position: 9,
    removable: true,
    colorPalette: {
      colors: ["#ffffff", "#000000", "#0000ff", "#ff0000", "#00ff00"],
    },
    cameraPlacement: { position: [0, 0.45, 1.5], target: [0, 0.4, 0] },
    assets: [
      { id: "facemask", name: "Face Mask", url: "/assets/FaceMask.glb", group: "facemask", thumbnail: "/assets/head.jpg" },
    ],
  },

  {
    id: "face",
    name: "Pintura",
    position: 10,
    removable: true,
    colorPalette: {
      colors: ["#ffffff", "#000000", "#ff0000", "#0000ff", "#ffff00"],
    },
    cameraPlacement: { position: [0, 0.5, 1.5], target: [0, 0.45, 0] },
    assets: [
      { id: "face1", name: "Face Paint 1", url: "/assets/Face.001.glb", group: "face", thumbnail: "/assets/head.jpg" },
      { id: "face2", name: "Face Paint 2", url: "/assets/Face.002.glb", group: "face", thumbnail: "/assets/head.jpg" },
      { id: "face3", name: "Face Paint 3", url: "/assets/Face.003.glb", group: "face", thumbnail: "/assets/head.jpg" },
      { id: "face4", name: "Face Paint 4", url: "/assets/Face.004.glb", group: "face", thumbnail: "/assets/head.jpg" },
      { id: "face5", name: "Face Paint 5", url: "/assets/Face.005.glb", group: "face", thumbnail: "/assets/head.jpg" },
      { id: "face6", name: "Face Paint 6", url: "/assets/Face.006.glb", group: "face", thumbnail: "/assets/head.jpg" },
      { id: "face7", name: "Face Paint 7", url: "/assets/Face.007.glb", group: "face", thumbnail: "/assets/head.jpg" },
    ],
  },

  {
    id: "earrings",
    name: "Brincos",
    position: 11,
    removable: true,
    colorPalette: {
      colors: ["#ffd700", "#c0c0c0", "#ff0000", "#0000ff", "#00ff00", "#000000"],
    },
    cameraPlacement: { position: [0, 0.5, 1.8], target: [0, 0.45, 0] },
    assets: [
      { id: "earring1", name: "Earring 1", url: "/assets/Earring.001.glb", group: "earrings", thumbnail: "/assets/head.jpg" },
      { id: "earring2", name: "Earring 2", url: "/assets/Earring.002.glb", group: "earrings", thumbnail: "/assets/head.jpg" },
      { id: "earring3", name: "Earring 3", url: "/assets/Earring.003.glb", group: "earrings", thumbnail: "/assets/head.jpg" },
      { id: "earring4", name: "Earring 4", url: "/assets/Earring.004.glb", group: "earrings", thumbnail: "/assets/head.jpg" },
      { id: "earring5", name: "Earring 5", url: "/assets/Earring.005.glb", group: "earrings", thumbnail: "/assets/head.jpg" },
      { id: "earring6", name: "Earring 6", url: "/assets/Earring.006.glb", group: "earrings", thumbnail: "/assets/head.jpg" },
    ],
  },

  // ==================== ROUPAS (Escolha: Outfit OU Top+Bottom) ====================
  {
    id: "outfit",
    name: "Roupa",
    position: 12,
    removable: true, // Pode remover para usar Top + Bottom separadamente
    colorPalette: {
      colors: ["#ffffff", "#000000", "#ff0000", "#0000ff", "#00ff00", "#ffff00", "#ff00ff", "#8b4513"],
    },
    cameraPlacement: { position: [0, 0.8, 3], target: [0, 0.7, 0] },
    assets: [
      { id: "outfit1", name: "Outfit 1", url: "/assets/Outfit.001.glb", group: "outfit", thumbnail: "/assets/top.jpg" },
      { id: "outfit2", name: "Outfit 2", url: "/assets/Outfit.002.glb", group: "outfit", thumbnail: "/assets/top.jpg" },
      { id: "outfit3", name: "Outfit 3", url: "/assets/Outfit.003.glb", group: "outfit", thumbnail: "/assets/top.jpg" },
      { id: "outfit4", name: "Outfit 4", url: "/assets/Outfit.004.glb", group: "outfit", thumbnail: "/assets/top.jpg" },
      { id: "wawadress", name: "Wawa Dress", url: "/assets/WawaDress.glb", group: "outfit", thumbnail: "/assets/top.jpg" },
    ],
  },

  {
    id: "top",
    name: "Camiseta",
    position: 13,
    removable: false,
    startingAsset: "top1",
    colorPalette: {
      colors: ["#ffffff", "#000000", "#ff0000", "#0000ff", "#00ff00", "#ffff00", "#ff00ff"],
    },
    cameraPlacement: { position: [0, 0.1, 2.5], target: [0, 0, 0] },
    assets: [
      { id: "top1", name: "Top 1", url: "/assets/Top.001.glb", group: "top", thumbnail: "/assets/top.jpg" },
      { id: "top2", name: "Top 2", url: "/assets/Top.002.glb", group: "top", thumbnail: "/assets/top.jpg" },
      { id: "top3", name: "Top 3", url: "/assets/Top.003.glb", group: "top", thumbnail: "/assets/top.jpg" },
    ],
  },

  {
    id: "bottom",
    name: "Calça",
    position: 14,
    removable: false,
    startingAsset: "bottom1",
    colorPalette: {
      colors: ["#000000", "#0000ff", "#8b4513", "#696969", "#ffffff", "#ff0000"],
    },
    cameraPlacement: { position: [0, 0.6, 2.5], target: [0, 0.5, 0] },
    assets: [
      { id: "bottom1", name: "Bottom 1", url: "/assets/Bottom.001.glb", group: "bottom", thumbnail: "/assets/bottom.jpg" },
      { id: "bottom2", name: "Bottom 2", url: "/assets/Bottom.002.glb", group: "bottom", thumbnail: "/assets/bottom.jpg" },
      { id: "bottom3", name: "Bottom 3", url: "/assets/Bottom.003.glb", group: "bottom", thumbnail: "/assets/bottom.jpg" },
    ],
  },

  // ==================== SAPATOS (Obrigatório) ====================
  {
    id: "shoes",
    name: "Sapatos",
    position: 15,
    removable: false,
    startingAsset: "shoes1",
    colorPalette: {
      colors: ["#000000", "#ffffff", "#8b4513", "#ff0000", "#0000ff", "#00ff00"],
    },
    cameraPlacement: { position: [0, -0.8, 2.5], target: [0, -1, 0] },
    assets: [
      { id: "shoes1", name: "Shoes 1", url: "/assets/Shoes.001.glb", group: "shoes", thumbnail: "/assets/shoes.jpg" },
      { id: "shoes2", name: "Shoes 2", url: "/assets/Shoes.002.glb", group: "shoes", thumbnail: "/assets/shoes.jpg" },
      { id: "shoes3", name: "Shoes 3", url: "/assets/Shoes.003.glb", group: "shoes", thumbnail: "/assets/shoes.jpg" },
    ],
  },
];
