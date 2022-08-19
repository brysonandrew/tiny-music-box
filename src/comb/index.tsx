import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Tooth } from "./tooth";
import { Lights } from "./Lights";
import { resolveMidis } from "./config";

export const TOTAL_KEYS = 80;

export const Comb = () => (
  <Canvas>
    <OrbitControls />
    <Lights />
    {resolveMidis({
      from: 20,
      total: TOTAL_KEYS + 20,
    }).map((_, index: number) => (
      <Tooth
        key={`Tooth-${index}`}
        index={index}
      />
    ))}
  </Canvas>
);
