const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const worker = new Worker('worker.js');

const imageData = ctx.createImageData(2048, 2048);

const fpsDisplay = document.createElement('div');
fpsDisplay.style.position = 'absolute';
fpsDisplay.style.top = '10px';
fpsDisplay.style.left = '10px';
fpsDisplay.style.color = 'white';
fpsDisplay.style.fontSize = '18px';
fpsDisplay.style.background = 'rgba(0, 0, 0, 0.5)';
fpsDisplay.style.padding = '5px';
fpsDisplay.style.borderRadius = '5px';
document.body.appendChild(fpsDisplay);

worker.onmessage = (event) => {
    const { pixels, fps } = event.data;

    for (let i = 0; i < pixels.length; i++) {
        imageData.data[i] = pixels[i];
    }

    ctx.putImageData(imageData, 0, 0);

    fpsDisplay.textContent = `FPS: ${fps}`;
};

worker.postMessage({ width: 2048, height: 2048 });
