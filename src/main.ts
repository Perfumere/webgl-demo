import {
    Scene,
    Component
} from '@libs/engine';
import {
    initShaderProgram,
    initBuffer
} from '@libs/shader';


import vxCode from '@/demo-shader/common.vert';
import fxCode from '@/demo-shader/common.frag'

const triangle = new Component(
    {
        name: 'triangle',
        points: [
            0, 0.5, 0,
            -0.5, -0.5, 0,
            0.5, -0.5, 0
        ]
    }
);

const rectangle = new Component(
    {
        name: 'rectangle',
        points: [
            -0.25, 0.25, 0,
            -0.25, -0.25, 0,
            0.25, -0.25, 0,
            0.25, 0.25, 0,
            -0.25, 0.25, 0,
            -0.25, -0.25, 0
        ]
    }
);

const scene = new Scene({
    sceneName: 'A',
    canvasOpt: {
        width: 400,
        height: 400
    }
});

const { gl } = scene;
const program = initShaderProgram(gl, vxCode, fxCode);
const location0 = gl.getAttribLocation(program, 'vPosition');
// initBuffer(gl, triangle.points);
initBuffer(gl, rectangle.points);

const stride = 3;

gl.clearColor(0, 0, 1, 1);
gl.clearDepth(1);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

gl.vertexAttribPointer(
    location0,
    stride,
    gl.FLOAT,
    false,
    0,
    0
);
gl.enableVertexAttribArray(
    location0
);

gl.useProgram(program);

// gl.uniformMatrix4fv();
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);

scene.addComponent(triangle, 'triangle');
scene.addComponent(rectangle, 'rectangle');



console.log(triangle)
// scene.draw();
console.log(scene);
