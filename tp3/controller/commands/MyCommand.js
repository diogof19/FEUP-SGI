import { MyController } from "../MyController.js";

/**
 * MyCommand class, class for moves related to the checkers game.
 * @constructor
 * @param {MyController} controller - Controller
 */
export class MyCommand {
    constructor(controller, row, col, newRow, newCol) {
        this.controller = controller;
        this.row = row;
        this.col = col;
        this.newRow = newRow;
        this.newCol = newCol;

        this.isCaptureMove = this.isCaptureMove(row, col, newRow, newCol);
        this.capturedPiece = null;
    }

    /**
     * Switches the current player.
     * @returns {void}
     * @private
     */
    #switchPlayer() {
        if (this.controller.currentPlayer == this.controller.player0) {
            this.controller.currentPlayer = this.controller.player1;
        }
        else {
            this.controller.currentPlayer = this.controller.player0;
        }
    }

    /**
     * Checks if is capture move.
     * @param {Number} row - Row
     * @param {Number} col - Column
     * @param {Number} newRow - New row
     * @param {Number} newCol - New column
     * @returns {Boolean} - True if is capture move, false otherwise
     * @private
     */
    #isCaptureMove(row, col, newRow, newCol) {
        let rowDiff = this.newRow - this.row;
        let colDiff = this.newCol - this.col;

        return (Math.abs(rowDiff) == 2 && Math.abs(colDiff) == 2)
    }

    /**
     * Execute the command.
     * @returns {void}
     * @throws {Error} - If the command is invalid
     * @public
     */
    execute() {
        let piece = this.controller.board.getPiece(this.row, this.col);

        if (this.isCaptureMove) {
            this.capturedPiece = this.controller.board.getPiece((this.row + this.newRow) / 2, (this.col + this.newCol) / 2);
            this.controller.board.setPiece((this.row + this.newRow) / 2, (this.col + this.newCol) / 2, null);
            this.controller.currentPlayer.captured++;
        }

        this.controller.board.setPiece(this.newRow, this.newCol, piece);
        this.controller.board.setPiece(this.row, this.col, null);

        if (!this.isCaptureMove) {
            this.#switchPlayer();
        }
    }

    /**
     * Undo the command.
     * @returns {void}
     * @throws {Error} - If the command is invalid
     * @public
     */
    undo() {
        let piece = this.controller.board.getPiece(this.newRow, this.newCol);

        if (this.isCaptureMove) {
            this.controller.board.setPiece((this.row + this.newRow) / 2, (this.col + this.newCol) / 2, this.capturedPiece);
            this.controller.currentPlayer.captured--;
        }

        this.controller.board.setPiece(this.row, this.col, piece);
        this.controller.board.setPiece(this.newRow, this.newCol, null);

        if (!this.isCaptureMove) {
            this.#switchPlayer();
        }
    }
}