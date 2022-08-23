export class Moog extends AudioWorkletProcessor {
  constructor() {
    super();
    this.cutoff = 0.065; // between 0.0 and 1.0
    this.resonance = 3.99; // between 0.0 and 4.0
    this.offset = 0.3;
  }

  static get parameterDescriptors() {
    return [
      {
        name: "cutoff",
        defaultValue: 0.065,
        minValue: 0,
        maxValue: 1,
      },
      {
        name: "resonance",
        defaultValue: 3.99,
        minValue: 0,
        maxValue: 4,
      },
      {
        name: "offset",
        defaultValue: 0.3,
        minValue: 0,
        maxValue: 1,
      },
    ];
  }

  process(inputs, outputs, parameters) {
    this.cutoff =
      parameters["cutoff"][0];
    this.resonance =
      parameters["resonance"][0];
    this.offset =
      parameters["offset"][0];

    const input = inputs[0];
    const output = outputs[0];

    let in1,
      in2,
      in3,
      in4,
      out1,
      out2,
      out3,
      out4;
    in1 =
      in2 =
      in3 =
      in4 =
      out1 =
      out2 =
      out3 =
      out4 =
        0.0;

    const f = this.cutoff * 1.16;
    const fb =
      this.resonance *
      (1.0 - 0.15 * f * f);

    for (
      let i = 0;
      i < output.length;
      ++i
    ) {
      jloop: for (
        let j = 0;
        j < output[i].length;
        ++j
      ) {
        if (!input[i]) break jloop;
        input[i][j] -= out4 * fb;
        input[i][j] *=
          0.35013 * (f * f) * (f * f);
        out1 =
          input[i][j] +
          this.offset * in1 +
          (1 - f) * out1; // Pole 1
        in1 = input[i][j];
        out2 =
          out1 +
          this.offset * in2 +
          (1 - f) * out2; // Pole 2
        in2 = out1;
        out3 =
          out2 +
          this.offset * in3 +
          (1 - f) * out3; // Pole 3
        in3 = out2;
        out4 =
          out3 +
          this.offset * in4 +
          (1 - f) * out4; // Pole 4
        in4 = out3;
        output[i][j] = out4;
      }
    }

    return true;
  }
}

registerProcessor("moog", Moog);
