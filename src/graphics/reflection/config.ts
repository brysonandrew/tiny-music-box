
import fragment from "graphics/reflection/fragment.glsl";

export const REFLECTION_GL_INSTANCE_CONFIG: TGlInstanceConfig = {
  name: "reflection",
  fragment,
  uniforms: TIME_RESOLUTION_UNIFORMS,
};
