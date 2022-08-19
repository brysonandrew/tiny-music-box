precision mediump float;

uniform float uTime;
uniform vec2 uResolution;

    //////////////////////////////////////
    //  DELTA POETRY//
    //////////////////////////////////////

    //Delta = Change

    //Thanks to iq for the raymarching inspiration
    //Thanks to Connor Bell for the AA technique

    //////////////////////////////////////
    //VARIABLES//
    //////////////////////////////////////

    #define AA 2

    #define MAX_MARCH 12.
    #define MAX_MARCH_REFLECT 5.

    #define REFLECT_POWER 1.5
    #define NUM_REFLECTIONS 2

    //////////////////////////////////////
    //CODE//
    //////////////////////////////////////

float sdTriPrism(vec3 p, vec2 h) {
  vec3 q = abs(p);
  return max(q.z - h.y, max(q.x * 0.866025 + p.y * 0.5, -p.y) - h.x * 0.5);
}

float opSmoothSubtraction(float d1, float d2, float k) {
  float h = clamp(0.5 - 0.5 * (d2 + d1) / k, 0.0, 1.0);
  return mix(d2, -d1, h) + k * h * (1.0 - h);
}

vec2 delta(vec3 p) {   
        //float sphere = length(p) - .5;
  float tri = sdTriPrism(p, vec2(1., .1));
  float stri = sdTriPrism(p, vec2(.4, .1));
  tri = opSmoothSubtraction(stri, tri, .5);

  return vec2(tri, 1.);
}

vec2 plane(vec3 p) {
  return vec2(abs(p.y), 2.);
}

vec2 model(vec3 p) {
  vec2 sp = delta(p + vec3(0., -.2 + sin(uTime * 3.) * .1, 0.));
  vec2 pl = plane(p + vec3(0, .5, 0.));

  vec2 mod = vec2(0.);
  if(sp.x < pl.x)
    mod = sp;
  else
    mod = pl;

  return mod;
        //return sp;
}

float raymarch(in vec3 ro, in vec3 rd, float maxdist, float modifier) {
  float dist = 0.;
  for(int i = 0; i < 90; i++) {
    float m = model(ro + rd * dist).x * modifier;
    dist += m;

    if(m < .01)
      return dist;
    else if(dist > maxdist)
      break;
  }
  return -1.;
}

vec3 normal(vec3 pos) {
  vec3 eps = vec3(.01, -.01, 0.);

  return normalize(vec3(model(pos + eps.xzz).x - model(pos + eps.yzz).x, model(pos + eps.zxz).x - model(pos + eps.zyz).x, model(pos + eps.zzx).x - model(pos + eps.zzy).x));
}

vec3 background() {
  return vec3(0.);
}

vec3 getColor(vec3 pos) {
  float m = model(pos).y;
  vec3 color = vec3(0.);

  if(m == 1.) // delta
    return vec3(1., .65, 0.2);
  if(m == 2.)
    return vec3(1., 1., 1.);

  return background();
}

vec3 shade(vec3 pos, vec3 nor, vec3 rd, float dist) {
  if(dist < 0.)
    return background();

  vec3 lp = vec3(2., 2., 2.);
  vec3 ld = normalize((lp - pos) * rd);

  float dif = max(dot(nor, ld), .45);
  vec3 lin = vec3(dif);

  vec3 col = lin;
  col *= exp(-.01 * dist * dist);

  col = pow(col, vec3(1.8));

  col *= getColor(pos);

  return col;
}

vec3 reflection(vec3 pos, vec3 rd, vec3 nor, float dist) {
  if(dist < -.1)
    return background();

  vec3 rrd = reflect(rd, nor);
  vec3 rro = pos + rrd * .02;

  vec3 col = vec3(0.);
  vec3 fade = vec3(1.);

  for(int i = 0; i < NUM_REFLECTIONS; i++) {
    float rdist = raymarch(rro, rrd, MAX_MARCH_REFLECT, 1.);

    vec3 rpos = rro + rrd * rdist;
    vec3 rnor = normal(rpos);

    fade -= pow(1. - rdist / MAX_MARCH_REFLECT, .5) * .4; //* vec3(.5, .9, .1);

    rrd = reflect(rrd, rnor);
    rro = rpos + rrd * .02;

    col += shade(rpos, rnor, rrd, rdist) * fade;
  }

  return col;
}

vec3 render(vec2 p) {
  vec3 ro = vec3(4. * cos(uTime * .5), 1., 4. * sin(uTime * .5));
  vec3 ta = vec3(0.0, .25, 0.0);

  vec3 w = normalize(ta - ro);
  vec3 u = normalize(cross(w, vec3(0., 1., 0.)));
  vec3 v = normalize(cross(u, w));
  mat3 mat = mat3(u, v, w);
  vec3 rd = normalize(mat * vec3(p.xy, 1.5));

  float dist = raymarch(ro, rd, MAX_MARCH, 1.);
  vec3 pos = ro + rd * dist;
  vec3 nor = normal(pos);

  vec3 col = shade(pos, nor, rd, dist);
  vec3 ref = reflection(pos, rd, nor, dist);

  col += ref * REFLECT_POWER;

  return col;
}

void main(void) {
  vec2 p = (gl_FragCoord.xy - .5 * uResolution.xy) / uResolution.y;

  vec3 color = vec3(0.);
  for(int j = 0; j < AA; j++) {
    for(int k = 0; k < AA; k++) {
      vec2 o = vec2(float(j), float(k)) / float(AA);
      vec2 uv = (p + o / uResolution.xy);
      color += render(uv);
    }
  }

  color /= float(AA * AA);

  gl_FragColor = vec4(color, 1.0);
}