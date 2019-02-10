let functionNumber = 0;

document.querySelectorAll("input").forEach(radio => {
    radio.addEventListener("click", radioChange)
})

function radioChange(e) {
    functionNumber = this.value
}

let noiseFunctions = [
    perlinBasic,
    perlinAnimated,
    simplexBasic,
    simplexAnimated,
    perlinCloud,
    simplexCloud,
    goo,
    sinMaze,
    stainedGlass,
    brainScan,
    bloodCells
];

function perlinBasic(x, y, z) {
    let v1 = noise.perlin3(x / 40, y / 40, z);

    let data = {
        color: {
            r: 127 + 127 * v1,
            g: 127 + 127 * v1,
            b: 127 + 127 * v1,
            a: 255
        },
        meshDisplacement: v1,
        zInc: 0,
        boxHeight: 2
    }

    return data;
}

function perlinAnimated(x, y, z) {
    let v1 = noise.perlin3(x / 40, y / 40, z);

    let data = {
        color: {
            r: 255 + 127 * v1,
            g: 127 + 127 * v1,
            b: 127 + 127 * v1,
            a: 255
        },
        meshDisplacement: v1,
        zInc: .09,
        boxHeight: 2
    }

    return data;
}

function simplexBasic(x, y, z) {
    let v1 = noise.simplex3(x / 40, y / 40, z);

    let data = {
        color: {
            r: 127 + 127 * v1,
            g: 127 + 127 * v1,
            b: 127 + 127 * v1,
            a: 255
        },
        meshDisplacement: v1,
        zInc: 0,
        boxHeight: 2
    }

    return data;
}

function simplexAnimated(x, y, z) {
    let v1 = noise.simplex3(x / 40, y / 40, z);

    let data = {
        color: {
            r: 127 + 127 * v1,
            g: 200 + 127 * v1,
            b: 127 + 127 * v1,
            a: 255
        },
        meshDisplacement: v1,
        zInc: .08,
        boxHeight: 2
    }

    return data;
}

function perlinCloud(x, y, z) {
    let v1 = noise.perlin3(x / 5, y / 5, z);
    let v2 = noise.perlin3(x / 10, y / 10, z);
    let v3 = noise.perlin3(x / 20, y / 20, z);
    let v4 = noise.perlin3(x / 40, y / 30, z);
    let v5 = noise.perlin3(x / 70, y / 80, z);
    let v6 = noise.perlin3(x / 160, y / 150, z);
    let v7 = noise.perlin3(x / 310, y / 320, z);
    let v8 = noise.perlin3(x / 640, y / 630, z);

    v1 = (1 + v1) / 2;
    v2 = (1 + v2) / 2;
    v3 = (1 + v3) / 2;
    v4 = (1 + v4) / 2;
    v5 = (1 + v5) / 2;
    v6 = (1 + v6) / 2;
    v7 = (1 + v7) / 2;
    v8 = (1 + v8) / 2;

    let va = (5 * v1 + 10 * v2 + 20 * v3 + 40 * v4 + 60 * v5 + 80 * v6 + 60 * v7 + 50 * v8) / 250;

    let data = {
        color: {
            r: 255 * va,
            g: 255 * va,
            b: 255 * va,
            a: 255
        },
        meshDisplacement: va * 6 - 4,
        zInc: .02,
        boxHeight: 4
    }

    return data;
}

function simplexCloud(x, y, z) {
    let v1 = noise.simplex3(x / 5, y / 5, z);
    let v2 = noise.simplex3(x / 10, y / 10, z);
    let v3 = noise.simplex3(x / 20, y / 20, z);
    let v4 = noise.simplex3(x / 40, y / 30, z);
    let v5 = noise.simplex3(x / 70, y / 80, z);
    let v6 = noise.simplex3(x / 160, y / 150, z);
    let v7 = noise.simplex3(x / 310, y / 320, z);
    let v8 = noise.simplex3(x / 640, y / 630, z);

    v1 = (1 + v1) / 2;
    v2 = (1 + v2) / 2;
    v3 = (1 + v3) / 2;
    v4 = (1 + v4) / 2;
    v5 = (1 + v5) / 2;
    v6 = (1 + v6) / 2;
    v7 = (1 + v7) / 2;
    v8 = (1 + v8) / 2;

    let va = (5 * v1 + 10 * v2 + 20 * v3 + 40 * v4 + 60 * v5 + 80 * v6 + 60 * v7 + 50 * v8) / 250;

    let data = {
        color: {
            r: 255 * va,
            g: 255 * va,
            b: 255 * va,
            a: 255
        },
        meshDisplacement: va * 4 - 3,
        zInc: .02,
        boxHeight: 4
    }

    return data;
}

function sinMaze(x, y, z) {
    let v1 = noise.simplex3(x / 310, y / 310, z);

    let data = {
        color: {
            r: 200 - 127 * Math.min(Math.max(Math.sin(v1 * 30), .1), .9),
            g: 230 - 127 * Math.min(Math.max(Math.sin(v1 * 30), .1), .9),
            b: 255 - 127 * Math.min(Math.max(Math.sin(v1 * 30), .1), .9),
            a: 255
        },
        meshDisplacement: 4 * Math.min(Math.max(Math.sin(v1 * 30), .1), .9) - 1.75,
        zInc: .0005,
        boxHeight: 4
    }

    return data;
}

