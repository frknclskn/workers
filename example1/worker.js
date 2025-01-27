self.onmessage = (event) => {
    const { width, height } = event.data;
    const totalPixels = width * height * 4; ///RGBA
    const pixels = new Uint8ClampedArray(totalPixels);

    let shift = 0;

    const updatePixels = () => {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;

                pixels[index] = (x + shift) % 256;
                pixels[index + 1] = (y + shift) % 256;
                pixels[index + 2] = (x + y + shift) % 256;
                pixels[index + 3] = 255;
            }
        }

        shift = (shift + 1) % 256;

        self.postMessage(pixels);

        setTimeout(updatePixels, 16); //  1000/16 = 62.5 FPS (~60)
    };

    updatePixels();
};
