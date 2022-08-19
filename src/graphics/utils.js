glArrayType =
  typeof Float32Array != "undefined"
    ? Float32Array
    : typeof WebGLFloatArray != "undefined"
    ? WebGLFloatArray
    : Array;

function IdentityMat44() {
  const m = new glArrayType(16);
  m[0] = 1;
  m[1] = 0;
  m[2] = 0;
  m[3] = 0;
  m[4] = 0;
  m[5] = 1;
  m[6] = 0;
  m[7] = 0;
  m[8] = 0;
  m[9] = 0;
  m[10] = 1;
  m[11] = 0;
  m[12] = 0;
  m[13] = 0;
  m[14] = 0;
  m[15] = 1;
  return m;
}

function RotateAxis(matA, angRad, axis) {
  const aMap = [
    [1, 2],
    [2, 0],
    [0, 1],
  ];
  const a0 = aMap[axis][0],
    a1 = aMap[axis][1];
  const sinAng = Math.sin(angRad),
    cosAng = Math.cos(angRad);
  const matB = new glArrayType(16);
  for (const i = 0; i < 16; ++i) matB[i] = matA[i];
  for (const i = 0; i < 3; ++i) {
    matB[a0 * 4 + i] = matA[a0 * 4 + i] * cosAng + matA[a1 * 4 + i] * sinAng;
    matB[a1 * 4 + i] = matA[a0 * 4 + i] * -sinAng + matA[a1 * 4 + i] * cosAng;
  }
  return matB;
}

function Cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
    0.0,
  ];
}
function Dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function Normalize(v) {
  const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  return [v[0] / len, v[1] / len, v[2] / len];
}

const Camera = {};
Camera.create = function () {
  this.pos = [0, 3, 0.0];
  this.target = [0, 0, 0];
  this.up = [0, 0, 1];
  this.fov_y = 90;
  this.vp = [800, 600];
  this.near = 0.5;
  this.far = 100.0;
};
Camera.Perspective = function () {
  const fn = this.far + this.near;
  const f_n = this.far - this.near;
  const r = this.vp[0] / this.vp[1];
  const t = 1 / Math.tan((Math.PI * this.fov_y) / 360);
  const m = IdentityMat44();
  m[0] = t / r;
  m[1] = 0;
  m[2] = 0;
  m[3] = 0;
  m[4] = 0;
  m[5] = t;
  m[6] = 0;
  m[7] = 0;
  m[8] = 0;
  m[9] = 0;
  m[10] = -fn / f_n;
  m[11] = -1;
  m[12] = 0;
  m[13] = 0;
  m[14] = (-2 * this.far * this.near) / f_n;
  m[15] = 0;
  return m;
};
Camera.LookAt = function () {
  const mz = Normalize([
    this.pos[0] - this.target[0],
    this.pos[1] - this.target[1],
    this.pos[2] - this.target[2],
  ]);
  const mx = Normalize(Cross(this.up, mz));
  const my = Normalize(Cross(mz, mx));
  const tx = Dot(mx, this.pos);
  const ty = Dot(my, this.pos);
  const tz = Dot([-mz[0], -mz[1], -mz[2]], this.pos);
  const m = IdentityMat44();
  m[0] = mx[0];
  m[1] = my[0];
  m[2] = mz[0];
  m[3] = 0;
  m[4] = mx[1];
  m[5] = my[1];
  m[6] = mz[1];
  m[7] = 0;
  m[8] = mx[2];
  m[9] = my[2];
  m[10] = mz[2];
  m[11] = 0;
  m[12] = tx;
  m[13] = ty;
  m[14] = tz;
  m[15] = 1;
  return m;
};

