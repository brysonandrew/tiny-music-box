import { useContext } from "../../../../state/Context";
import { useContext as useToothContext } from "../../../../state/tooth/Context";

export const useMoog = (
  g: GainNode
) => {
  const {
    context,
    moog: { cutoff, resonance, offset },
    effect
  } = useContext();
  const { moog } = useToothContext();
  const { currentTime: t } = context;
  if (!moog || effect !== "moog") return null;
  moog.parameters
    .get("cutoff")
    .linearRampToValueAtTime(cutoff, t);
  moog.parameters
    .get("resonance")
    .linearRampToValueAtTime(
      resonance,
      t
    );
  moog.parameters
    .get("offset")
    .linearRampToValueAtTime(offset, t);
  g.connect(moog).connect(
    context.destination
  );
};
