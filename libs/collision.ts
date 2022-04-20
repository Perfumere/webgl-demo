interface BoundingBox2D {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface BoundingBox3D extends BoundingBox2D {
    z: number;
    depth: number;
}

// 获取元素的包围盒
export class Util {

    /**
     * 获取3D物体的包围盒, 默认右手系 Z轴朝向屏幕外
     * @param {number[]} points 点坐标值数组
     * @param {*} stride 步进值
     * @param {*} reverseZ 是否反转Z轴
     */
    static getBoundingBox3D(points, stride = 3): BoundingBox3D {
        const boundingBox = {
            x: 0,
            y: 0,
            z: 0,
            width: 1,
            height: 1,
            depth: 1
        };
    
        if (!points.length) {
            return boundingBox;
        }

        let maxX = points[0],
            minX = points[0];
        let maxY = points[1],
            minY = points[1];
        let maxZ = points[2],
            minZ = points[2];

        let idx = stride;
        while (idx < points.length) {
            maxX = Math.max(maxX, points[idx]);
            maxY = Math.max(maxY, points[idx + 1]);
            maxZ = Math.max(maxZ, points[idx + 2]);
            minX = Math.min(minX, points[idx]);
            minY = Math.min(minY, points[idx + 1]);
            minZ = Math.min(minZ, points[idx + 2]);

            idx += stride;
        }

        boundingBox.x = minX;
        boundingBox.y = minY;
        boundingBox.z = minZ;
        boundingBox.width = Math.abs(maxX - minX);
        boundingBox.height = Math.abs(maxY - minY);
        boundingBox.depth = Math.abs(maxZ - minZ);

        return boundingBox;
    }

    static getBoundingBox2D(points, stride = 2): BoundingBox2D {
        const boundingBox = {
            x: 0,
            y: 0,
            width: 1,
            height: 1
        };

        if (!points.length) {
            return boundingBox;
        }

        let maxX = points[0],
            minX = points[0];
        let maxY = points[1],
            minY = points[1];

        let idx = stride;
        while (idx < points.length) {
            maxX = Math.max(maxX, points[idx]);
            maxY = Math.max(maxY, points[idx + 1]);
            minX = Math.min(minX, points[idx]);
            minY = Math.min(minY, points[idx + 1]);

            idx += stride;
        }

        boundingBox.x = minX;
        boundingBox.y = minY;
        boundingBox.width = Math.abs(maxX - minX);
        boundingBox.height = Math.abs(maxY - minY);

        return boundingBox;
    }
}

export class QuadTree {
    public level: number;
    public bounds: QuadTree[];
    public elements: BoundingBox2D[];

    // 依据当前场景中的物体数量而定, 层级超出时完成树的建立
    static MAX_LEVEL = 8;

    // 叶子节点所能容纳的最大物体数量
    static MAX_CAPACITY = 10;

    static setMaxLevel(level) {
        if (!level || typeof level !== 'number') {
            return;
        }

        QuadTree.MAX_LEVEL = level;
    }

    static setMaxCapacity(capacity) {
        if (!capacity || typeof capacity !== 'number') {
            return;
        }

        QuadTree.MAX_CAPACITY = capacity;
    }

    /**
     * element 边界盒
     * {x, y, width, height, id}
     */
    constructor(element) {

        // 当前节点的深度
        this.level;

        // 当前节点的子区域
        this.bounds = [];

        // 当前节点存储的物体
        this.elements = [];
    }

    // 插入节点
    insertNode(node) {}

    // 获取待插入元素出现在当前界限的区域
    getBounds() {}

    // 检测包围盒相交
    checkIntersection() {}

    // 当前节点划分区域
    devideBounds() {}
}