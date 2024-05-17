const tf = require('@tensorflow/tfjs-node');
const express = require('express');
const Upscaler = require('upscaler/node'); // if using @tensorflow/tfjs-node-gpu, change this to upscaler/node-gpu
const model = require('@upscalerjs/maxim-denoising');

const upscaler = new Upscaler({
  model,
});

const app = express();

app.get('/', async (req, res) => {
  const image = tf.node.decodeImage(fs.readFileSync('./fixture.png'), 3);
  const tensor = await upscaler.upscale(image);
  const upscaledTensor = await tf.node.encodePng(tensor);
  fs.writeFileSync('output.png', upscaledTensor);

  // dispose the tensors!
  image.dispose();
  tensor.dispose();
  upscaledTensor.dispose();
  res.sendFile('output.png');
});

app.listen(3000);
