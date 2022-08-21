import type { FC } from "react";
import { motion } from "framer-motion-3d";
import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";
import { Tooth } from "./Tooth";
import { Label } from "./Label";
import { resolveX } from "./config";

export const Surface: FC = () => {
  const handleTap = () => {
    console.log("play");
  };
  const { midis } = useContext();
  const { midi } = useToothContext();
  const isActive = midis[midi];

  const x = resolveX(midi);

  const positionKey: [
    x: number,
    y: number,
    z: number
  ] = [x, 0, 0];

  return (
    <motion.mesh
      position={positionKey}
      initial={false}
      animate={
        isActive ? "active" : "animate"
      }
      whileTap="tap"
      onTap={handleTap}
      variants={{
        animate: { y: 0 },
        active: { y: 0.05 },
        tap: { y: 0.1 },
      }}
    >
      <Label />
      <Tooth />
    </motion.mesh>
  );
};
