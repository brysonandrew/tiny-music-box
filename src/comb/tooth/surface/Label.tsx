import type { FC } from "react";
import { motion } from "framer-motion-3d";
import { Text } from "@react-three/drei";
import { HEIGHT } from "../init/size";
import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";
import {
  resolveColor,
  resolveTapColor,
} from "./config";

export const Label: FC = () => {
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

  const textY = HEIGHT * 0.55;

  return (
    <motion.mesh
      position={[0, textY, 0]}
    >
      <Text
        characters="0123456789"
        fontSize={0.12}
        lineHeight={1}
        letterSpacing={0}
        font="fonts/gabriele/gabriele-bad.ttf"
      >
        <motion.meshPhongMaterial
          attach="material"
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
        {midi}
      </Text>
    </motion.mesh>
  );
};
