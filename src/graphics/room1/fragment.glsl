precision mediump float;
uniform vec2 uResolution;

float plnIntersect(in vec3 ro, in vec3 rd, vec4 pln) {
    return (pln.w - dot(ro, pln.xyz)) / dot(rd, pln.xyz);
}

void main(void) {
    vec2 p = (2.0 * gl_FragCoord.xy - uResolution.xy) / uResolution.y;

    vec3 ro = vec3(0.0, 0.2, 3.0);
    vec3 rd = normalize(vec3(p, -3.0));

    vec4 pl1 = vec4(0.0, 1.0, 0.0, 0.0); //floor
    vec4 pl2 = vec4(1.0, 0.0, 0.0, 1.0); //right wall
    vec4 pl3 = vec4(-1.0, 0.0, 0.0, 1.0);
    vec4 pl4 = vec4(0.0, 0.0, -1.0, 1.0);

    vec3 lig = normalize(vec3(0.6, 0.3, 0.4));

    float t2 = plnIntersect(ro, rd, pl1);
    float t3 = plnIntersect(ro, rd, pl2);
    float t4 = plnIntersect(ro, rd, pl3);
    float t5 = plnIntersect(ro, rd, pl4);

    float tmin = 1000.0;
    vec4 omin = vec4(0.0);
    if(t2 > 0.0 && t2 < tmin) {
        tmin = t2;
        omin = pl1;
    }
    if(t3 > 0.0 && t3 < tmin) {
        tmin = t3;
        omin = pl2;
    }
    if(t4 > 0.0 && t4 < tmin) {
        tmin = t4;
        omin = pl3;
    }
    if(t5 > 0.0 && t5 < tmin) {
        tmin = t5;
        omin = pl4;
    }

    vec3 col = vec3(0.0);

    vec3 pos = ro + tmin * rd;

    col = vec3(0.1, 0.15, 0.2);
    col *= 0.8 + 0.4 * dot(omin.xyz, lig);

    col *= 0.3;
    float occ = 1.0;
    occ *= smoothstep(0.0, 0.5, length(pos.xy - vec2(1.0, 0.0)));
    occ *= smoothstep(0.0, 0.5, length(pos.xy - vec2(-1.0, 0.0)));
    occ *= smoothstep(0.0, 0.5, length(pos.yz - vec2(0.0, -1.0)));
    occ *= smoothstep(0.0, 0.5, length(pos.xz - vec2(1.0, -1.0)));
    occ *= smoothstep(0.0, 0.5, length(pos.xz - vec2(-1.0, -1.0)));
    col *= 
    vec3(0.4, 0.3, 0.2)
    + vec3(0.6, 0.7, 0.8)
    * occ; // wall color
    col = sqrt(col);

    gl_FragColor = vec4(col, 1.0);
}