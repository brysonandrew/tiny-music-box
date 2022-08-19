precision lowp float;

uniform float uTime;
uniform vec2 uResolution;

float circle(vec2 uv, vec2 p, float r, float blur, float intens) {
  float d = length(uv - p);
  float c = smoothstep(r, r - blur, d);
  return c * intens;
}

float rand(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float line(vec2 uv, vec2 p1, vec2 p2, float r, float blur, float intens) {
  vec2 g = p2 - p1;
  vec2 h = uv - p1;
  float d = length(h - g * clamp(dot(g, h) / dot(g, g), 0.0, 1.0));
  return smoothstep(r, r - blur, d) * intens;
}

void main(void) {
  const float numStars = 1000.0;
  float sig = 1.0; //reverse
  float sig2 = 1.0; //reverse
  float t_max = 1.5;
  sig = sign(sin(2.0 * 3.14159265 * uTime / (2.0 * t_max)));
  sig2 = sign(sin(2.0 * 3.14159265 * uTime / (4.0 * t_max)));

  float time = mod(uTime * sig, t_max);
  time = time / t_max;

  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  uv -= 0.5;
  uv.x *= uResolution.x / uResolution.y;

  float tz = mod(uTime, 2.0 * t_max * sig2) / (4.0 * t_max);

  uv *= (1.0 - 0.08 * smoothstep(0.0, 0.2, tz * tz)); //zoom in

  float c = 0.0; // defines image
  float s = 10.0; // scale value

  float dotSize = 0.002525;
  float blurPart = 0.8;
  float blurSize = dotSize * blurPart; //0.002
  float starIntens = 0.5;

  float gloSize = 50.0 * dotSize;
  float gloBlurSize = 0.99 * gloSize;

  vec2 co = vec2(0.0, 0.0);
  vec2 co1 = vec2(0.0, 0.0);
  vec2 coo = vec2(0.0, 0.0);

  float l;
  float rcx;
  float rcy;

  float starsize;

  for(float k = 0.0; k < numStars; k++) {
    rcx = 2.0 * (1.77 * rand(vec2(0.0, 10.0 + k * 10.0)) - 0.88);
    rcy = 2.0 * (rand(vec2(1.0, 1.0 + k * 10.0)) - 0.5);

    starIntens = 0.7 * rand(vec2(2.0, 1.0 + k * 10.0));
    starsize = dotSize * (1.0 - 0.5 * rand(vec2(3.0, 1.0 + k * 10.0)));

    coo = vec2(rcx, rcy);

    float m = sig2 * s * mix(pow(0.6 * time, 5.0), pow(1.08 * time, 25.0), pow(time, 1.0));
    co1 = coo * (1.0 + max(m, -0.5));

    l = line(uv, coo, co1, starsize, blurSize, starIntens);

    c = max(c, l);
  }

  gl_FragColor = 1.5 * vec4(1.1 * c, 1.1 * c, 1.5 * c, 1.0);
}
