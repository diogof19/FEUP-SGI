import { MyCheckerboard as MyCheckerboardModel } from "../../model/MyCheckerboard.js";
import { MyCheckerboard as MyCheckerboardView } from "../../view/board/MyCheckerboard.js";
import { MyKeyframe } from "../../view/animations/MyKeyframe.js";
import { MyKeyframeAnimation } from "../../view/animations/MyKeyframeAnimation.js";

/**
 * MyCommand class, class for moves related to the checkers game.
 * @constructor
 * @param {MyCheckerboardModel} boardModel - boardModel Model
 * @param {MyCheckerboardView} boardView - boardModel View
 */
export class MyCommand {
    constructor(boardModel, boardView, row, col, newRow, newCol, auxBoardView0, auxBoardView1) {
        this.boardModel = boardModel;
        this.boardView = boardView;
        this.row = row;
        this.col = col;
        this.newRow = newRow;
        this.newCol = newCol;
        this.auxBoardView0 = auxBoardView0;
        this.auxBoardView1 = auxBoardView1;
        this.moveNumber = -1;
    }

    /**
     * Create the animation for the move.
     * @param {Number} oldCol 
     * @param {Number} oldRow 
     * @param {Number} newCol 
     * @param {Number} newRow 
     */
    createAnimation(oldCol, oldRow, newCol, newRow) {
        let keyframeStart = new MyKeyframe(this.boardView.scene.instant, [0, 0, 0], 0, 0, 0, [1, 1, 1]);
        let keyframeEnd = new MyKeyframe(this.boardView.scene.instant + 0.5, [newCol - oldCol, newRow - oldRow, 0], 0, 0, 0, [1, 1, 1]);
        return new MyKeyframeAnimation(this.boardView.scene, this.boardView, [keyframeStart, keyframeEnd])
    }

    /**
     * Execute the command.
     * @returns {void}
     * @throws {Error} - If the command is invalid
     * @public
     */
    execute() {
        this.moveNumber = this.boardModel.makeMove(this.row, this.col, this.newRow, this.newCol)
        if (this.moveNumber != -1) {
            this.auxBoardView0.resetPieces();
            this.auxBoardView1.resetPieces();
            this.boardView.setAnimation(
                {'animation': this.createAnimation(this.col, this.row, this.newCol, this.newRow),
                'pieceCoords': [this.col, this.row]
            });
        }
        else {
            // TODO User feedback
        }
    }

    /**
     * Undo the command.
     * @returns {void}
     * @throws {Error} - If the command is invalid
     * @public
     */
    undo() {
        this.boardModel.undoMove(this.moveNumber);
        this.auxBoardView0.resetPieces();
        this.auxBoardView1.resetPieces();
        this.boardView.setBoardViewPieces();
    }

    redo() {
        this.execute();
    }
}