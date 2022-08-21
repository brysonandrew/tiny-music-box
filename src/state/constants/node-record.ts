export type TNodeRecord = {
  o: OscillatorNode;

  d: DelayNode;

  g: GainNode;
  g2: GainNode;
  g3: GainNode;

  w: AudioWorkletNode;
  n: AudioWorkletNode;
};

export type TNodeRecordInit =
  TNodeRecord | null;
