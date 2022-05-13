import {
    Scene,
    Component
} from '@libs/engine';
import {
    initShaderProgram,
    initBuffer
} from '@libs/shader';

import { mat4 } from 'gl-matrix';
import vxCode from '@/demo-shader/common.vert';
import fxCode from '@/demo-shader/common.frag';
import cubeModel from '@/model/cube';

const scene = new Scene({
    sceneName: 'A',
    canvasOpt: {
        width: 400,
        height: 400
    }
});

const cubic = new Component(cubeModel);

const { gl } = scene;
const program = initShaderProgram(gl, vxCode, fxCode);
const location0 = gl.getAttribLocation(program, 'vPosition');
const location1 = gl.getAttribLocation(program, 'vColor');
const uniform1 = gl.getUniformLocation(program, 'modelViewMat');
const uniform2 = gl.getUniformLocation(program, 'projectMat');

const rotateMat = mat4.create();

initBuffer(gl, cubic.points);

gl.useProgram(program);

gl.clearColor(0, 0, 0, 1);
gl.clearDepth(1);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

gl.vertexAttribPointer(
    location0,
    3,
    gl.FLOAT,
    false,
    4 * 6,
    0
);
gl.enableVertexAttribArray(location0);

gl.vertexAttribPointer(
    location1,
    3,
    gl.FLOAT,
    false,
    4 * 6,
    4 * 3
);
gl.enableVertexAttribArray(location1);

gl.uniformMatrix4fv(
    uniform1,
    false,
    mat4.rotateY(rotateMat, rotateMat, 100 / Math.PI)
);
gl.uniformMatrix4fv(
    uniform2,
    false,
    [
        0.5, 0, 0, 0,
        0, 0.5, 0, 0,
        0, 0, 0.5, 0,
        0, 0, 0, 1,
    ]
);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 36);

scene.addComponent(cubic, 'cubic');

console.log(scene);

(() => {
    function framework() {
        gl.uniformMatrix4fv(
            uniform1,
            false,
            mat4.rotateY(rotateMat, rotateMat, 120 / Math.PI)
        );

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        requestAnimationFrame(framework);
    }

    framework(); 
})();