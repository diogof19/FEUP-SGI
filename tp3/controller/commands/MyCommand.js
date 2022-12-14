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
        this.moveNumber = -1;
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
    undo() {
        this.boardModel.undoMove(this.moveNumber);
        this.boardView.setBoardViewPieces();
    }

    redo() {
        this.execute();
    }
}