import type { TNodeRecord } from "../../../state/constants/node-record";
import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";

const useOscillator = () => {
  const { o } = useToothContext();
  const { sound } = useContext();
  o.detune.value = sound.detune;
  o.type = "triangle";
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

const useGain = ([t, e]: [
  number,
  number
]) => {
  const { g } = useToothContext();

  const {
    sound: { gain },
  } = useContext();
  g.gain.setValueAtTime(gain, t);
  g.gain.linearRampToValueAtTime(0, e);
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
  const { context, sound, midis } =
    useContext();
  const { midi } = useToothContext();
  const { span } = sound;
  const isActive = midis[midi];

  
  const bpm = 100;
  const t = context.currentTime;
  const e = t + span / bpm;

  useOscillator();
  useNoise([t, e]);
  useDelay();
  useKarplusStrong([t, e]);
  useGain([t, e]);
  useDecay([t, e]);
};
