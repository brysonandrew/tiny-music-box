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
import { resolveX } from "./config";

export const Label: FC = () => {
  const { midis } = useContext();
  const { midi } = useToothContext();
  const isActive = midis[midi];

  const handleTap = () => {
    console.log("play");
  };

  const x = resolveX(midi);

  const textY = HEIGHT * 0.55;

  const position: [
    x: number,
    y: number,
    z: number
  ] = [x, textY, 0];

  return (
    <motion.mesh position={position}>
      <Text
        color={
          isActive ? 0x9966ff : 0xffffff
        }
        characters="0123456789"
        fontSize={0.12}
        lineHeight={1}
        letterSpacing={0}
        font="fonts/gabriele/gabriele-bad.ttf"
      >
        {midi}
      </Text>
    </motion.mesh>
  );
};
