import { useContext } from "../../../../state/Context";
import { useContext as useToothContext } from "../../../../state/tooth/Context";

const useKarplusStrong = () => {
  const {
    context: { currentTime: t },
    wave,
    tweak: { decay, delay, depth },
  } = useContext();
  const { karplusStrong } =
    useToothContext();

  if (!karplusStrong) return null;
  karplusStrong.parameters
    .get("delayTime")
    .linearRampToValueAtTime(
      delay * 1000,
      t
    );
  karplusStrong.parameters
    .get("gain")
    .setValueAtTime(decay * 2 - 1, t);
};
