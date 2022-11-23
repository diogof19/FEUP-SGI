export class MyComponent {
    constructor(
        sceneGraph,
        id,
        transfMatrix,
        materialIds,
        animation,
        textureInfo,
        highlightInfo,
        primitiveIds,
        componentIds,
        ) {
        this.sceneGraph = sceneGraph;
        this.id = id;
        this.transfMatrix = transfMatrix;
        this.materialIds = materialIds;
        this.textureInfo = textureInfo;
        this.animation = animation;
        this.highlightInfo = highlightInfo;
        this.primitiveIds = primitiveIds;
        this.componentIds = componentIds;
    }
}