import { MyKeyframe } from "./MyKeyframe.js";
import { MyKeyframeAnimation } from "./MyKeyframeAnimation.js";

export class MyMoveAnimation {
    constructor(scene, oldCoods, newCoords, capturedPiece = null, auxBoardView = null) {
        this.scene = scene;
        this.oldCoords = oldCoods;
        this.newCoords = newCoords;
        this.capturedPiece = capturedPiece;
        this.auxBoardView = auxBoardView;
        
        this.setUp();
    }

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

    update(t) {
        this.moveAnimation.update(t);
        if(this.capturedPieceAnimation != null)
            this.capturedPieceAnimation.update(t);
    }
}