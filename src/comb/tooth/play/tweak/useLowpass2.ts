import { useContext } from "../../../../state/Context";
import { useContext as useToothContext } from "../../../../state/tooth/Context";

export const useLowpass2 = (
  g: GainNode
) => {
  const {
    context,
    lowpass2: { frequency },
    effect,
  } = useContext();
  const { lowpass2 } =
    useToothContext();
  const { currentTime: t } = context;
  if (
    !lowpass2 ||
    effect !== "lowpass2"
  )
    return null;
  lowpass2.parameters
    .get("frequency")
    .linearRampToValueAtTime(
      frequency,
      t
    );
  g.connect(lowpass2).connect(
    context.destination
  );
};
