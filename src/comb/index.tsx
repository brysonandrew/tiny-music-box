import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Tooth } from "./tooth";
import { Lights } from "./Lights";
import { MIDI_KEYS } from "../config";
import { Provider } from "../state/Provider";

export const Comb = () => (
  <Canvas>
    <Provider>
      <>
        <OrbitControls />
        <Lights />
        {MIDI_KEYS.map(
          (midi: number) => (
            <Tooth
              key={`Tooth-${midi}`}
              midi={midi}
            />
          )
        )}
      </>
    </Provider>
  </Canvas>
);
