import { useState } from "react";
import type { FC, PointerEventHandler } from "react";
import { GlslCanvas } from ".";
import type { TGlInstanceConfig } from "../../utils/shaders/set-up/gl-instance";
import { uResolution } from "../../utils/shaders/set-up/uniforms";

type TProps = { config: TGlInstanceConfig };
const GlslCanvasWithMouse: FC<TProps> = ({ config }) => {
  const [isPressed, setPressed] = useState(false);
  const [prevM, setPrevM] = useState({ x: 0, y: 0 });

  const [{ x, y }, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const negativePrevM = { w: -x, z: -y };

  const m = {
    ...(isPressed ? prevM : { x, y }),
    ...negativePrevM,
  };
  const hr = new Date().getHours();
  return (
    <GlslCanvas
      pointerHandlers={{
        onPointerDown: () => {
          setPrevM({ x, y });
          setPressed(true);
        },
        onPointerUp: () => {
          setPressed(false);
        },
        onPointerMove: ((event) => {
          setMousePosition({ x: event.clientX, y: event.clientY });
        }) as PointerEventHandler<HTMLCanvasElement>,
      }}
      config={{
        ...config,
        uniforms: {
          ...uResolution(),
          uMouse: {
            type: "vec4",
            value: Object.values(m),
          },
          uHour: {
            type: "float",
            value: hr,
          },
        },
      }}
    />
  );
};

export { GlslCanvasWithMouse };
