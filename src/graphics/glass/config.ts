import type { TGlInstanceConfig } from "../../utils/shaders/set-up/gl-instance";
import { TIME_RESOLUTION_UNIFORMS } from "../../utils/shaders/set-up/uniforms";
import fragment from "./fragment.glsl";

export const GLASS_GL_INSTANCE_CONFIG: TGlInstanceConfig = {
  name: "GLASS",
  fragment,
  uniforms: TIME_RESOLUTION_UNIFORMS,
};
