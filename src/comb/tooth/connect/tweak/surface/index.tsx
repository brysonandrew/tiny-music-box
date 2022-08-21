import type { FC } from "react";
import { motion } from "framer-motion-3d";
import {
  STAGGER,
  WIDTH,
  HEIGHT,
  DEPTH,
} from "../../../init/size";
import { useContext } from "../../../../../state/tooth/Context";
import { TOTAL_KEYS } from "../../../../../config";

export const Surface: FC = () => {
  const { midi } = useContext();

  const handleTap = () => {
    console.log("play");
  };

  return (
    <motion.mesh
      position={[
        STAGGER * midi -
          TOTAL_KEYS * 0.5 * STAGGER,
        0,
        0,
      ]}
      onTap={handleTap}
      rotation-z={0}
    >
      <motion.boxGeometry
        initial={{ x: 0 }}
        animate={{ x: midi * 1 }}
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
