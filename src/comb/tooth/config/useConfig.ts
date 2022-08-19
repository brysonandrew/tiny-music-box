import {
  useEffect,
  useRef,
} from "react";
import type { MutableRefObject } from "react";
import { useContext } from "../../../state/Context";
import type { TInitRef } from "./ref";

export const useConfig =
  (): TInitRef => {
    const { context } = useContext();
    const configRef: MutableRefObject<TInitRef> =
      useRef<TInitRef>(null);

    useEffect(() => {
      const init = async () => {
        await context.audioWorklet.addModule(
          "worklets/karplus-strong.js"
        );
        const w = new AudioWorkletNode(
          context,
          "karplus-strong"
        );
        await context.audioWorklet.addModule(
          "worklets/noise-white.js"
        );
        const n = new AudioWorkletNode(
          context,
          "noise-white"
        );
        configRef.current = {
          isOn: false,
          o: context.createOscillator(),

          d: context.createDelay(),

          g: context.createGain(),
          g2: context.createGain(),
          g3: context.createGain(),

          n,
          w,
        };
      };
      if (!configRef.current) {
        init();
      }
    }, []);

    return configRef.current;
  };
