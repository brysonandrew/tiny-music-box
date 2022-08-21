import type { FC } from "react";
import { motion } from "framer-motion-3d";
import {
  STAGGER,
  WIDTH,
  HEIGHT,
  DEPTH,
} from "../init/size";
import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";
import {
  FROM_KEY,
  TOTAL_KEYS,
} from "../../../config";
import { Text } from "@react-three/drei";
import { resolveColor, resolveX } from "./config";

export const Tooth: FC = () => {
  const { midis } = useContext();
  const { midi } = useToothContext();
  const isActive = midis[midi];

  const handleTap = () => {
    console.log("play");
  };

  const x = resolveX(midi);

  const positionKey: [
    x: number,
    y: number,
    z: number
  ] = [x, 0, 0];

  return (
    <motion.mesh
      position={positionKey}
      onTap={handleTap}
    >
      <motion.boxGeometry
        initial={{ x: 0 }}
        animate={{ x: midi * 1 }}
        args={[WIDTH, HEIGHT, DEPTH]}
      />
      <motion.meshPhongMaterial
        color={resolveColor(
          isActive,
          midi
        )}
        specular="#757575"
        shininess={1}
      />
    </motion.mesh>
  );
};
