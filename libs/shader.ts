export function loadShader(
    gl: WebGL2RenderingContext,
    type: number,
    source: string
): WebGLShader {
    const shader = gl.createShader(type)!;

    // Send the source to the shader program
    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);

        return null!;
    }

    return shader;
}

export function initShaderProgram(
    gl: WebGL2RenderingContext,
    vxSource: string,
    fxSource: string
): WebGLProgram {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vxSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fxSource);

    // 创建着色器程序
    const shaderProgram = gl.createProgram()!;
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // 创建失败
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null!;
    }

    return shaderProgram
}


export function initBuffer(
    gl: WebGL2RenderingContext,
    points: number[]
) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    return positionBuffer!;
}