import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { useCharacterStore } from "../../stores/characterStore";

export const Asset = ({ url, categoryName, skeleton }) => {
  const { scene } = useGLTF(url);

  const customization = useCharacterStore((state) => state.customization);
  const lockedGroups = useCharacterStore((state) => state.lockedGroups);

  const assetColor = customization[categoryName].color;

  const skin = useCharacterStore((state) => state.skin);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.material?.name.includes("Color_")) {
          child.material.color.set(assetColor);
        }
      }
    });
  }, [assetColor, scene]);

  const attachedItems = useMemo(() => {
    const items = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        items.push({
          geometry: child.geometry,
          material: child.material.name.includes("Skin_")
            ? skin
            : child.material,
          morphTargetDictionary: child.morphTargetDictionary,
          morphTargetInfluences: child.morphTargetInfluences,
        });
      }
    });
    return items;
  }, [scene, skin]);

  if (lockedGroups[categoryName]) {
    return null;
  }

  return attachedItems.map((item, index) => (
    <skinnedMesh
      key={index}
      geometry={item.geometry}
      material={item.material}
      skeleton={skeleton}
      morphTargetDictionary={item.morphTargetDictionary}
      morphTargetInfluences={item.morphTargetInfluences}
      castShadow
      receiveShadow
    />
  ));
};
