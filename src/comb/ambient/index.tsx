import { OrbitControls } from "@react-three/drei";
import { Lights } from "./Lights";

export const Ambient = () => (
  <>
    <OrbitControls />
    <Lights />
  </>
);
