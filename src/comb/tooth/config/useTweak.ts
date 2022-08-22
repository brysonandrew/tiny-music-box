import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";

const useOscillator = () => {
  const { o } = useToothContext();
  const { tweak } = useContext();
  o.detune.value = tweak.detune;
  o.type = "triangle";
};

const useDelay = () => {
  const { d } = useToothContext();
  const {
    tweak: { delay },
  } = useContext();
  d.delayTime.value = delay;
};
const useNoise = ([t, e]: [
  number,
  number
]) => {
  const { n } = useToothContext();
  const {
    tweak: { depth },
  } = useContext();
  n.parameters
    .get("gain")
    .setValueAtTime(depth, t);
  n.parameters
    .get("gain")
    .exponentialRampToValueAtTime(
      0.001,
      e
    );
};

const useKarplusStrong = ([t, e]: [
  number,
  number
]) => {
  const { w } = useToothContext();
  const {
    tweak: { depth },
  } = useContext();
  w.parameters
    .get("gain")
    .exponentialRampToValueAtTime(
      depth,
      t
    );
  w.parameters
    .get("gain")
    .exponentialRampToValueAtTime(
      0.001,
      e
    );
};

const useDecay = ([t, e]: [
  number,
  number
]) => {
  const { g2 } = useToothContext();
  const {
    tweak: { decay },
  } = useContext();
  g2.gain.setValueAtTime(decay, t);
  g2.gain.linearRampToValueAtTime(0, e);
};

export const useTweak = () => {
  // useOscillator();
  // useNoise([t, e]);
  // useDelay();
  // useKarplusStrong([t, e]);
  // useDecay([t, e]);
};
