import { MyCheckerboard as MyCheckerboardModel } from "../../model/MyCheckerboard.js";
import { MyCheckerboard as MyCheckerboardView } from "../../view/board/MyCheckerboard.js";

/**
 * MyCommand class, class for moves related to the checkers game.
 * @constructor
 * @param {MyCheckerboardModel} boardModel - boardModel Model
 * @param {MyCheckerboardView} boardView - boardModel View
 */
export class MyCommand {
    constructor(boardModel, boardView, row, col, newRow, newCol) {
        this.boardModel = boardModel;
        this.boardView = boardView;
        this.row = row;
        this.col = col;
        this.newRow = newRow;
        this.newCol = newCol;
    }

    /**
     * Execute the command.
     * @returns {void}
     * @throws {Error} - If the command is invalid
     * @public
     */
    execute() {
        if (this.boardModel.makeMove(this.row, this.col, this.newRow, this.newCol)) {
            console.log(this.boardModel.board);
            // TODO Replace with animation
            this.boardView.setBoardViewPieces()
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
    /* undo() {
        let piece = this.controller.boardModel.getPiece(this.newRow, this.newCol);

        if (this.isCaptureMove) {
            this.controller.boardModel.setPiece((this.row + this.newRow) / 2, (this.col + this.newCol) / 2, this.capturedPiece);
            this.controller.currentPlayer.captured--;
        }

        this.controller.boardModel.setPiece(this.row, this.col, piece);
        this.controller.boardModel.setPiece(this.newRow, this.newCol, null);

        if (!this.isCaptureMove) {
            this.#switchPlayer();
        }
    } */
}