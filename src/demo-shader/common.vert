#version 300 es
precision highp float;

layout (location = 0) in vec4 vPosition;
// uniform mat4 modelViewMat;
// uniform mat4 projectMat;

void main() {
    // gl_Position = projectMat * modelViewMat * vPosition;
    gl_Position = vPosition;
    // gl_PointSize = 2.0;
}