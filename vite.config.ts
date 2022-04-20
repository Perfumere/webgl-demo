import { defineConfig, Plugin } from "vite";
import { resolve } from 'path';

const glslImported: Plugin = {
    name: 'vite-plugin-glsl-imported',
    transform(code: string, id: string) {
        if (!id.endsWith('.frag') && !id.endsWith('.vert')) {
            return null;
        }

        return `export default ${JSON.stringify(code)}`
    }
};

export default defineConfig({
    resolve: {
        alias: {
            "@libs": resolve(__dirname, 'libs'),
            "@typs": resolve(__dirname, '@types'),
            '@': resolve(__dirname, 'src')
        }
    },
    plugins: [glslImported]
});