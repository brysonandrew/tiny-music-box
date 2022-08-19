import type { MutableRefObject } from "react";
import { useContext } from "../../../state/Context";
import { midi2Freq } from "../../../utils";
import type {
  TInitRef,
  TRef,
} from "./ref";
import { SOUND_CONFIG } from "./sound";

export type TPlayConfig = {
  index: number;
  ref: TInitRef;
};
export const usePlay = ({
  index,
  ref,
}: TPlayConfig) => {
  const { context } = useContext();
  return () => {
    if (ref) {
      const {
        decay,
        gain,
        delay,
        depth,
        detune,
        span,
      } = SOUND_CONFIG;

      const t = context.currentTime;
      const bpm = 100;
      const e = t + 60 / bpm;

      const midi = index + 20;
      const f = midi2Freq(midi);

      ref.o.frequency.setValueAtTime(
        f,
        t
      );
      ref.o.detune.value = detune;
      ref.o.type = "triangle";

      ref.d.delayTime.value = delay;
      ref.g2.gain.value = decay;

      if (!ref.isOn) {
        ref.isOn = true;
        ref.o.start(t);
      }

      if (ref.n) {
        ref.n.connect(ref.g2);
        ref.n.parameters
          .get("gain")
          .setValueAtTime(depth, t);

        ref.w.parameters
          .get("gain")
          .exponentialRampToValueAtTime(
            0.001,
            e
          );
      }

      ref.o.connect(ref.d);

      ref.d.connect(ref.g2);

      ref.g2.connect(ref.d);

      ref.g3
        .connect(ref.d)
        .connect(context.destination);

      ref.g2.gain.setValueAtTime(
        gain,
        t
      );

      ref.g2.gain.linearRampToValueAtTime(
        0,
        e
      );

      ref.g3.gain.setValueAtTime(
        decay,
        t
      );

      ref.g3.gain.linearRampToValueAtTime(
        0,
        e
      );
    }
  };
};
