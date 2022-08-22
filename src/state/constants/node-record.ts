export type TNodeRecord = {
  d: DelayNode;

  g2: GainNode;
  g3: GainNode;

  w: AudioWorkletNode;
  n: AudioWorkletNode;
};

export type TNodeRecordInit =
  TNodeRecord | null;
