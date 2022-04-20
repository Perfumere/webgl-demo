/// <reference types="vite/client" />

declare module '*.vert' {
    const result: string;
    export default result;
}

declare module '*.frag' {
    const result: string;
    export default result;
}