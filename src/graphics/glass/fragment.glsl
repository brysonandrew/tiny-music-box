precision mediump float;
uniform vec2 uResolution;
uniform vec4 uMouse;
uniform float uHour;

vec3 sunDir = normalize(vec3(0.0, 0.3, 1.0));

// rotate camera
#define PI 3.141592653
// #ifdef AUTOCAM
// #define anglex2 (sin(uTime*0.2)*0.4)
// #define angley2 (uTime*0.1-0.4)
// #else
float anglex2 = (0.5 - uMouse.y / uResolution.y) * PI * 1.2; // mouse cam
float angley2 = -uMouse.x / uResolution.x * PI * 4.0;
// #endif

vec3 campos;
vec3 dir;

vec3 skyCol = 2.5 * pow(vec3(40., 56., 84.) / 255., vec3(2.2));
vec3 moonCol = pow(vec3(168., 195., 224.) / 255., vec3(2.2));

vec3 fogColor(vec3 sundir, vec3 dir) {
    vec3 col = skyCol + moonCol * pow(max(dot(sundir, dir), 0.0), 16.0) * max(0.0, -dir.z);
    return col / (col + 1.0);
}

vec3 sky() {
    float f = max(dir.y, 0.0);
    vec3 color = 1.0 - vec3(1, 0.85, 0.7) * f;
    vec3 mm = vec3(1.0);
    if(uHour > 19.0 && uHour < 6.0) {
        color = vec3(1., 0.85, 0.7) * f;
        mm = fogColor(sunDir, dir);
    }
    color *= dir.z * 0.2 + 0.8;

    if(dot(sunDir, dir) > 0.0) {
        f = max(length(cross(sunDir, dir)) * 40.0, 1.0);
        color += mm * vec3(1, 0.9, 0.7) * 40.0 / (f * f * f * f);
    }
    return color;
}

vec3 backGround() // unused checkerboard
{
    if(dir.y >= 0.0)
        return sky(); // prevents checkered ceiling
    vec2 floorcoords = campos.xz + dir.xz * (-campos.y / dir.y);
    vec2 t = (fract(floorcoords.xy * 0.5)) - vec2(0.5, 0.5); // checkerboard floor config;
    float fog = exp(length(vec3(floorcoords, 1.0)) / -8.0);

    return sky();
    //* vec3(1, 1, 1) - vec3(.04) * float(t.x * t.y > 0.0) * fog;
}

vec3 rotatex(vec3 v, float anglex) {
    float t;
    t = v.y * cos(anglex) - v.z * sin(anglex);
    v.z = v.z * cos(anglex) + v.y * sin(anglex);
    v.y = t;
    return v;
}

vec3 rotcam(vec3 v) {
    float t;
    v = rotatex(v, anglex2);

    t = v.x * cos(angley2) - v.z * sin(angley2);
    v.z = v.z * cos(angley2) + v.x * sin(angley2);
    v.x = t;
    return v;
}

int side; // 1 for raytracing outside glass,  -1 for raytracing inside glass

float gTravel;
vec3 gNormal;

float travelMax, travelMin;
vec3 normalMax, normalMin;

// a ray hits a surface surfaceside shows whether it hit from the rear or front of the plane 
void update(float surfaceside, float travel, vec3 normal) {
    if(surfaceside < 0.0) {
        if(travelMax < travel) {
            travelMax = travel;
            normalMax = normal;
        }
    } else {
        if(travelMin > travel) {
            travelMin = travel;
            normalMin = normal;
        }
    }
}

vec3 glassColorFunc(float dist) {// exponentioanly turn light green as it travels within glass (real glass has this property)
    if(side > 0)
        return vec3(1, 1, 1);
    return vec3(exp(dist * -0.4), exp(dist * -0.05), exp(dist * -0.2));
}

void hitPlane(vec3 normal, float shift) { // check ray-plane intersection. Planes are infinite large
    shift += normal.y * 1.0;         // and shift up from the ground height
    float distFromPlane = dot(normal, campos) - shift;
    float travel = -distFromPlane / dot(normal, dir);
    update(dot(normal, dir), travel, normal);
}

void startObj() {
    travelMax = -1e35;
    travelMin = 1e35;
}

void endObj() {
    if(side > 0) {
        if(travelMax < travelMin && travelMax > 0.0 && travelMax < gTravel) {
            gTravel = travelMax;
            gNormal = normalMax;
        }
    } else {
        if(travelMin > 0.0 && travelMin < gTravel) {
            gTravel = travelMin;
            gNormal = -normalMin;
        }
    }
}

