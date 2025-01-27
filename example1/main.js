const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const worker = new Worker('worker.js');

const imageData = ctx.createImageData(512, 512);

worker.onmessage = (event) => {
    const pixels = event.data;

    for (let i = 0; i < pixels.length; i++) {
        imageData.data[i] = pixels[i];
    }

    ctx.putImageData(imageData, 0, 0);
};
//The parameter is required to start the worker.
worker.postMessage({ width: 512, height: 512 });
