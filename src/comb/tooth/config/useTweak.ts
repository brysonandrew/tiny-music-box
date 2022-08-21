import type { TNodeRecord } from "../../../state/constants/node-record";
import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";
const DURATION = 1;
const useOscillator = () => {
  const { o } = useToothContext();
  const { sound } = useContext();
  o.detune.value = sound.detune;
  o.type = "triangle";
};

const useGain = () => {
  const { g } = useToothContext();
  const {
    context: { currentTime: t },
    sound: { gain },
  } = useContext();
  const e = t + DURATION;
  g.gain.setValueAtTime(gain, t);
  g.gain.linearRampToValueAtTime(0, e);
};

const useDelay = () => {
  const { d } = useToothContext();
  const {
    sound: { delay },
  } = useContext();
  d.delayTime.value = delay;
};
const useNoise = ([t, e]: [
  number,
  number
]) => {
  const { n } = useToothContext();
  const {
    sound: { depth },
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
    sound: { depth },
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
    sound: { decay },
  } = useContext();
  g2.gain.setValueAtTime(decay, t);
  g2.gain.linearRampToValueAtTime(0, e);
};

export const useTweak = () => {
  useOscillator();
  useGain();

  // useNoise([t, e]);
  // useDelay();
  // useKarplusStrong([t, e]);
  // useDecay([t, e]);
};
