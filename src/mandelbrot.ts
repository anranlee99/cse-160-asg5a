

// Function to calculate Mandelbrot
function mandelbrot(x: number, y: number, MAX_ITER: number): number {
    let zx = 0;
    let zy = 0;
    let iter = 0;
    while (zx * zx + zy * zy < 4 && iter < MAX_ITER) {
        let temp = zx * zx - zy * zy + x;
        zy = 2.0 * zx * zy + y;
        zx = temp;
        iter++;
    }
    return iter;
}

// Rendering the Mandelbrot set
export function renderMandelbrot() {
    // Initialize the canvas and its context
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const WIDTH = 1024;
    const HEIGHT = 1024;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    // document.body.appendChild(canvas); // Add canvas to the document

    // Constants and setup for Mandelbrot calculation
    const MAX_ITER = 100;
    const REAL_SET = { start: -2, end: 1 };
    const IMAGINARY_SET = { start: -1, end: 1 };
    for (let pixelY = 0; pixelY < HEIGHT; pixelY++) {
        let y = IMAGINARY_SET.start + (pixelY / HEIGHT) * (IMAGINARY_SET.end - IMAGINARY_SET.start);
        for (let pixelX = 0; pixelX < WIDTH; pixelX++) {
            let x = REAL_SET.start + (pixelX / WIDTH) * (REAL_SET.end - REAL_SET.start);
            let m = mandelbrot(x, y, MAX_ITER);
            let color = (m === MAX_ITER) ? '#000' : `hsl(${m * 3.6}, ${m}%, ${m / MAX_ITER * 100}%)`;
            ctx.fillStyle = color;
            ctx.fillRect(pixelX, pixelY, 1, 1);
        }
    }
    return canvas;
}
