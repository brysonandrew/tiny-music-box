import { useContext as useToothContext } from "../state/tooth/Context";
import { useContext } from "../state/Context";

export const useAdsr = () => {
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

    const set = (
      v: number,
      time: number
    ) => {
      g.gain.linearRampToValueAtTime(
        v,
        t + time
      );
    };
    set(0.0, -t);
    set(0.0, 0);
    set(gain, attack);
    set(sustain, attack + decay);
    set(
      sustain,
      attack + decay + sustain
    );
    set(
      0.0,
      attack + decay + sustain + release
    );
  };
};
