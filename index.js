const p5 = require('node-p5');

class Path {
    constructor(p) {
        this.p = p;
        this.points = [];
        const center = p.createVector(0.5, 0.5);

        const startAngle = p.random(0, 360);
        const pointCount = p.random(15, 42);
        const stepSize = 360 / pointCount;
        for (var i = 0; i < pointCount - 1; i++) {
            var offset = p.createVector(0, -1);
            offset.rotate((startAngle + i * stepSize) + p.random(-stepSize / 4, stepSize / 4));
            offset.mult(p.random(0.3, 0.45));
            this.points.push(p.Vector.add(center, offset));
        }
        const numpoints = this.points.length;
        this.points.push(this.points[0]); // First and last Point should be the same
        this.points.push(this.points[1]);
        this.points.unshift(this.points[numpoints - 1]);
    }

    getAt(t) {
        if (t > 1) {
            t = 1;
        }
        // ignore first and last point
        // between n points there are n-1 intervals
        const numberOfIntervals = this.points.length - 2 - 1;
        const lengthOfInterval = 1 / numberOfIntervals;

        var currentInterval = int(t / lengthOfInterval);
        if (currentInterval >= numberOfIntervals) {
            currentInterval = numberOfIntervals - 1;
        }

        // console.log(t, currentInterval)

        //TODO start index needs to be calculated
        const startIndex = currentInterval + 1;
        const prev = this.points[startIndex - 1];
        const p1 = this.points[startIndex];
        const p2 = this.points[startIndex + 1];
        const next = this.points[startIndex + 2];

        //TODO t needs to be scales to interval lenght
        var tInInterval = (t - (currentInterval * lengthOfInterval)) / lengthOfInterval;
        const x = this.p.curvePoint(prev.x, p1.x, p2.x, next.x, tInInterval);
        const y = this.p.curvePoint(prev.y, p1.y, p2.y, next.y, tInInterval);
        return this.p.createVector(x, y);
    }

}


const drawFlower = (p) => {
    console.log("FEZ")
    p.background(255);
    var path = new Path(p);

    // Define colors
    var red = 0;
    var green = 0;
    var blue = 0;


    if (p.random() < 0.3) {
        red = p.random(10, 42);
        green = p.random(10, 42);
        blue = p.random(10, 42);

        const r = p.random(0, 4);
        if (r < 1) {
            red = p.random(10, 222);
        }
        else if (r > 1 && r < 2) {
            green = p.random(10, 222);
        }
        else if (r > 2 && r < 3) {
            blue = p.random(10, 222);
        }
    }

    p.stroke(red, green, blue, 10);
    p.fill(red, green, blue, 100 / sizeMultiplier);

    // Define inner Lines
    goalOffset = [];
    for (var i = 0; i < int(p.random(2, 10)); i++) {
        goalOffset.push(p.random(0.3, 0.7));
    }

    for (var t = 0; t < 1; t += 0.01) {
        const p1 = path.getAt(t);
        p.circle(p1.x * imgHeight, p1.y * imgHeight, sizeMultiplier * 5);

        for (var offset of goalOffset) {

            var tGoal = t + offset;
            if (tGoal > 1) {
                tGoal--;
            }
            var p2 = path.getAt(tGoal);
            p.line(p1.x * imgHeight, p1.y * imgHeight, p2.x * imgHeight, p2.y * imgHeight)
        }
    }
}


function sketch(p) {
    p.setup = () => {
        let canvas = p.createCanvas(1024, 1024);

        console.log("Start drawing")
        drawFlower(p);
        console.log("Done drawing")

        p.saveCanvas(canvas, 'build/flower', 'jpg').then(filename => {
            console.log(`saved the canvas as ${filename}`);
        });
        p.noLoop();
    }

}


let p5Instance = p5.createSketch(sketch);
