import {
  useEffect,
  useRef,
} from "react";
import { useContext } from "../../../state/Context";
import type { TInitMidiValue } from "../../../state/types";
import { midiToFreq } from "../../../utils";

export const useNodeRecord = (
  midi: number
): void => {
  const {
    context,
    initMidis,
    dispatch,
  } = useContext();
  const isInit = initMidis[midi];
  const refCount = useRef(0);

  useEffect(() => {
    if (refCount.current > 1) {
      console.error(
        "excess init node count " +
          refCount.current
      );
    }
    const init = async () => {
      const t = context.currentTime;
      await context.audioWorklet.addModule(
        "worklets/karplus-strong.js"
      );
      await context.audioWorklet.addModule(
        "worklets/noise-white.js"
      );
      const f = midiToFreq(midi);

      const o =
        context.createOscillator();

      o.frequency.setValueAtTime(f, t);

      o.start(t);

      const value: TInitMidiValue = {
        midi,
        nodeRecord: {
          o,
          d: context.createDelay(),
          g: context.createGain(),
          g2: context.createGain(),
          g3: context.createGain(),
          n: new AudioWorkletNode(
            context,
            "noise-white"
          ),
          w: new AudioWorkletNode(
            context,
            "karplus-strong"
          ),
        },
      };
      // console.log(value);
      // console.log("----");

      console.log("HERE");
      console.log(dispatch.toString());
      console.log(dispatch);
      console.log("HERE");
      // console.log("----");

      dispatch({
        type: "initMidis",
        value,
      });
      dispatch({
        type: "ready",
        value: true,
      });
      refCount.current++;
    };

    if (!isInit) {
      init();
    }
  }, [isInit, dispatch]);
};
