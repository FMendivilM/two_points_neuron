class ANN{
    constructor(entry, hidden, exit, bias) {
        this.layers = [entry, hidden, exit];
        this.bias = bias;
        this.weights_h = Array(entry)
          .fill()
          .map(() =>
            Array(hidden)
              .fill()
              .map(() => randomNumber(1, -1))
          );
        this.weights_e = Array(hidden)
          .fill()
          .map(() =>
            Array(exit)
              .fill()
              .map(() =>randomNumber(1, -1))
          );
        this.bias_h = Array.from({ length: hidden }, () =>
          randomNumber(1, -1)
        );
        this.bias_e = Array.from({ length: exit }, () =>
          randomNumber(1, -1)
        );
        this.exits_h = Array(hidden);
        this.exits_e = Array(exit);
      }
    
      classify(x) {
        this.exits_h = this.calculateOutputs(
          x,
          this.layers[0],
          this.layers[1],
          this.weights_h,
          this.bias_h
        );
        this.exits_e = this.calculateOutputs(
          this.exits_h,
          this.layers[1],
          this.layers[2],
          this.weights_e,
          this.bias_e
        );
        return this.exits_e.map((e) => Math.round(e))
      }
    
      train(x, values) {
        let adjust_e = Array(this.layers[2]);
        let adjust_h = Array(this.layers[1]);
    
        this.classify(x);
        for (let i = 0; i < this.layers[2]; i++) {
          adjust_e[i] =
            (values[i] - Math.round(this.exits_e[i])) *
            dSigmoid(this.exits_e[i]);
        }
        for (let i = 0; i < this.layers[1]; i++) {
          let err = 0;
          for (let j = 0; j < this.layers[2]; j++)
            err += this.weights_e[i][j] * adjust_e[j];
          adjust_h[i] = err * dSigmoid(this.exits_h[i]);
        }
        this.bias_e = this.updateBias(this.bias_e, adjust_e);
        this.bias_h = this.updateBias(this.bias_h, adjust_h);
        this.weights_e = this.updateWeights(this.weights_e, adjust_e, this.exits_h);
        this.weights_h = this.updateWeights(this.weights_h, adjust_h, x);
      }
    
      calculateOutputs(x, width, height, weights, bias) {
        let outputs = [];
        let res;
        for (let i = 0; i < height; i++) {
          res = bias[i];
          for (let j = 0; j < width; j++) {
            res += x[j] * weights[j][i];
          }
          outputs[i] = sigmoid(res);
        }
        return outputs;
      }
    
      updateBias(bias, adjust) {
        return bias.map((e, i) => e + this.bias * adjust[i]);
      }
    
    
      updateWeights(weights, adjust, entry) {
        return Array(entry.length)
          .fill()
          .map((_, i) =>
            Array(adjust.length)
              .fill()
              .map((_, j) => weights[i][j] + entry[i] * adjust[j] * this.bias)
          );
      }
}