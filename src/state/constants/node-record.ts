import type { TEffectRecord } from "../../comb/tooth/play/tweak/ui/effects/type";

export type TNodeRecord =
  TEffectRecord & {
    d: DelayNode;
    g2: GainNode;
    g3: GainNode;
  };

export type TNodeRecordInit =
  TNodeRecord | null;
