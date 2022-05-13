#version 300 es
precision highp float;

in vec4 color;
out vec4 fragColor;

void main() {
    // fragColor = vec4(1.0, 1.0, 1.0, 1.0);
    fragColor = color;
}