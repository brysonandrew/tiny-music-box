import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";

export const useConnect = () => {
  const { context } = useContext();
  const { o, d, g } = useToothContext();

  o.connect(d);

  // d.connect(g2);
  // g2.connect(d);

  // n.connect(g);
  
  // w.connect(g2);

  g.connect(d).connect(
    context.destination
  );
};
