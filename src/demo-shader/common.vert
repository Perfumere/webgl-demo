#version 300 es
precision highp float;

layout (location = 0) in vec4 vPosition;
layout (location = 1) in vec4 vColor;
uniform mat4 modelViewMat;
uniform mat4 projectMat;

out vec4 color;

void main() {
    gl_Position = projectMat * modelViewMat * vPosition;
    // gl_Position = modelViewMat * vPosition;
    // gl_Position = vPosition;

    color = vColor;
    // gl_PointSize = 2.0;
}