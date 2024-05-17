const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');
const Upscaler = require('upscaler/node'); // if using @tensorflow/tfjs-node-gpu, change this to upscaler/node-gpu
const model = require('@upscalerjs/maxim-denoising');

async function main() {

  const upscaler = new Upscaler({
    model,
  });
  const image = tf.node.decodeImage(fs.readFileSync('./fixture.png'), 3);
  const tensor = await upscaler.upscale(image);
  const upscaledImage = await tf.node.encodePng(tensor);

  // dispose the tensors!
  image.dispose();
  tensor.dispose();

  fs.writeFileSync('./output.png', upscaledImage);
}

main();
