const p5 = require('node-p5');



const drawFlower = (p) => {
    p.background(
        p.random(50, 255),
        p.random(50, 255),
        p.random(50, 255)
    );
    p.text('hello world!', 50, 100);
}

function sketch(p) {
    p.setup = () => {
        let canvas = p.createCanvas(1024, 1024);

        drawFlower(p);

        p.saveCanvas(canvas, 'build/flower', 'jpg').then(filename => {
            console.log(`saved the canvas as ${filename}`);
        });
        p.noLoop();
    }

}

console.log("Start")
let p5Instance = p5.createSketch(sketch);
