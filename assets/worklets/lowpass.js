export class LowpassProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.lastOut = 0;
    this.range = 0.5;
  }
 
  static get parameterDescriptors() {
    return [
      {
        name: "range",
        defaultValue: 0.5,
        minValue: 0,
        maxValue: 100,
      }
    ];
  }

  process(inputs, outputs, parameters) {
    this.range = parameters["range"][0];

    const input = inputs[0];
    const output = outputs[0];

    for (let i = 0; i < output.length; ++i) {
      jloop: for (let j = 0; j < output[i].length; ++j) {
        if (!input[i]) break jloop;
        output[i][j] = (input[i][j] + this.lastOut) * this.range;
        this.lastOut = output[i][j];
      }
    }
    return true;
  }
}

registerProcessor("lowpass", LowpassProcessor);
