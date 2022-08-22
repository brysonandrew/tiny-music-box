import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";
import { midiToFreq } from "../../../utils";

type TConnectReturn = {
  o: OscillatorNode;
  g: GainNode;
};
export const useCleanUp = ({
  o,
  g,
}: TConnectReturn) => {
  const { midi } = useToothContext();
  const { dispatch } = useContext();
  o.onended = () => {
    g.disconnect();
    dispatch({
      type: "midis",
      value: [midi, false],
    });
  };
};
