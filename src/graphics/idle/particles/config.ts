
import type { TUniforms, TGlInstanceConfig } from "../../../utils/shaders/set-up/gl-instance";
import { uTime, uResolution } from "../../../utils/shaders/set-up/uniforms";
import fragment from "./fragment.glsl";

export const uniforms: TUniforms = {
  ...uTime(),
  ...uResolution(),
};

export const STARS_GL_INSTANCE_CONFIG: TGlInstanceConfig = { name: "stars", fragment, uniforms };
