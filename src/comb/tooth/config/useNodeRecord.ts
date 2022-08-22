import {
  useEffect,
  useRef,
} from "react";
import { useContext } from "../../../state/Context";
import type { TInitMidiValue } from "../../../state/types";

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
    const init = async () => {
      await context.audioWorklet.addModule(
        "worklets/karplus-strong.js"
      );
      await context.audioWorklet.addModule(
        "worklets/noise-white.js"
      );

      const value: TInitMidiValue = {
        midi,
        nodeRecord: {
          d: context.createDelay(),
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
      dispatch({
        type: "initMidis",
        value,
      });
      
      refCount.current++;
    };

    if (!isInit) {
      init();
    }
  }, [isInit, dispatch]);
};
