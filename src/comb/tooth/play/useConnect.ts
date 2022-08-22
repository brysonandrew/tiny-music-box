import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";
import { midiToFreq } from "../../../utils";

export type TConnectReturn = {
  o: OscillatorNode;
  g: GainNode;
};
export const useConnect = () => {
  const {
    context,
    tweak: { delay },
  } = useContext();
  const { currentTime: t } = context;
  const { midi, d } = useToothContext();
  const o = new OscillatorNode(
    context,
    { type: "triangle" }
  );
  const frequency = midiToFreq(midi);
  o.frequency.setValueAtTime(
    frequency,
    t
  );
  const g = context.createGain();
  o.connect(g);
  o.start(t);
  g.gain.setValueAtTime(0, t);
  g.connect(context.destination);

  return { o, g };
};
