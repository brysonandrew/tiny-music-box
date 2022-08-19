import { TIME_RESOLUTION_UNIFORMS } from "../../utils/shaders/set-up/uniforms";
import fragment from "./fragment.glsl";

export const NEUMORPHIC_BUTTON_GL_INSTANCE_CONFIG = {
  name: "neumorphic-button",
  fragment,
  uniforms: TIME_RESOLUTION_UNIFORMS,
};