const ShaderProgram = {};
ShaderProgram.Create = function (shaderList) {
  const shaderObjs = [];
  for (const i_sh = 0; i_sh < shaderList.length; ++i_sh) {
    const shderObj = this.CompileShader(shaderList[i_sh].source, shaderList[i_sh].stage);
    if (shderObj == 0) return 0;
    shaderObjs.push(shderObj);
  }
  const progObj = this.LinkProgram(shaderObjs);
  if (progObj != 0) {
    progObj.attribIndex = {};
    const noOfAttributes = gl.getProgramParameter(progObj, gl.ACTIVE_ATTRIBUTES);
    for (const i_n = 0; i_n < noOfAttributes; ++i_n) {
      const name = gl.getActiveAttrib(progObj, i_n).name;
      progObj.attribIndex[name] = gl.getAttribLocation(progObj, name);
    }
    progObj.unifomLocation = {};
    const noOfUniforms = gl.getProgramParameter(progObj, gl.ACTIVE_UNIFORMS);
    for (const i_n = 0; i_n < noOfUniforms; ++i_n) {
      const name = gl.getActiveUniform(progObj, i_n).name;
      progObj.unifomLocation[name] = gl.getUniformLocation(progObj, name);
    }
  }
  return progObj;
};
ShaderProgram.AttributeIndex = function (progObj, name) {
  return progObj.attribIndex[name];
};
ShaderProgram.UniformLocation = function (progObj, name) {
  return progObj.unifomLocation[name];
};
ShaderProgram.Use = function (progObj) {
  gl.useProgram(progObj);
};
ShaderProgram.SetUniformI1 = function (progObj, name, val) {
  if (progObj.unifomLocation[name]) gl.uniform1i(progObj.unifomLocation[name], val);
};
ShaderProgram.SetUniformF1 = function (progObj, name, val) {
  if (progObj.unifomLocation[name]) gl.uniform1f(progObj.unifomLocation[name], val);
};
ShaderProgram.SetUniformM44 = function (progObj, name, mat) {
  if (progObj.unifomLocation[name])
    gl.uniformMatrix4fv(progObj.unifomLocation[name], false, mat);
};
ShaderProgram.CompileShader = function (source, shaderStage) {
  const shaderScript = document.getElementById(source);
  if (shaderScript) {
    source = "";
    const node = shaderScript.firstChild;
    while (node) {
      if (node.nodeType == 3) source += node.textContent;
      node = node.nextSibling;
    }
  }
  const shaderObj = gl.createShader(shaderStage);
  gl.shaderSource(shaderObj, source);
  gl.compileShader(shaderObj);
  const status = gl.getShaderParameter(shaderObj, gl.COMPILE_STATUS);
  if (!status) alert(gl.getShaderInfoLog(shaderObj));
  return status ? shaderObj : 0;
};
ShaderProgram.LinkProgram = function (shaderObjs) {
  const prog = gl.createProgram();
  for (const i_sh = 0; i_sh < shaderObjs.length; ++i_sh)
    gl.attachShader(prog, shaderObjs[i_sh]);
  gl.linkProgram(prog);
  status = gl.getProgramParameter(prog, gl.LINK_STATUS);
  if (!status) alert("Could not initialise shaders");
  gl.useProgram(null);
  return status ? prog : 0;
};

