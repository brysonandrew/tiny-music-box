
import { useContext } from "../../../../state/Context";
import {
  GAIN_MULTIPLIER,
  STOP_BUFFER,
} from "../constants";
import type { TConnectReturn } from "../useConnect";

type TConfig = TConnectReturn;
export const useAdsr = ({
  o,
  g,
}: TConfig) => {
  const {
    context,
    tweak: { delay },
    adsr: {
      gain,
      attack,
      decay,
      sustain,
      release,
    },
  } = useContext();
  const t = context.currentTime;
  // ATTACK
  const a = attack;
  const start = t + a;
  g.gain.linearRampToValueAtTime(
    gain * GAIN_MULTIPLIER,
    start
  );
  //~

  // DECAY
  const ad = a + decay;
  g.gain.linearRampToValueAtTime(
    sustain,
    t + ad
  );
  //~
  // SUSTAIN
  const ads = attack + decay + sustain;
  g.gain.linearRampToValueAtTime(
    sustain,
    t + ads
  );
  //~

  // RELEASE
  const adsr =
    attack + decay + sustain + release;
  const end = (t + adsr);
  g.gain.setTargetAtTime(0, end, 0.01);
  o.stop(t + adsr + STOP_BUFFER);
  //~
};
