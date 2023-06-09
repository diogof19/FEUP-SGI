import { CGFappearance } from "../../lib/CGF.js";
import { MyKeyframeAnimation } from "./animations/MyKeyframeAnimation.js";
import { MyHighlightInfo } from "./records/MyHighlightInfo.js";
import { MyTextureInfo } from "./records/MyTextureInfo.js";

/**
 * MyComponent class, which represents a component
 * @constructor
 * @param {MySceneGraph} sceneGraph - MySceneGraph object
 * @param {String} id - ID of the component
 * @param {Array} transfMatrix - Transformation matrix
 * @param {Array} materialIds - Array of material IDs
 * @param {MyKeyframeAnimation} animation - Animation object
 * @param {MyTextureInfo} textureInfo - Texture information
 * @param {MyHighlightInfo} highlightInfo - Highlight information
 * @param {Array} primitiveIds - Array of primitive IDs
 * @param {Array} componentIds - Array of component IDs
 */
export class MyComponent {
    constructor
    (
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

    /**
     * Get the number of materials
     * @returns {Number} - Number of materials
     */
    materialNumber() {
        return this.materialIds.length;
    }

    /**
     * Get index of the selected material
     * @returns {Number} Index of the selected material
     */
    selectedMaterial() {
        return this.sceneGraph.materialIndex & this.materialNumber();
    }

    /**
     * Checks if the component is highlightable
     * @returns {Boolean} - True if highlightable, false otherwise
     */
    isHighlightable() {
        return this.highlightInfo != null;
    }

    /**
     * Checks if the component is animated
     * @returns {boolean} True if the component is animated, false otherwise
     */
    isAnimated() {
        return this.animation != null;
    }

    /**
     * Displays the component
     * @param {CGFappearance} material - Material to be applied if inherited
     * @param {CGFtexture} texture - Texture to be applied if inherited
     * @param {Number} lengthS - Texture length in s axis
     * @param {Number} lengthT - Texture length in t axis
     */
    display
    (
        parentMaterial = new CGFappearance(this.sceneGraph.scene),
        parentTexture = null,
        lenghtS = 1,
        lenghtT = 1,
    ) {
        let nodeMaterial;
        let nodeTexture, nodeLenghtS, nodeLenghtT;
        

        // Material
        if (this.materialIds[this.selectedMaterial()] == "inherit") {
            nodeMaterial = parentMaterial;
        }
        else {
            nodeMaterial = this.sceneGraph.appearances[this.materialIds[this.selectedMaterial()]];
        }

        // Texture
        if (this.textureInfo.textureId == "none") {
            nodeTexture = null;
            nodeLenghtS = 1;
            nodeLenghtT = 1;
        }
        else if (this.textureInfo.textureId == "inherit") {
            nodeTexture = parentTexture;
            nodeLenghtS = lenghtS;
            nodeLenghtT = lenghtT;
        }
        else {
            nodeTexture = this.sceneGraph.textures[this.textureInfo.textureId];
            nodeLenghtS = this.textureInfo.lengthS;
            nodeLenghtT = this.textureInfo.lengthT;
        }

        // Highlight
        if (this.isHighlightable()) {
            if (this.highlightInfo.highlight) {
                this.sceneGraph.scene.setActiveShader(this.sceneGraph.scene.highlightingShader);

                this.sceneGraph.scene.highlightingShader.setUniformsValues({
                    uHighlightColor: this.highlightInfo.color,
                });
                this.sceneGraph.scene.highlightingShader.setUniformsValues({
                    uHighlightScale: this.highlightInfo.scale,
                });
                this.sceneGraph.scene.highlightingShader.setUniformsValues({
                    uMaterialColor: 
                        nodeTexture == null ? 
                        nodeMaterial.ambient.slice(0, 3) : 
                        [-1.0, -1.0, -1.0]
                });
            }
        }

        nodeMaterial.setTexture(nodeTexture);
        nodeMaterial.setTextureWrap("REPEAT", "REPEAT");
        nodeMaterial.apply();

        // Transformations
        this.sceneGraph.scene.pushMatrix();
        this.sceneGraph.scene.multMatrix(this.transfMatrix);

        // Animation
        if (this.isAnimated()) {
            let animation = this.sceneGraph.animations[this.animation];

            // If animation hasn't started yet, do not display
            if (this.sceneGraph.scene.instant < animation.startTime) {
                this.sceneGraph.scene.popMatrix();
                return;
            }

            animation.apply();
        }

        // Display primitives
        for (let primitiveId of this.primitiveIds) {
            let primitive = this.sceneGraph.primitives[primitiveId];

            primitive.updateTexCoords(nodeLenghtS, nodeLenghtT);
            primitive.display();
            primitive.updateTexCoords(1/nodeLenghtS, 1/nodeLenghtT);
        }

        // Display components
        for (let componentId of this.componentIds) {
            let component = this.sceneGraph.components[componentId];

            component.display(nodeMaterial, nodeTexture, nodeLenghtS, nodeLenghtT);
        }

        // Reset shader if highlighted and pop matrix
        if (this.isHighlightable()) {
            if (this.highlightInfo.highlight) {
                this.sceneGraph.scene.setActiveShader(this.sceneGraph.scene.defaultShader);
            }
        }

        this.sceneGraph.scene.popMatrix();
    }
}