import type { FC } from "react";
import { motion } from "framer-motion-3d";
import { TOTAL_KEYS } from "..";
import {
  STAGGER,
  WIDTH,
  HEIGHT,
  DEPTH,
} from "./config/size";
import { useConfig } from "./config/useConfig";
import { usePlay } from "./config/usePlay";

type TProps = { index: number };
export const Tooth: FC<TProps> = ({
  index,
}) => {
  const ref = useConfig();
  const handleTap = usePlay({
    index,
    ref,
  });

  return (
    <motion.mesh
      position={[
        STAGGER * index -
          TOTAL_KEYS * 0.5 * STAGGER,
        0,
        0,
      ]}
      onTap={handleTap}
      rotation-z={0}
    >
      <motion.boxGeometry
        initial={{ x: 0 }}
        animate={{ x: index * 1 }}
        args={[WIDTH, HEIGHT, DEPTH]}
      />
      <motion.meshPhongMaterial
        color={`hsl(0,80%,80%)`}
        specular="#61dafb"
        shininess={2}
      />
    </motion.mesh>
  );
};
