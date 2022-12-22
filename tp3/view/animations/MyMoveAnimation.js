import { CGFscene } from "../../../lib/CGF.js";
import { MyAuxBoard } from "../board/MyAuxBoard.js";
import { MyKeyframe } from "./MyKeyframe.js";
import { MyKeyframeAnimation } from "./MyKeyframeAnimation.js";

/**
 * MyMoveAnimation class, representing an animation for a piece movement.
 * @constructor
 * @param {CGFscene} scene - MyScene object
 * @param {Array} oldCoods - Starting position coordinates
 * @param {Arrau} newCoords - Ending position coordinates
 * @param {Array} transformation - Transformation array that was applied to the overall board
 * @param {Array} capturedPiece - Captured piece coordinates
 * @param {MyAuxBoard} auxBoardView - Auxiliary board view
 */
export class MyMoveAnimation {
    constructor(scene, oldCoods, newCoords, transformation, capturedPiece = null, auxBoardView = null) {
        this.scene = scene;
        this.oldCoords = oldCoods;
        this.newCoords = newCoords;
        this.transformation = transformation;
        this.capturedPiece = capturedPiece;
        this.auxBoardView = auxBoardView;
        
        this.setUp();
    }

    /**
     * Creates the animations needed for the movement
     */
    setUp() {
        if(this.capturedPiece != null && this.auxBoardView != null) {
            let keyframeStart = new MyKeyframe(this.scene.instant, [0, 0, 0], 0, 0, 0, [1, 1, 1]);
            let keyframeEnd = new MyKeyframe(this.scene.instant + 1.5, [this.newCoords[0] - this.oldCoords[0], this.newCoords[1] - this.oldCoords[1], 0], 0, 0, 0, [1, 1, 1]);
            this.moveAnimation = new MyKeyframeAnimation(this.scene, this.boardView, [keyframeStart, keyframeEnd]);

            var [x, y, z] = this.auxBoardView.calculateNewPiecePosition();

            let capturedKeyframeStart = new MyKeyframe(this.scene.instant + 0.23, [0, 0, 0], 0, 0, 0, [1, 1, 1]);
            let capturedKeyframeMiddle = new MyKeyframe(this.scene.instant + 1.0, [(x - this.capturedPiece[0]) / 2, (y - this.capturedPiece[1]) / 2, z + 0.8], 0, 0, 0, [1, 1, 1]);
            let capturedKeyframeEnd = new MyKeyframe(this.scene.instant + 1.5, [x - this.capturedPiece[0] - 0.5, y - this.capturedPiece[1] - 0.5, z], 0, 0, 0, [1, 1, 1]);

            this.capturedPieceAnimation = new MyKeyframeAnimation(this.scene, this.capturedPiece, [capturedKeyframeStart, capturedKeyframeMiddle, capturedKeyframeEnd]);
        }
        else{
            let keyframeStart = new MyKeyframe(this.scene.instant, [0, 0, 0], 0, 0, 0, [1, 1, 1]);
            let keyframeEnd = new MyKeyframe(this.scene.instant + 0.5, [this.newCoords[0] - this.oldCoords[0], this.newCoords[1] - this.oldCoords[1], 0], 0, 0, 0, [1, 1, 1]);
            this.moveAnimation = new MyKeyframeAnimation(this.scene, this.boardView, [keyframeStart, keyframeEnd]);
        }
    }

    /**
     * Updates the spotlight position
     */
    updateSpotlight(){
        var spotlight = this.scene.lights[0];

        var translation = this.moveAnimation.getTranslation();

        var positionX = this.transformation[0] + ((this.oldCoords[0] + translation[0] + 0.5) * this.transformation[2]);
        var positionZ = this.transformation[1] + ((-this.oldCoords[1] - translation[1] - 0.5) * this.transformation[2]);

        spotlight.setPosition(positionX, 1, positionZ, 1);
        spotlight.enable();
    }

    update(t) {
        this.moveAnimation.update(t);
        if(this.capturedPieceAnimation != null)
            this.capturedPieceAnimation.update(t);
        this.updateSpotlight();
    }
}