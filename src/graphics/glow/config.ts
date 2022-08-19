import { TIME_RESOLUTION_UNIFORMS } from "../../utils/shaders/set-up/uniforms";
import fragment from "./fragment.glsl";

export const GLOW_GL_INSTANCE_CONFIG = {
  name: "glow",
  fragment,
  uniforms: TIME_RESOLUTION_UNIFORMS,
};
