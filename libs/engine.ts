import { nanoid } from "nanoid";
import { Canvas3D } from "./canvas";
import {
    Canvas3DWebGLParams
} from '../@types/engine'

interface SceneInitParams {
    sceneName?: string;
    canvasOpt: Canvas3DWebGLParams;
}

interface ComponentInitParams {
    name: string;
    points: number[];
}

export class Scene {
    public sceneName: string;
    public gl: WebGL2RenderingContext;
    public components: Record<string, Record<string, Component>>;

    static sceneList: Map<string, Scene> = new Map();

    static addSceneName(name: string, scene: Scene) {
        if (Scene.sceneList.get(name)) {
            throw new Error(`sceneName ${name} already exists`);
        }

        Scene.sceneList.set(name, scene);
    }

    static delSceneName(name: string) {
        Scene.sceneList.delete(name);
    }

    constructor(options: SceneInitParams) {
        this.sceneName = options.sceneName || nanoid(6);
        this.gl = Canvas3D.WebGL(options.canvasOpt);
        this.components = Object.create(null);

        Scene.addSceneName(this.sceneName, this);
    }

    getComponent(target: Component | string) {
        if (target instanceof Component) {
            return target;
        }

        const name = target.split('_')[1];

        if (!this.components[name]) {
            return null;
        }

        return this.components[name][target];
    }

    addComponent(component: Component, id: string) {
        if (!this.components[component.name]) {
            this.components[component.name] = Object.create(null);
        }

        component.__sceneId = `${this.sceneName}_${component.name}_${id}`;

        this.components[component.name][component.__sceneId] = component;
    }

    removeComponent(target: Component | string) {
        if (target instanceof Component) {
            if (!this.components[target.name]) {
                return;
            }

            Reflect.deleteProperty(this.components[target.name], target.__sceneId!);
            target.__sceneId = undefined;

            return;
        }

        const name = target.split('_')[1];

        Reflect.deleteProperty(this.components[name], target)
    }

    renameId(component: Component, id: string) {
        if (!component.__sceneId) {
            return;
        }

        this.removeComponent(component);
        this.addComponent(component, id);
    }

    draw() {
        for (const compName in this.components) {
            for (const component of Object.values(this.components[compName])) {
                console.log(component)
            }
        }
    }

    clear() {
        this.components = {};
    }

    destory() {
        Scene.delSceneName(this.sceneName);
    }
}

export class Component {
    public name: string = '';
    public __sceneId?: string;
    public points: number[] = [];

    constructor(options: ComponentInitParams) {
        const component = Object.create(null);

        // CHECK OPTIONS
        component.name = options.name;
        component.points = options.points || [];

        return component;
    }
}
