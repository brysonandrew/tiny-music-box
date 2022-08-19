import type {
  TUniforms,
  TGlInstanceConfig,
} from "../../../utils/shaders/set-up/gl-instance";
import { uTime, uResolution, uMouse } from "../../../utils/shaders/set-up/uniforms";
import fragment from "./fragment.glsl";

export type TUniformsConfigInput = {
  mouse?: {
    y: number;
    x: number;
    w: number;
    z: number;
  };
} | null;
export const uniformsConfig = (
  config: TUniformsConfigInput
): { uniforms: TUniforms } => ({
  uniforms: {
    ...uTime(),
    ...uResolution(),
    ...(config?.mouse ? uMouse(config.mouse) : {}),
  },
});

export type TInstanceConfigInput = {
  uniforms?: TUniformsConfigInput;
};
export const instanceConfig = ({
  uniforms,
}: TInstanceConfigInput): TGlInstanceConfig => ({
  name: "fake-3d",
  fragment,
  ...uniformsConfig(uniforms || null),
});
