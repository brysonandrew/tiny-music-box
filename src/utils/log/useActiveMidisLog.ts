export const useActiveMidisLog = (
  midis: boolean[],
  fromKey: number
) => {
  const inRangeMidis =
    midis.slice(fromKey);

  console.log(
    `ACTIVE MIDIS:
    count: ${inRangeMidis.length}
    active count: ${
      inRangeMidis.filter(Boolean)
        .length
    }
  ${inRangeMidis.map((v, i) =>
    v ? i + fromKey : "--"
  )}`.replace(new RegExp(",", "g"), "|")
  );
};