const VertexBuffer = {};
VertexBuffer.Create = function (attributes, indices) {
  const buffer = {};
  buffer.buf = [];
  buffer.attr = [];
  for (const i = 0; i < attributes.length; ++i) {
    buffer.buf.push(gl.createBuffer());
    buffer.attr.push({ size: attributes[i].attrSize, loc: attributes[i].attrLoc });
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buf[i]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(attributes[i].data), gl.STATIC_DRAW);
  }
  buffer.inx = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.inx);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  buffer.inxLen = indices.length;
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  return buffer;
};
VertexBuffer.Draw = function (bufObj) {
  for (const i = 0; i < bufObj.buf.length; ++i) {
    gl.bindBuffer(gl.ARRAY_BUFFER, bufObj.buf[i]);
    gl.vertexAttribPointer(
      bufObj.attr[i].loc,
      bufObj.attr[i].size,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(bufObj.attr[i].loc);
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufObj.inx);
  gl.drawElements(gl.TRIANGLES, bufObj.inxLen, gl.UNSIGNED_SHORT, 0);
  for (const i = 0; i < bufObj.buf.length; ++i)
    gl.disableVertexAttribArray(bufObj.attr[i].loc);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};

function drawScene() {
  const canvas = document.getElementById("billboard-canvas");
  Camera.create();
  Camera.vp = [canvas.width, canvas.height];
  const currentTime = Date.now();
  const deltaMS = currentTime - startTime;

  const texUnit = 0;
  gl.activeTexture(gl.TEXTURE0 + texUnit);
  gl.bindTexture(gl.TEXTURE_2D, textureObj);

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const rotMat = IdentityMat44();
  rotMat = RotateAxis(rotMat, CalcAng(currentTime, 13.0), 0);
  rotMat = RotateAxis(rotMat, CalcAng(currentTime, 17.0), 1);
  const d = 1.0 + 0.7 * Math.sin(CalcAng(currentTime, 25.0));
  Camera.pos = [d * rotMat[0], d * rotMat[1], d * rotMat[2]];
  const viewMat = Camera.LookAt();

  // set up draw shader
  ShaderProgram.Use(progDraw);
  ShaderProgram.SetUniformM44(progDraw, "u_projectionMat44", Camera.Perspective());
  ShaderProgram.SetUniformM44(progDraw, "u_viewMat44", viewMat);
  ShaderProgram.SetUniformI1(progDraw, "u_texture", texUnit);
  const modelMat = IdentityMat44();
  modelMat[0] = 0.5;
  modelMat[5] = 0.5;
  modelMat[12] = -0.55;
  ShaderProgram.SetUniformM44(progDraw, "u_modelMat44", modelMat);
  ShaderProgram.SetUniformF1(progDraw, "u_billboard", 0.0);
  VertexBuffer.Draw(bufPlane);

  modelMat[12] = 0.55;
  ShaderProgram.SetUniformM44(progDraw, "u_modelMat44", modelMat);
  ShaderProgram.SetUniformF1(progDraw, "u_billboard", 1.0);
  VertexBuffer.Draw(bufPlane);
}

const Texture = {};
Texture.HandleLoadedTexture2D = function (image, texture, flipY) {
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  if (flipY != undefined && flipY == true) gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
};
Texture.LoadTexture2D = function (name) {
  const texture = gl.createTexture();
  texture.image = new Image();
  texture.image.setAttribute("crossorigin", "anonymous");
  texture.image.onload = function () {
    Texture.HandleLoadedTexture2D(texture.image, texture, true);
  };
  texture.image.src = name;
  return texture;
};

let startTime;
function Fract(val) {
  return val - Math.trunc(val);
}
function CalcAng(currentTime, intervall) {
  return Fract((currentTime - startTime) / (1000 * intervall)) * 2.0 * Math.PI;
}
function CalcMove(currentTime, intervall, range) {
  let pos = self.Fract((currentTime - startTime) / (1000 * intervall)) * 2.0;
  pos = pos < 1.0 ? pos : 2.0 - pos;
  return range[0] + (range[1] - range[0]) * pos;
}
function EllipticalPosition(a, b, angRag) {
  const a_b = a * a - b * b;
  const ea = a_b <= 0 ? 0 : Math.sqrt(a_b);
  const eb = a_b >= 0 ? 0 : Math.sqrt(-a_b);
  return [a * Math.sin(angRag) - ea, b * Math.cos(angRag) - eb, 0];
}

const sliderScale = 100.0;
const gl = null;
const progDraw = null;
const bufCube = {};
function sceneStart() {
  const canvas = document.getElementById("billboard-canvas");
  const vp = [canvas.width, canvas.height];
  gl = canvas.getContext("experimental-webgl");
  if (!gl) return;

  progDraw = ShaderProgram.Create([
    { source: "draw-shader-vs", stage: gl.VERTEX_SHADER },
    { source: "draw-shader-fs", stage: gl.FRAGMENT_SHADER },
  ]);
  progDraw.inPos = gl.getAttribLocation(progDraw, "inPos");
  progDraw.inTex = gl.getAttribLocation(progDraw, "inTex");
  if (progDraw == 0) return;

  const planPosData = [-1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0];
  const planTexData = [0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0];
  const planInxData = [0, 1, 2, 0, 2, 3];
  bufPlane = VertexBuffer.Create(
    [
      { data: planPosData, attrSize: 3, attrLoc: progDraw.inPos },
      { data: planTexData, attrSize: 2, attrLoc: progDraw.inTex },
    ],
    planInxData
  );

  textureObj = Texture.LoadTexture2D(
    "https://raw.githubusercontent.com/Rabbid76/graphics-snippets/master/resource/texture/tree.jpg"
  );

  startTime = Date.now();
  setInterval(drawScene, 50);
}
