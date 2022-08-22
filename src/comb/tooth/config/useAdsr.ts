import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";

const MAX = 4;
const useGain = () => {
  const { g } = useToothContext();
  const {
    context: { currentTime: t },
    tweak: { gain },
    adsr: {
      attack,
      decay,
      sustain,
      release,
    },
  } = useContext();
  console.log(
    attack,
    decay,
    sustain,
    release
  );
  const adsr =
    attack + decay + sustain + release;
  const step = 1 / MAX;

  if (adsr > 0) {
    g.gain.cancelScheduledValues(t);
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
      0.0,
      end
    );
  }
};

export const useAdsr = () => {
  useGain();
};
