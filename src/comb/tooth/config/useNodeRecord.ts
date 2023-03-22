import {
  useEffect,
  useRef,
} from "react";
import { useContext } from "../../../state/Context";
import type { TInitMidiValue } from "../../../state/types";
import type {
  TEffectKey,
  TEffectRecord,
} from "../play/tweak/ui/effects/type";
import { EFFECTS } from "../play/tweak/ui/effects/type";

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
      for (const name of EFFECTS) {
        await context.audioWorklet.addModule(
          `worklets/${name}.js`
        );
      }
      const value: TInitMidiValue = {
        midi,
        nodeRecord: {
          d: context.createDelay(),
          g2: context.createGain(),
          g3: context.createGain(),
          ...EFFECTS.reduce<TEffectRecord>(
            (
              a: TEffectRecord,
              c: TEffectKey
            ) => {
              const next =
                new AudioWorkletNode(
                  context,
                  c
                );
              a[c] = next;
              return a;
            },
            {} as TEffectRecord
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
