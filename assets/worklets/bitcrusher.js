export class BitcrusherProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bits = 4;
    this.frequency = 0.1;
    this.step = Math.pow(1 / 2, this.bits);
  }

  static get parameterDescriptors() {
    return [
      { name: "bits", defaultValue: 8, minValue: 0, maxValue: 128 },
      {
        name: "frequency",
        defaultValue: 0.4,
        minValue: 0,
        maxValue: 1,
      },
    ];
  }

  process(inputs, outputs, parameters) {
    this.bits = parameters["bits"][0];
    this.frequency = parameters["frequency"][0];
    this.step = Math.pow(1 / 2, this.bits);
    let phaser = 0;
    let last = 0;

    const input = inputs[0];
    const output = outputs[0];

    for (let i = 0; i < output.length; ++i) {
      jloop: for (let j = 0; j < output[i].length; ++j) {
        if (!input[i]) break jloop;
        phaser += this.frequency;
        if (phaser >= 1.0) {
          phaser -= 1.0;
          last =
            this.step * Math.floor(input[i][j] / this.step + 0.5);
        }
        output[i][j] = last;
      }
    }
    return true;
  }
}

registerProcessor("bitcrusher", BitcrusherProcessor);
