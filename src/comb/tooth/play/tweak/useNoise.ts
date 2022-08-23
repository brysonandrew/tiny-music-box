import { useContext } from "../../../../state/Context";
import { useContext as useToothContext } from "../../../../state/tooth/Context";

export const useNoise = ([t, e]: [
  number,
  number
]) => {
  const { noiseWhite } =
    useToothContext();
  const {
    context,
    adsr: { gain },
  } = useContext();
  noiseWhite.parameters
    .get("gain")
    .setValueAtTime(gain, t);
  noiseWhite.parameters
    .get("gain")
    .exponentialRampToValueAtTime(
      0.001,
      e
    );
  noiseWhite.connect(
    context.destination
  );
};
