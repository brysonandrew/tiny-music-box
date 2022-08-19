export type TRef = {
  isOn: boolean;
  o: OscillatorNode;

  d: DelayNode;

  g: GainNode;
  g2: GainNode;
  g3: GainNode;

  w: AudioWorkletNode;
  n: AudioWorkletNode;
};
export type TInitRef = TRef | null;
