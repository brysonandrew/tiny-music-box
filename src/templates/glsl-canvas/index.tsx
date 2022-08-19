import type { DOMAttributes, FC } from "react";
import styled from "@emotion/styled";
import type { TGlInstanceConfig } from "../../utils/shaders/set-up/gl-instance";
import { useGlInstance } from "../../utils/shaders/set-up/gl-instance";
import { TIME_RESOLUTION_UNIFORMS } from "../../utils/shaders/set-up/uniforms";

const Canvas = styled.canvas`
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100vh;
`;

type TPointerHandlers = Pick<
  DOMAttributes<HTMLCanvasElement>,
  "onPointerDown" | "onPointerUp" | "onPointerMove"
>;

type TProps = { config: TGlInstanceConfig; pointerHandlers?: TPointerHandlers };
const GlslCanvas: FC<TProps> = ({ config, pointerHandlers }) => {
  const canvasRef = useGlInstance({...config, uniforms: TIME_RESOLUTION_UNIFORMS});
  return <Canvas ref={canvasRef} {...(pointerHandlers || {})} />;
};

export { GlslCanvas };
