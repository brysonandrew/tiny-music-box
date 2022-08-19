import type { TGlInstanceConfig } from "../../utils/shaders/set-up/gl-instance";
import { TIME_RESOLUTION_UNIFORMS } from "../../utils/shaders/set-up/uniforms";
import fragment from "./fragment.glsl";

export const FIRE_GL_INSTANCE_CONFIG: TGlInstanceConfig = {
  name: "fire",
  fragment,
  uniforms: TIME_RESOLUTION_UNIFORMS,
};
