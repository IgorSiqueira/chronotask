import { NodeIO } from "@gltf-transform/core";
import { dedup, draco, prune, quantize } from "@gltf-transform/functions";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { GLTFExporter } from "three-stdlib";
import { useCharacterStore } from "../../stores/characterStore";
import { Asset } from "./Asset";

export const Avatar = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/models/Armature.glb");
  const { animations } = useGLTF("/models/Poses.glb");
  const customization = useCharacterStore((state) => state.customization);
  const { actions } = useAnimations(animations, group);
  const setDownload = useCharacterStore((state) => state.setDownload);

  const pose = useCharacterStore((state) => state.pose);

  // Check if required nodes exist
  if (!nodes || !nodes.mixamorigHips) {
    console.error("Avatar nodes not found:", nodes);
    return null;
  }

  useEffect(() => {
    function download() {
      const exporter = new GLTFExporter();
      exporter.parse(
        group.current,
        async function (result) {
          const io = new NodeIO();

          // Read.
          const document = await io.readBinary(new Uint8Array(result));
          await document.transform(
            prune(),
            dedup(),
            draco(),
            quantize()
          );

          // Write.
          const glb = await io.writeBinary(document);

          save(
            new Blob([glb], { type: "application/octet-stream" }),
            `avatar_${+new Date()}.glb`
          );
        },
        function (error) {
          console.error(error);
        },
        { binary: true }
      );
    }

    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link);

    function save(blob, filename) {
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
    setDownload(download);
  }, [setDownload]);

  useEffect(() => {
    actions[pose]?.fadeIn(0.2).play();
    return () => actions[pose]?.fadeOut(0.2).stop();
  }, [actions, pose]);

  const skeleton = nodes.Plane?.skeleton || nodes[Object.keys(nodes)[0]]?.skeleton;

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />

          {/* Render base meshes from the armature if they exist */}
          {nodes.Plane && skeleton && (
            <skinnedMesh
              geometry={nodes.Plane.geometry}
              material={nodes.Plane.material}
              skeleton={skeleton}
              castShadow
              receiveShadow
            />
          )}

          {/* Render customization assets */}
          {skeleton && Object.keys(customization).map(
            (key) =>
              customization[key]?.asset?.url && (
                <Suspense key={customization[key].asset.id}>
                  <Asset
                    categoryName={key}
                    url={customization[key].asset.url}
                    skeleton={skeleton}
                  />
                </Suspense>
              )
          )}
        </group>
      </group>
    </group>
  );
};
