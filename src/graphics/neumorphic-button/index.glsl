precision mediump float;

uniform float uTime;
uniform vec2 uResolution;

const float pi = 3.141592653589793;

float dotp(vec2 vector) {
    return dot(vector, vector);
}
float dotp(vec3 vector) {
    return dot(vector, vector);
}
float dotp(vec4 vector) {
    return dot(vector, vector);
}

void main() {
    vec2 uv = 2.0 * (gl_FragCoord.xy - 0.5 * uResolution.xy) / max(uResolution.x, uResolution.y);

    gl_FragColor = vec4(0.2, 0.2, 0.2, 1.0);

    // Radius ^ 2 (sqrt() skip)
    float r2 = dotp(uv);

    float theta0 = 0.5 + (atan(uv.x, uv.y) / (2.0 * pi));
    float theta1 = 0.5 + (atan(-uv.x, -uv.y) / (2.0 * pi));

    if(r2 < 0.5 * 0.5) {
        gl_FragColor.rgb = (0.2 * vec3(0.5 * (sin(2.0 * pi * theta1) + 1.0))) + 0.1;

        if(r2 < 0.45 * 0.45) {
            gl_FragColor.rgb = (0.05 * vec3(0.5 * (sin(2.0 * pi * theta0) + 1.0))) + 0.225;

            if(r2 < 0.4 * 0.4) {
                float theta = 0.5 + (atan(-uv.x, -uv.y) / (2.0 * pi));

                gl_FragColor.rgb = vec3(mix(0.2, (0.2 * (0.5 * (sin(2.0 * pi * theta1) + 1.0))) + 0.1, max(dotp(2.0 * uv) - 0.0, 0.0)));

                if((r2 < 0.2 * 0.2 && r2 > 0.19 * 0.19 && theta1 > 0.1 && theta1 < 0.9) || (uv.x < 0.005 && uv.y < 0.25 && uv.x > -0.005 && uv.y > 0.0)) {
                    gl_FragColor.rgb = vec3(0.3, 0.3, 1.0);
                }
            }
        }
    }
}