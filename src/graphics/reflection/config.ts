import type { TGlInstanceConfig } from "../../utils/shaders/set-up/gl-instance";
import { TIME_RESOLUTION_UNIFORMS } from "../../utils/shaders/set-up/uniforms";
import fragment from "graphics/reflection/fragment.glsl";

export const REFLECTION_GL_INSTANCE_CONFIG: TGlInstanceConfig = {
  name: "reflection",
  fragment,
  uniforms: TIME_RESOLUTION_UNIFORMS,
};
