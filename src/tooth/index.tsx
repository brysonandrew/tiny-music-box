import type { FC } from "react";
import {
  useEffect,
  useRef,
} from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useContext } from "../state/Context";
import { midi2Freq } from "../utils";

const Root = styled.li``;

const Button = styled(motion.button)`
  width: 100px;
  height: 10px;
  background-color: aliceblue;
  color: black;
`;
export type TConfig = {
  decay: number;
  depth: number;
  gain: number;
  delay: number;
  detune: number;
  span: number;
};
const CONFIG: TConfig = {
  decay: 0.999,
  delay: 0.0001,
  gain: 0.4,
  depth: 1,
  detune: 0,
  span: 100,
};

type TRef = {
  isOn: boolean;
  o: OscillatorNode;

  d: DelayNode;

  g: GainNode;
  g2: GainNode;
  g3: GainNode;

  w: AudioWorkletNode;
  n: AudioWorkletNode;
};
type TProps = { index: number };
export const Tooth: FC<TProps> = ({
  index,
}) => {
  const { context, ready } =
    useContext();
  const configRef = useRef<null | TRef>(
    null
  );

  useEffect(() => {
    const init = async () => {
      console.log(context);
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
  const handleTap = () => {
    console.log("handleTap");
    console.log(
      ready,
      configRef.current
    );

    if (ready && configRef.current) {
      const {
        decay,
        gain,
        delay,
        depth,
        detune,
        span,
      } = CONFIG;

      const { current: ref } =
        configRef;

      console.log(ref);
      if (!ref.isOn) {
        ref.isOn = true;
        ref.o.start();
      }

      const t = context.currentTime;
      const bpm = 100;
      const e = t + 60 / bpm;

      const midi = 60;
      const f = midi2Freq(midi);

      ref.o.frequency.linearRampToValueAtTime(
        f,
        e
      );
      ref.o.detune.value = detune;
      ref.o.type = "triangle";

      ref.d.delayTime.value = delay;
      ref.g2.gain.value = decay;

      if (!ref.isOn) {
        ref.isOn = true;
        ref.n = new AudioWorkletNode(
          context,
          "noise-white"
        );
        ref.o.start(t);
      }

      if (ref.n) {
        ref.n.connect(ref.g2);
        ref.n.parameters
          .get("gain")
          .setValueAtTime(depth, t);
        ref.n.parameters
          .get("gain")
          .exponentialRampToValueAtTime(
            0.001,
            e
          );
      }
      ref.o.connect(ref.d);

      ref.d.connect(ref.g2);
      ref.g2.connect(ref.d);

      ref.g3
        .connect(ref.d)
        .connect(context.destination);

      ref.g2.gain.setValueAtTime(
        gain,
        t
      );
      ref.g2.gain.linearRampToValueAtTime(
        0,
        e
      );

      ref.g3.gain.setValueAtTime(
        decay,
        t
      );
      ref.g3.gain.linearRampToValueAtTime(
        0,
        e
      );
    }
  };
  return (
    <Root>
      <Button onTap={handleTap}>
        {index}
      </Button>
    </Root>
  );
};
