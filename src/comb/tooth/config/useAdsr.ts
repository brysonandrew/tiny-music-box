import { useRef } from "react";
import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";
import { midiToFreq } from "../../../utils";

const MAX = 4;
export const useAdsr = () => {
  const countRef = useRef<
    number | null
  >(null);
  const { dispatch } = useContext();
  const { g, midi } = useToothContext();
  const {
    context,
    tweak: { gain },
    adsr: {
      attack,
      decay,
      sustain,
      release,
    },
  } = useContext();
  if (countRef.current === null) {
    g.connect(context.destination);
    countRef.current = 0;
  }
  if (countRef.current !== 0)
    return null;
  countRef.current++;
  const t = context.currentTime;

  const o = context.createOscillator();
  const frequency = midiToFreq(midi);
  o.frequency.setValueAtTime(
    frequency,
    t
  );
  o.connect(g);
  o.start(t);

  const adsr =
    attack + decay + sustain + release;

  const step = 1 / MAX;

  if (adsr > 0) {
    //g.gain.cancelScheduledValues(t);
    const next = t + step;

    const a = attack;
    const start = next + a * step;

    g.gain.linearRampToValueAtTime(
      gain,
      start
    );
    const ad = a + decay;
    g.gain.linearRampToValueAtTime(
      sustain,
      next + ad * step
    );
    const ads =
      attack + decay + sustain;
    g.gain.linearRampToValueAtTime(
      sustain,
      next + ads * step
    );
    const end = next + adsr * step;
    g.gain.linearRampToValueAtTime(
      0,
      end
    );
  }
  console.log(countRef.current);
  o.stop(t + adsr);
  o.onended = () => {
    countRef.current = 0;
    dispatch({
      type: "midis",
      value: [midi, false],
    });
  };
};
