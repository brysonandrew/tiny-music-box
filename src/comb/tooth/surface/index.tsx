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
  const { midis, fromKey } =
    useContext();
  const { midi } = useToothContext();
  const isPlaying = midis[midi];

  const x = resolveX(midi, fromKey);

  const positionKey: [
    x: number,
    y: number,
    z: number
  ] = [x, 0, 0];

  const isInRange =
    midi >= fromKey &&
    midi <= fromKey + 12;

  return (
    <motion.mesh
      position={positionKey}
      initial={false}
      animate={
        isPlaying
          ? "playing"
          : isInRange
          ? "active"
          : "animate"
      }
      // whileTap="tap"
      // onTap={handleTap}
      variants={{
        animate: { y: 0, opacity: 0.5 },
        playing: {
          y: 0.15,
          opacity: 1,
        },
        active: { y: 0.05, opacity: 1 },
        // tap: { y: 0.1, opacity: 1 },
      }}
    >
      <Label />
      <Tooth />
    </motion.mesh>
  );
};
