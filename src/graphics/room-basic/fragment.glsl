precision mediump float;

// uniform float uTime;
// const float uTime = 1.0;
uniform vec4 uMouse;
float uTime = uMouse.x * 0.01;

uniform vec2 uResolution;

struct Plane {
    vec3 normal;
    float offset;
};

struct Wall {
    Plane plane;
    vec3 color;
    int portal;
};

struct Ray {
    vec3 origin;
    vec3 normal;
};

struct Room {
    Wall walls[6];
};

void main(void) {
    Room rooms[2];
    rooms[0].walls[0] = Wall(Plane(vec3(1.0, 0.0, 0.0), -1.0), vec3(1.0, 0.5, 0.5), -1);
    rooms[0].walls[1] = Wall(Plane(vec3(-1.0, 0.0, 0.0), -1.0), vec3(0.5, 1.0, 0.5), -1);
    rooms[0].walls[2] = Wall(Plane(vec3(0.0, 1.0, 0.0), -1.0), vec3(0.1, 0.1, 0.1), -1);
    rooms[0].walls[3] = Wall(Plane(vec3(0.0, -1.0, 0.0), -2.0), vec3(0.9, 0.9, 0.9), -1);
    rooms[0].walls[4] = Wall(Plane(vec3(0.0, 0.0, 1.0), -1.0), vec3(0.5, 0.5, 1.0), -1);
    rooms[0].walls[5] = Wall(Plane(vec3(0.0, 0.0, -1.0), -1.0), vec3(0.5, 0.5, 0.5), 1);

    rooms[1].walls[0] = Wall(Plane(vec3(1.0, 0.0, 0.0), -2.0), vec3(0.0, 0.5, 0.5), -1);
    rooms[1].walls[1] = Wall(Plane(vec3(-1.0, 0.0, 0.0), -2.0), vec3(0.5, 0.0, 0.5), -1);
    rooms[1].walls[2] = Wall(Plane(vec3(0.0, 1.0, 0.0), -1.0), vec3(0.1, 0.1, 0.1), -1);
    rooms[1].walls[3] = Wall(Plane(vec3(0.0, -1.0, 0.0), -2.0), vec3(0.9, 0.9, 0.9), -1);
    rooms[1].walls[4] = Wall(Plane(vec3(0.0, 0.0, 1.0), 1.0), vec3(0.5, 0.5, 1.0), 0);
    rooms[1].walls[5] = Wall(Plane(vec3(0.0, 0.0, -1.0), -4.0), vec3(0.5, 0.5, 0.5), -1);

    vec3 lightPos = vec3(0.0, 0.0, sin(uTime / 10.0) * 2.0 - 2.0);

    vec3 forward = normalize(vec3(sin(uTime), -0.3, cos(uTime)));
    vec3 right = normalize(cross(forward, vec3(0, 1, 0)));
    vec3 up = cross(right, forward);

    float asp = uResolution.y / uResolution.x;

    float sx = 0.01 * (gl_FragCoord.x / uResolution.x - 0.5);
    float sy = 0.01 * (gl_FragCoord.y / uResolution.y - 0.5) * asp;
    Ray ray;
    ray.origin = vec3(0, -1, 0);
    ray.normal = normalize(vec3(right.x * sx + up.x * sy + forward.x * 0.0025, right.y * sx + up.y * sy + forward.y * 0.0025, right.z * sx + up.z * sy + forward.z * 0.0025));

    vec3 color = vec3(1, 0, 1);
    vec3 normal = vec3(0);
    float minDist;
    int roomIndex = 0;
    for(int bla = 0; bla < 2; ++bla) {
        if(roomIndex == bla) {
            minDist = 1000000000.0;
            int nextIndex = -1;
            for(int i = 0; i < 6; ++i) {
                Wall wall = rooms[bla].walls[i];
                float d = dot(wall.plane.normal, ray.normal);
                float dist = -(dot(wall.plane.normal, ray.origin) + wall.plane.offset) / d;

                if(d > 0.0 && dist > 0.001 && dist < minDist) {
                    minDist = dist;
                    normal = wall.plane.normal;
                    color = wall.color;
                    nextIndex = wall.portal;
                }
            }
            if(-1 == nextIndex)
                break;
            roomIndex = nextIndex;
        }
    }

    vec3 worldPos = ray.origin + ray.normal * minDist;
    vec3 lightDist = worldPos - lightPos;
        //color *= dot(normal, normalize(lightDist));
    color /= dot(lightDist, lightDist);
    gl_FragColor = vec4(color, 1.0);
}