import {
    Canvas3DWebGLParams
} from '@typs/engine'

export class Canvas3D {
    static WebGL(options: Canvas3DWebGLParams) {
        const canvas = _CreateCanvas(options.width, options.height);
        document.body.appendChild(canvas);

        return canvas.getContext('webgl2')!;
    }
}

/**
 * 创建canvas-2d
 * @param {Number} width 创建canvas的配置
 * @param {Number} height 创建canvas的配置
 * @returns HTMLCanvasElement
 */
function _CreateCanvas(width: number, height: number) {
    const canvas = document.createElement('canvas');
    const dpr = devicePixelRatio || 1;

    canvas.width = dpr * width;
    canvas.height = dpr * height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    return canvas;
};
