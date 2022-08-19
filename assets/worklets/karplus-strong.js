class KarplusStrong extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: "gain", defaultValue: 0.9, minValue: -1, maxValue: 1 },
      {
        name: "delayTime",
        defaultValue: 10,
        minValue: 0,
        maxValue: 1000,
      },
      // {
      //   name: "frequency",
      //   defaultValue: 100,
      //   minValue: 0,
      //   maxValue: 440,
      // },
    ];
  }

  constructor() {
    super();
    this.Buffer = new Array(48000).fill(0);
    this.ReadPtr = 0;
    this.WritePtr = 0;
    this.delayTime = 10;
    this.gain = 0.9;
    // this.frequency = 100;
  }

  process(inputs, outputs, parameters) {
    this.delayTime = parameters["delayTime"][0];
    this.gain = parameters["gain"][0];
    // this.frequency = parameters["frequency"][0];

    const delaySamples = Math.round(
      (sampleRate * this.delayTime) / 1000
    );
    const bufferSize = this.Buffer.length;
    const input = inputs[0];
    const output = outputs[0];

    for (let i = 0; i < output.length; ++i) {
      jloop: for (let j = 0; j < output[i].length; ++j) {
        if (!input[i]) break jloop;
        output[i][j] =
          this.gain * this.Buffer[this.ReadPtr] + input[i][j];
        this.Buffer[this.WritePtr] = output[i][j];
        this.WritePtr++;
        if (this.WritePtr >= bufferSize)
          this.WritePtr = this.WritePtr - bufferSize;
        this.ReadPtr = this.WritePtr - delaySamples;
        if (this.ReadPtr < 0)
          this.ReadPtr = this.ReadPtr + bufferSize;
      }
    }
    return true;
  }
}

registerProcessor("karplus-strong", KarplusStrong);
