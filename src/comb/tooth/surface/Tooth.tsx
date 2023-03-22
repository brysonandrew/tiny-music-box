import type { FC } from "react";
import { motion } from "framer-motion-3d";
import {
  WIDTH,
  HEIGHT,
  DEPTH,
} from "../init/size";
import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";
import {
  resolveColor,
  resolveTapColor,
} from "./config";

export const Tooth: FC = () => {
  const { midis } = useContext();
  const { midi } = useToothContext();
  const isActive = midis[midi];
  const color = resolveColor(
    isActive,
    midi
  );

  const active = {
    color: resolveTapColor(midi),
  };

  return (
    <motion.mesh>
      <motion.boxGeometry
        variants={{
          animate: { x: midi * 1 },
          tap: { x: midi * 1 },
        }}
        args={[WIDTH, HEIGHT, DEPTH]}
      />
      <motion.meshPhongMaterial
        color={color}
        variants={{
          animate: {
            color,
          },
          active,
          tap: active,
        }}
        specular="#757575"
        shininess={1}
      />
    </motion.mesh>
  );
};