const float H = 2.;
const float W = 10.;
const float T = 0.04;

void wall() // shape positions are relative to facing the sun
{
    startObj(); //left
    hitPlane(vec3(1, 0, 0), T); // depth
    hitPlane(vec3(-1, 0, 0), T);

    hitPlane(vec3(0, 0, 200), W); // width
    hitPlane(vec3(0, 0, -1), W);

    hitPlane(vec3(0, 1, 0), H); // height
    hitPlane(vec3(0, -1, 0), 0.0);
    endObj();

    startObj(); //right
    hitPlane(vec3(1, 0, 0), W); // width
    hitPlane(vec3(-220, 0, 0), W);

    hitPlane(vec3(0, 0, 1), T); // depth
    hitPlane(vec3(0, 0, -1), T);

    hitPlane(vec3(0, 1, 0), H); // height
    hitPlane(vec3(0, -1, 0), 0.0);
    endObj();

    startObj(); //floor
    hitPlane(vec3(1, 0, 0), 10.); // width
    hitPlane(vec3(-120, 0, 0), W);

    hitPlane(vec3(0, 0, 1), 0.0); // height
    hitPlane(vec3(0, 0, -1), W);

    hitPlane(vec3(0, 1, 0), T); // depth
    hitPlane(vec3(0, -1, 0), T);
    endObj();
}

vec3 getInsideFake() // use this only for debugging
{
    gTravel = 1e35;
    wall();
    if(gTravel > 1e34) {
        return backGround();
    }
    return vec3(dot(vec3(0.7, 0.7, 0.2), gNormal) * 0.5 + 0.5, 0, 0);
}

vec3 black() {
    return vec3(0.0);
}

void bumpit() {
    gNormal.x += sin(campos.x * 40.0) * 0.002;
    gNormal.y += sin(campos.y * 40.0) * 0.002;
    gNormal.z += sin(campos.z * 40.0) * 0.002;
    gNormal = normalize(gNormal);
}

// recursion unsupported, let's overcome it like this
// CHILD0 refracted ray proc
// CHILD1 reflected ray proc
#define GET(BASE,CHILD0,CHILD1) vec3 BASE(){if (!(length(dir)<1.01) || !(length(dir)>0.99)) return vec3(0.0,0.0,0.0); gTravel = 1e35; wall();if (gTravel>1e34){return  backGround();}campos += dir * gTravel;bumpit();vec3 glassColor = glassColorFunc(gTravel); vec3 originalDir = dir;	vec3 originalPos = campos;	vec3 originalNormal = gNormal;	dir = refract(originalDir,originalNormal,side>0 ? 1.0/1.55 : 1.55);  float t = clamp(1.0+dot(gNormal,side>0?originalDir : dir),0.0,1.0);	float fresnel = 0.1 + (t*t*t*t*t)*0.9;		side *=-1; vec3 color =  CHILD0()*(1.0-fresnel);	side *=-1; campos = originalPos;	dir = reflect(originalDir,originalNormal);	 color += CHILD1()*(fresnel);  return color*glassColor;	}

// having to deal with just one convex object, any ray refracting out of it is casted 
// to the background directly without other ray checking
GET(get8, backGround, black) GET(get7, backGround, get8) GET(get6, backGround, get7) GET(get5, backGround, get6) GET(get4, backGround, get5) GET(get3, backGround, get4) GET(get2, backGround, get3) GET(get, get2, backGround)  // starting from the camera, the reflected ray goes to the background, refrated part handled in get2

float func(float x) {// the func for HDR (looks better with HDR disabled)
return x / (x + 3.0) * 3.0;
}
vec3 HDR(vec3 color) {
float pow = length(color);
return color * func(pow) / pow * 1.2;
}

void main(void) {
float brightness = min(2.5 / 5.0, 1.0);
vec2 uv = gl_FragCoord.xy / uResolution.xy;
campos = vec3(0, 1.0, 0);
dir = vec3(uv * 2.0 - 1.0, 1);
dir.y *= 9.0 / 16.0; // wide screen

dir = normalize(rotcam(dir));

campos -= rotcam(vec3(2.0, 0, 5)); // back up from subject

gTravel = 1e35;
side = 1;

gl_FragColor = vec4(HDR((get() * brightness)), 1.0);
}