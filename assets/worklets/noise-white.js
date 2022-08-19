export class NoiseWhite extends AudioWorkletProcessor {
  constructor() {
    super();
    this.range = 2;
    this.gain = 0;
  }

  static get parameterDescriptors() {
    return [
      {
        name: "range",
        defaultValue: 2,
        minValue: 0,
        maxValue: 1000,
      },
      {
        name: "gain",
        defaultValue: 0,
        minValue: 0,
        maxValue: 1000,
      },
    ];
  }

  process(inputs, outputs, parameters) {
    this.range = parameters["range"][0];
    this.gain = parameters["gain"][0];

    const input = inputs[0];
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        let sample =
          Math.random() * this.range - 1 * this.range * 0.5;

        if (sample > 1.0) {
          sample = 1.0;
        } else if (sample < -1.0) {
          sample = -1.0;
        }

        channel[i] = sample * this.gain;
      }
    });
    return true;
  }
}

registerProcessor("noise-white", NoiseWhite);
