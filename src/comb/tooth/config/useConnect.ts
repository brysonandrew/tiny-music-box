import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";

export const useConnect = () => {
  const { context } = useContext();
  const { o, d, g, g2, w } =
    useToothContext();
  const {
    currentTime: t,
    destination,
  } = context;

  g.gain.setValueAtTime(0, t);
  o.connect(g);

  //d.connect(g).connect(w).connect(d);

  //d.connect(g2);

  g.connect(destination);
};
