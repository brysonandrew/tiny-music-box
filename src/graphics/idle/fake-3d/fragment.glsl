precision mediump float;

uniform vec4 uResolution;
uniform vec2 uMouse;
uniform vec2 uThreshold;
uniform float uPixelRatio;
uniform sampler2D uImage0;
uniform sampler2D uImage1;

vec2 mirrored(vec2 v) {
  vec2 m = mod(v, 2.);
  return mix(m, 2.0 - m, step(1.0, m));
}

void main() {
  vec2 uv = uPixelRatio * gl_FragCoord.xy / uResolution.xy;
  vec2 vUv = (uv - vec2(0.5)) * uResolution.zw + vec2(0.5);
  vUv.y = 1. - vUv.y;
  vec4 tex1 = texture2D(uImage1, mirrored(vUv));
  vec2 fake3d = vec2(vUv.x + (tex1.r - 0.5) * uMouse.x / uThreshold.x, vUv.y + (tex1.r - 0.5) * uMouse.y / uThreshold.y);
  gl_FragColor = texture2D(uImage0, mirrored(fake3d));
}