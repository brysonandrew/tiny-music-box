import { useContext } from "../../../../state/Context";
import { useContext as useToothContext } from "../../../../state/tooth/Context";

export const useBitcrusher = (
  g: GainNode
) => {
  const {
    context,
    bitcrusher: {
      bits,
      frequency,
    },
    effect,
  } = useContext();
  const { bitcrusher } =
    useToothContext();
  const { currentTime: t } = context;
  if (
    !bitcrusher ||
    effect !== "bitcrusher"
  )
    return null;
  bitcrusher.parameters
    .get("bits")
    .linearRampToValueAtTime(bits, t);
  bitcrusher.parameters
    .get("frequency")
    .linearRampToValueAtTime(
      frequency,
      t
    );
  g.connect(bitcrusher).connect(
    context.destination
  );
};
