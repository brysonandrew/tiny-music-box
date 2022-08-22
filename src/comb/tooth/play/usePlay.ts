import type { MutableRefObject } from "react";
import { useRef } from "react";
import { FROM_KEY } from "../../../config";
import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";
import { midiToFreq } from "../../../utils";
const STOP_BUFFER = 0.02; //tweak this if clicks are heard when stopping oscillator
const GAIN_MULTIPLIER = 2; //tweak this to go outside of 0 - 100%

export const usePlay = () => {
  // HOOKS
  const { dispatch, lastMidi } =
    useContext();
  const { d, w, midi } =
    useToothContext();

  const {
    context,
    merger,
    tweak: { delay },
    adsr: {
      gain,
      attack,
      decay,
      sustain,
      release,
    },
  } = useContext();
  // ~

  if (midi !== lastMidi) return null; // gate prevent play triggered twice (by different midi)

  const t = context.currentTime;

  // INITIALIZE PASS
  const o = new OscillatorNode(
    context,
    { type: "triangle" }
  );

  const frequency = midiToFreq(midi);
  o.frequency.setValueAtTime(
    frequency,
    t
  );

  const g = context.createGain();
  o.connect(g);
  o.start(t);

  g.gain.setValueAtTime(0, t);
  g.connect(context.destination);
  // const inputNumber = midi - FROM_KEY;
  // console.dir(merger);
  // g.connect(merger, 0, inputNumber);
  // ~

  // ATTACK
  const a = attack;
  const start = t + a;
  g.gain.linearRampToValueAtTime(
    gain * GAIN_MULTIPLIER,
    start
  );
  //~

  // DECAY
  const ad = a + decay;
  g.gain.linearRampToValueAtTime(
    sustain,
    t + ad
  );
  //~

  // SUSTAIN
  const ads = attack + decay + sustain;
  g.gain.linearRampToValueAtTime(
    sustain,
    t + ads
  );
  //~

  // RELEASE
  const adsr =
    attack + decay + sustain + release;
  const end = t + adsr;
  g.gain.setTargetAtTime(0, end, 0.01);
  o.stop(t + adsr + STOP_BUFFER);
  //~

  // CLEAN-UP
  o.onended = () => {
    g.disconnect();
    dispatch({
      type: "midis",
      value: [midi, false],
    });
  };
  //~
};
