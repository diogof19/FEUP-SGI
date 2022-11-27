import { MyCheckerboard } from "../model/MyCheckerboard.js";
import { MyCommand } from "./commands/MyCommand.js";

/**
 * MyController, implements rules for game and manages the game state.
 * @constructor
 * @param {MyCheckerboard} board - Checkerboard
 */
export class MyController {
    constructor(board) {
        this.board = board;
        this.player0 = board.player0;
        this.player1 = board.player1;
        this.currentPlayer = this.player0;
        this.commands = [];
        this.gameOver = false;
    }

    /**
     * Checks if move is forward.
     * Player 0 moves forward from top to bottom.
     * Player 1 moves forward from bottom to top.
     * @param {Number} row - Row
     * @param {Number} col - Column
     * @param {Number} newRow - New row
     * @param {Number} newCol - New column
     * @returns {Boolean} - True if move is forward, false otherwise
     * @private
     */
    #isForwardMove(row, _, newRow, _) {
        if (this.currentPlayer.number == 0) {
            return newRow > row;
        }
        else {
            return newRow < row;
        }
    }

    /**
     * Checks if move is diagonal.
     * @param {Number} row - Row
     * @param {Number} col - Column
     * @param {Number} newRow - New row
     * @param {Number} newCol - New column
     * @returns {Boolean} - True if move is diagonal, false otherwise
     * @private
     */
    #isDiagonalMove(row, col, newRow, newCol) {
        return Math.abs(newRow - row) == Math.abs(newCol - col);
    }

    /**
     * Checks if a capture move is possible.
     * @param {Number} row - Row
     * @param {Number} col - Column
     * @returns {Boolean} - True if a capture move is possible, false otherwise
     * @private
     */
    #hasCaptureMove(row, col) {
        let piece = this.board.getPiece(row, col);
        
        if (piece === null || !piece.isPlayerPiece(this.currentPlayer))
            return false;

        if (piece.isKing()) {
            return this.#isCaptureMove(row, col, row + 2, col + 2) ||
                this.#isCaptureMove(row, col, row + 2, col - 2) ||
                this.#isCaptureMove(row, col, row - 2, col + 2) ||
                this.#isCaptureMove(row, col, row - 2, col - 2);
        }
        else if (this.currentPlayer.number == 0) {
            return this.#isCaptureMove(row, col, row + 2, col + 2) ||
                this.#isCaptureMove(row, col, row + 2, col - 2);
        }
        else {
            return this.#isCaptureMove(row, col, row - 2, col + 2) ||
                this.#isCaptureMove(row, col, row - 2, col - 2);
        }
    }

    /**
     * Checks if move is in bounds.
     * @param {Number} row - Row
     * @param {Number} col - Column
     * @param {Number} newRow - New row
     * @param {Number} newCol - New column
     * @returns {Boolean} - True if move is in bounds, false otherwise
     * @private
     */
    #isInBounds(row, col, newRow, newCol) {
        return row >= 0 && row < 7 && col >= 0 && col < 7 &&
            newRow >= 0 && newRow < 7 && newCol >= 0 && newCol < 7;
    }

    /**
     * Checks if move is capture move.
     * @param {Number} row - Row
     * @param {Number} col - Column
     * @param {Number} newRow - New row
     * @param {Number} newCol - New column
     * @returns {Boolean} - True if move is capture move, false otherwise
     * @private
     */
    #isCaptureMove(row, col, newRow, newCol) {
        if (!this.board.isEmptySquare(newRow, newCol))
            return false;

        if (!this.#isInBounds(row, col, newRow, newCol))
            return false;

        let rowDiff = newRow - row;
        let colDiff = newCol - col;

        if (Math.abs(rowDiff) == 2 && Math.abs(colDiff) == 2) {
            let piece = this.board.getPiece(row + rowDiff / 2, col + colDiff / 2);
            return piece !== null && !piece.isPlayerPiece(this.currentPlayer);
        }

        return false
    }

    /**
     * Checks if move is king move.
     * @param {Number} row - Row
     * @param {Number} col - Column
     * @param {Number} newRow - New row
     * @param {Number} newCol - New column
     * @returns {Boolean} - True if move is king move, false otherwise
     * @private
     */
    #isKingMove(row, col, _, _) {
        let piece = this.board.getPiece(row, col);
        return piece.isKing();
    }

    /**
     * Checks if move is only one square over.
     * @param {Number} row - Row
     * @param {Number} col - Column
     * @param {Number} newRow - New row
     * @param {Number} newCol - New column
     * @returns {Boolean} - True if move is only one square over, false otherwise
     * @private
     */
    #isOneStepMove(row, col, newRow, newCol) {
        return Math.abs(newRow - row) == 1 && Math.abs(newCol - col) == 1;
    }

    /**
     * Checks if move is valid.
     * @param {Number} row - Row
     * @param {Number} col - Column
     * @param {Number} newRow - New row
     * @param {Number} newCol - New column
     * @returns {Boolean} - True if move is valid, false otherwise
     * @private
     */
    #isValidMove(row, col, newRow, newCol) {
        if (!this.#isInBounds(row, col, newRow, newCol))
            return false;

        if (this.board.isEmptySquare(row, col) || !this.board.getPiece(row, col).isPlayerPiece(this.currentPlayer))
            return false;

        if (!this.#isKingMove(row, col, newRow, newCol) && !this.#isForwardMove(row, col, newRow, newCol))
            return false

        if (!this.#isDiagonalMove(row, col, newRow, newCol))
            return false;

        if (this.#hasCaptureMove(row, col) && this.#isCaptureMove(row, col, newRow, newCol))
            return true;
        else
            return this.#isOneStepMove(row, col, newRow, newCol);
    }

    /**
     * Checks if game is over.
     * @returns {Boolean} - True if game is over, false otherwise
     * @private
     */
    #isGameOver() {
        return this.player0.captured == 12 || this.player1.captured == 12 || this.#getValidMoves().length == 0;
    }

    /**
     * Gets all valid moves.
     * @returns {Array} - Array of valid moves
     * @private
     * @todo - Optimize this function
     */
    #getValidMoves() {
        let moves = [];

        for (let row = 0; row < 7; row++) {
            for (let col = 0; col < 7; col++) {
                let piece = this.board.getPiece(row, col);
                if (piece !== null && piece.isPlayerPiece(this.currentPlayer)) {
                    for (let newRow = 0; newRow < 7; newRow++) {
                        for (let newCol = 0; newCol < 7; newCol++) {
                            if (this.#isValidMove(row, col, newRow, newCol))
                                moves.push([row, col, newRow, newCol]);
                        }
                    }
                }
            }
        }
        return moves;
    }

    /**
     * Makes move.
     * @param {Number} row - Row
     * @param {Number} col - Column
     * @param {Number} newRow - New row
     * @param {Number} newCol - New column
     */
    makeMove(row, col, newRow, newCol) {
        if (this.#isValidMove(row, col, newRow, newCol)) {
            let command = new MyCommand(this, row, col, newRow, newCol);

            command.execute();

            this.commands.push(command);
            
            this.gameOver = this.#isGameOver();
        }
    }

    /**
     * Undo move.
     */
    undo() {
        let command = this.commands.pop();

        command.undo();
    }
}