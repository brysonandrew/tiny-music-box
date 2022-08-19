declare module "*.mid" {
  const content: any;
  export default content;
}

declare module "*.glb" {
  const content: any;
  export default content;
}

declare module "*.gltf" {
  const content: any;
  export default content;
}

declare module "*.obj" {
  const content: any;
  export default content;
}

declare module "*.max" {
  const content: any;
  export default content;
}

declare module "*.3ds" {
  const content: any;
  export default content;
}

declare module "*.tga" {
  const content: any;
  export default content;
}

declare module "*.mp4" {
  const content: any;
  export default content;
}

declare module "*.jpeg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.jpg" {
  const content: any;
  export default content;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.glsl" {
  const value: string;
  export default value;
}

declare module "phenomenon";

declare namespace JSX {
  interface IntrinsicElements {
    colorShiftMaterial: any;
    rectAreaLightHelper: any;
    simulationMaterial: any;
    dofPointsMaterial: any;
    shaderMaterial2: any;
  }
}

declare module "complex-analyzer-node";

interface AudioWorkletProcessor {
  readonly port: MessagePort;
  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ): boolean;
}

declare const AudioWorkletProcessor: {
  prototype: AudioWorkletProcessor;
  new (options?: AudioWorkletNodeOptions): AudioWorkletProcessor;
};

interface AudioParamMap {
  get(name:string): any;
}

declare function registerProcessor(
  name: string,
  processorCtor: (new (
    options?: AudioWorkletNodeOptions
  ) => AudioWorkletProcessor) & {
    parameterDescriptors?: AudioParamDescriptor[];
  }
): void;
