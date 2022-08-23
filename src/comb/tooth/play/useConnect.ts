import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";
import { midiToFreq } from "../../../utils";

export type TConnectReturn = {
  o: OscillatorNode;
  g: GainNode;
};
export const useConnect = () => {
  const { context } = useContext();
  const { currentTime: t } = context;
  const { midi } = useToothContext();
  const o = context.createOscillator();
  const frequency = midiToFreq(midi);
  o.frequency.setValueAtTime(
    frequency,
    t
  );
  const g = context.createGain();
  o.start(t);
  o.connect(g);
  g.gain.setValueAtTime(0, t);
  g.connect(context.destination);

  return { o, g };
};
