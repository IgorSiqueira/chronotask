import { create } from "zustand";
import { MeshStandardMaterial } from "three";
import { randInt } from "three/src/math/MathUtils.js";
import { mockCategories } from "./mockAssets";

export const PHOTO_POSES = {
  Idle: "Idle",
  Chill: "Chill",
  Cool: "Cool",
  Punch: "Punch",
  Ninja: "Ninja",
  King: "King",
  Busy: "Busy",
};

export const PHOTO_POSES_PT = {
  Idle: "Parado",
  Chill: "Relaxado",
  Cool: "Legal",
  Punch: "Soco",
  Ninja: "Ninja",
  King: "Rei",
  Busy: "Ocupado",
};

export const UI_MODES = {
  PHOTO: "photo",
  CUSTOMIZE: "customize",
};

export const useCharacterStore = create((set, get) => ({
  loading: true,
  mode: UI_MODES.CUSTOMIZE,
  setMode: (mode) => {
    set({ mode });
    if (mode === UI_MODES.CUSTOMIZE) {
      set({ pose: PHOTO_POSES.Idle });
    }
  },
  pose: PHOTO_POSES.Idle,
  setPose: (pose) => set({ pose }),
  categories: [],
  currentCategory: null,
  assets: [],
  lockedGroups: {},
  skin: new MeshStandardMaterial({ color: 0xf5c6a5, roughness: 1 }),
  customization: {},
  download: () => {},
  setDownload: (download) => set({ download }),
  screenshot: () => {},
  setScreenshot: (screenshot) => set({ screenshot }),
  updateColor: (color) => {
    set((state) => ({
      customization: {
        ...state.customization,
        [state.currentCategory.name]: {
          ...state.customization[state.currentCategory.name],
          color,
        },
      },
    }));
    if (get().currentCategory.name === "Cabeça") {
      get().updateSkin(color);
    }
  },
  updateSkin: (color) => {
    get().skin.color.set(color);
  },
  fetchCategories: async () => {
    try {
      // Use imported mock data with all assets
      const categories = mockCategories;

      const customization = {};
      categories.forEach((category) => {
        customization[category.name] = {
          color: category.colorPalette?.colors?.[0] || "#ffffff",
        };
        if (category.startingAsset) {
          customization[category.name].asset = category.assets.find(
            (asset) => asset.id === category.startingAsset
          );
        }
      });

      set({
        categories,
        currentCategory: categories[0],
        assets: categories.flatMap(cat => cat.assets),
        customization,
        loading: false,
      });
      get().applyLockedAssets();
    } catch (error) {
      console.error("Error fetching categories:", error);
      set({ loading: false });
    }
  },
  setCurrentCategory: (category) => set({ currentCategory: category }),
  changeAsset: (category, asset) => {
    set((state) => ({
      customization: {
        ...state.customization,
        [category]: {
          ...state.customization[category],
          asset,
        },
      },
    }));
    get().applyLockedAssets();
  },
  randomize: () => {
    const customization = {};
    get().categories.forEach((category) => {
      let randomAsset = category.assets[randInt(0, category.assets.length - 1)];
      if (category.removable) {
        if (randInt(0, category.assets.length - 1) === 0) {
          randomAsset = null;
        }
      }
      const randomColor =
        category.colorPalette?.colors?.[
          randInt(0, category.colorPalette.colors.length - 1)
        ];
      customization[category.name] = {
        asset: randomAsset,
        color: randomColor,
      };
      if (category.name === "Cabeça") {
        get().updateSkin(randomColor);
      }
    });
    set({ customization });
    get().applyLockedAssets();
  },

  applyLockedAssets: () => {
    const customization = get().customization;
    const categories = get().categories;
    const lockedGroups = {};

    Object.values(customization).forEach((category) => {
      if (category.asset?.lockedGroups) {
        category.asset.lockedGroups.forEach((group) => {
          const categoryName = categories.find(
            (category) => category.id === group
          )?.name;
          if (categoryName) {
            if (!lockedGroups[categoryName]) {
              lockedGroups[categoryName] = [];
            }
            const lockingAssetCategoryName = categories.find(
              (cat) => cat.id === category.asset.group
            )?.name;
            lockedGroups[categoryName].push({
              name: category.asset.name,
              categoryName: lockingAssetCategoryName,
            });
          }
        });
      }
    });

    set({ lockedGroups });
  },
}));

// Initialize categories on store creation
useCharacterStore.getState().fetchCategories();
