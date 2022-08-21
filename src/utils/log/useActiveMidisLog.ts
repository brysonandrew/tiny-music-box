import { FROM_KEY } from "../../config";

export const useActiveMidisLog = (
  midis: boolean[]
) => {
  const inRangeMidis =
    midis.slice(FROM_KEY);
  console.log(midis);
  console.log(inRangeMidis);

  console.log(
    `ACTIVE MIDIS:
    count: ${inRangeMidis.length}
    active count: ${
      inRangeMidis.filter(Boolean)
        .length
    }
  ${inRangeMidis.map((v, i) =>
    v ? i + FROM_KEY : "--"
  )}`.replace(new RegExp(",", "g"), "|")
  );
};
