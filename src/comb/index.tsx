import { Tooth } from "./tooth";
import {
  MIDI_KEYS,
  NOOP,
} from "../config";
import { useKey } from "../handlers";
import { useContext } from "../state/Context";
import { Ambient } from "./ambient";
import { useRef } from "react";

export const Comb = () => {
  const { dispatch, fromKey } =
    useContext();
  const settings = { fromKey };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  
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
      const midi =
        numberKey +
        settingsRef.current.fromKey;
      console.log(
        settingsRef.current.fromKey
      );
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