function stainedGlass(x, y, z) {   
    let v1 = noise.simplex3(x / 25, y / 25, z);
    let v2 = noise.perlin3(x / 85, y / 55, z);

    v1 = (v1 + 1) / Math.abs(v1 * 10);

    let data = {
        color: {
            r: 155 - 255 * v2,
            g: 255 - 255 * Math.sin(v1),
            b: 300 - 255 * Math.sin(v2 / 2),
            a: 255
        },
        meshDisplacement: Math.max(-.5, -Math.abs(Math.sin(v1 / 50) / 5) * 50), 
        zInc: .01,
        boxHeight: 1
    }

    return data;
}

function bloodCells(x, y, z) {
    let v1 = (Math.abs(noise.simplex3(x / 150, y / 150, z)) +
        Math.abs(noise.simplex3(x / 37, y / 37, z)) +
        (1.5 * noise.perlin3(x / 50, y / 50, z)) +
        Math.abs(3 * noise.simplex3(x / 12, y / 12, z))) / 2;

    let v2 = Math.abs(2 * noise.perlin3(x / 138, y / 138, z))
    let v3 = Math.abs(.8 * noise.perlin3(x / 190, y / 190, z))

    let data = {
        color: {
            r: (300 - 255 * v2 / v1) / 2,
            g: (255 - 255 * v2 / v2) / 2,
            b: (400 - 255 * v1 / v2),
            a: 255
        },
        meshDisplacement: v1 / 4 - .25,
        zInc: .02,
        boxHeight: 1
    }

    return data;
}

function brainScan(x, y, z) {
    let v1 = noise.perlin3(x / 40, y / 40, z * 2);
    let v2 = noise.perlin3(x / 80, y / 80, z / 2);
    let v3 = noise.perlin3(x / 16, y / 16, z / 5);
    let v4 = noise.perlin3(x / 320, y / 320, z / 50);

    v1 = Math.abs(5 * v1);
    v2 = Math.abs(10 * v2);
    v3 = Math.abs(15 * v3);
    v4 = Math.abs(20 * v4);

    let va = (v1 + v2 + v3 + v4) / 10;

    let data = {
        color: {
            r: 275 - 250 * Math.sin(1.2 * va),
            g: 255 - 255 * va + 800 * ((Math.cos(va) - Math.sin(1.2 * va)) / 4),
            b: 255 - 255 * Math.cos(va) / 2,
            a: 255
        },
        meshDisplacement: (Math.cos(va) - Math.sin(1.2 * va)) / 3,
        zInc: .04,
        boxHeight: 1
    }

    return data;
}

function stained2(x, y, z) {

    // let v1 = noise.simplex3((x + z * 15) / 25, y / 25, z);
    // let v2 = noise.perlin3((x + z * 15) / 85, y / 55, z);

    let separation = 15;

    let v1 = noise.simplex3((x) / 25, y / 25, z);
    let v2 = noise.perlin3(x / 85, y / 55, z);

    v1 = (v1 + 2) / Math.abs(v1 * separation)
    // v1 = (v1+2 ) / (v1 * separation)

    let data = {
        color: {
            r: (Math.max(-.5, -Math.abs(Math.sin(v1 / 50) / 5) * 50) > -.45) ? 155 - 255 * v2 : 0,
            g: (Math.max(-.5, -Math.abs(Math.sin(v1 / 50) / 5) * 50) > -.45) ? 265 - 255 * Math.sin(v1) : 0,
            b: (Math.max(-.5, -Math.abs(Math.sin(v1 / 50) / 5) * 50) > -.45) ? 300 - 255 * Math.sin(v2 / 2) : 0,
            a: 255
        },
        // meshDisplacement: Math.max(-.5, -Math.abs( Math.sin(v1/50)/5)*50),  
        meshDisplacement: Math.max(-.5, -Math.abs(Math.sin(v1 / 50) / 5) * 50),
        zInc: .01,
        boxHeight: 1
    }

    return data;

}

function goo(x, y, z) {

    let v1 = noise.simplex3((x) / 50, y / 50, z);
    let v2 = noise.perlin3(x / 50, y / 50, z);
    let v3 = noise.perlin3(x / 80, y / 80, z);

    let va = Math.max(Math.abs(v3 + 1) / 2, Math.abs(Math.sin(v1 * 5) * Math.cos(v2 * 10 + 1))) / 2;

    let data = {
        color: {
            r: Math.abs(127 * (v1 - va)),
            g: Math.abs(127 * (va - v2)),
            b: Math.abs(127 * (v3 - va)),
            a: 255
        },

        meshDisplacement: ((va - v1) + (v2 - va) + (va - v3)) / 2,
        zInc: .01,
        boxHeight: 2.25
    }

    return data;

}