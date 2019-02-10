// http://haptic-data.com/toxiclibsjs/

let z=1;

let w, h,
    box1, box2, box3, box4,
    ground;

let ctx = document.getElementById(`bg-perlin`).getContext('2d');
w = ctx.canvas.width;
h = ctx.canvas.height;

window.onload = function(){
    var canvas = document.getElementById("bg-babylon");
 
    // Check support
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
    } else {
        // Babylon is supported
        var engine = new BABYLON.Engine(canvas, true);
        var scene = createScene(engine);
 
        scene.activeCamera.attachControl(canvas);
 
        engine.runRenderLoop(function () {
            drawTexture(noiseFunctions[functionNumber]);
            scene.render();
        });
 
        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
    } 
};

var createScene = function (engine) {

    var scene  = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 30, new BABYLON.Vector3(0, 0,0), scene);

    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(50, 100, 100), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(10, 10, 15), scene);
    light2.intensity = 5;

    box1 = BABYLON.MeshBuilder.CreateBox("box", { width: 20.25, depth:.25 }, scene);
    box1.position = new BABYLON.Vector3(0, 0, 10);

    box2 = BABYLON.MeshBuilder.CreateBox("box", { width: 20.25, depth:.25 }, scene);
    box2.position = new BABYLON.Vector3(0, 0, -10);

    box3 = BABYLON.MeshBuilder.CreateBox("box", { width: .25, depth: 20 }, scene);
    box3.position = new BABYLON.Vector3(10, 0, 0);

    box4 = BABYLON.MeshBuilder.CreateBox("box", { width: .25, depth: 20 }, scene);
    box4.position = new BABYLON.Vector3(-10, 0, 0);

    ground = BABYLON.Mesh.CreateGround('ground1', 20, 20, w-1, scene, true);
    ground.material = new BABYLON.StandardMaterial("gmat", scene);

    return scene;
};

function drawTexture(noiseFunction) {

    // get the 3D ground plane vertices
    let groundVertices = ground.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    let vertexDataIndex = 0;

    // var colors = ground.getVerticesData(BABYLON.VertexBuffer.ColorKind);
    // if (!colors) colors=[];

    let colors = [];

    //  get the 2d canvas image pixels
    let canvasData = ctx.getImageData(0, 0, w, h);
    let canvasDataIndex = 0;

    let colorsBuffer = [];

    let data = {};

    for (x = 0; x < w; x++) {
        for (y = 0; y < h; y++) {
            // calculate base color index stored as (r,g,b,a)
            canvasDataIndex = (x + y * w) * 4;

            data = noiseFunction(x, y, z);
            // data = temp(x,y,z);

            // set color for 2D canvas image (0-255)
            canvasData.data[canvasDataIndex + 0] = data.color.r;
            canvasData.data[canvasDataIndex + 1] = data.color.g;
            canvasData.data[canvasDataIndex + 2] = data.color.b;
            canvasData.data[canvasDataIndex + 3] = data.color.a;

            // set color for 3D babylonjs canvas (0-1)
            colorsBuffer.push(data.color.r / 255);
            colorsBuffer.push(data.color.g / 255);
            colorsBuffer.push(data.color.b / 255);
            colorsBuffer.push(data.color.a / 255);


            colors[canvasDataIndex + 0] = data.color.r / 255;
            colors[canvasDataIndex + 1] = data.color.g / 255;
            colors[canvasDataIndex + 2] = data.color.b / 255;
            colors[canvasDataIndex + 3] = data.color.a / 255;


            // set y value of ground vertex data
            groundVertices[vertexDataIndex + 1] = data.meshDisplacement;

            vertexDataIndex = vertexDataIndex + 3;
        }
    }
    // update the 2D canvas image
    ctx.putImageData(canvasData, 0, 0);
    
    // update the 3D babylon ground plane
    ground.updateVerticesData(BABYLON.VertexBuffer.PositionKind, groundVertices);
    ground.setVerticesData(BABYLON.VertexBuffer.ColorKind, colorsBuffer);
    
    // apply custom increment to z
    z = z + data.zInc;

    // apply custom scale to the box around the ground plane
    scaleBox(data);
}

function scaleBox(data){
    if (data.boxHeight) {
        box1.scaling = new BABYLON.Vector3(1, data.boxHeight, 1);
        box2.scaling = new BABYLON.Vector3(1, data.boxHeight, 1);
        box3.scaling = new BABYLON.Vector3(1, data.boxHeight, 1);
        box4.scaling = new BABYLON.Vector3(1, data.boxHeight, 1);
    } else {
        box1.scaling = new BABYLON.Vector3(1, 1.5, 1);
        box2.scaling = new BABYLON.Vector3(1, 1.5, 1);
        box3.scaling = new BABYLON.Vector3(1, 1.5, 1);
        box4.scaling = new BABYLON.Vector3(1, 1.5, 1);  
    }
}
