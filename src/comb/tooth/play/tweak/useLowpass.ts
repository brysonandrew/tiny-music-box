import { useContext } from "../../../../state/Context";
import { useContext as useToothContext } from "../../../../state/tooth/Context";

export const useLowpass = (
  g: GainNode
) => {
  const {
    context,
    lowpass: { range },
    effect,
  } = useContext();
  const { lowpass } = useToothContext();
  const { currentTime: t } = context;
  if (!lowpass || effect !== "lowpass")
    return null;
  lowpass.parameters
    .get("range")
    .linearRampToValueAtTime(range, t);
  g.connect(lowpass).connect(
    context.destination
  );
};
