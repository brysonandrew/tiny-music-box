import { Tooth } from "./tooth";
import {
  FROM_KEY,
  MIDI_KEYS,
  NOOP,
} from "../config";
import { useKey } from "../handlers";
import { useContext } from "../state/Context";
import { Ambient } from "./ambient";
import { useActiveMidisLog } from "../utils/log/useActiveMidisLog";

export const Comb = () => {
  const { midis, dispatch } =
    useContext();

  const handleKey = ({
    key,
    repeat,
  }: any) => {
    const numberKey = +key;
    if (
      !repeat &&
      typeof numberKey === "number" &&
      !isNaN(numberKey)
    ) {
      const midi = numberKey + FROM_KEY;
      console.log(`NEXT MIDI:
      ${midi}`);

      dispatch({
        type: "midis",
        value: [midi, true],
      });
    }
  };

  useKey({
    handlers: {
      onKeyDown: handleKey,
      onKeyUp: NOOP,
    },
    isActive: true,
  });
  return (
    <>
      <Ambient />
      <>
        {MIDI_KEYS.map(
          (midi: number) => (
            <Tooth
              key={`Tooth-${midi}`}
              midi={midi}
            />
          )
        )}
      </>
    </>
  );
};
