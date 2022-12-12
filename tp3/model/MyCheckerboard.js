import { MyPiece } from "./MyPiece.js";
import { MyPlayer } from "./MyPlayer.js";

/**
 * MyCheckerboard class, which represents a checkerboard.
 * @constructor
 * @param {MyPlayer} player0 - Player 0
 * @param {MyPlayer} player0 - Player 1
 * @param {Array[Array[Number]]} board - Board
 */
export class MyCheckerboard {
    constructor(player0, player1, board) {
        this.#validateArguments(player0, player1, board);

        this.player0 = player0;
        this.player1 = player1;

        this.board = this.#makeBoard(board);
    }

    /**
     * Validate the arguments.
     * @param {MyPlayer} player0 - Player 1
     * @param {MyPlayer} player1 - Player 2
     * @param {Array[Array[Number]]} board - Board
     * @throws {Error} - If the arguments are invalid
     * @private
     */
    #validateArguments(player0, player1, board) {
        if (player0 === undefined || player1 === undefined || board === undefined) {
            throw new Error("All arguments must be defined");
        }
        else if (player0 === null || player1 === null || board === null) {
            throw new Error("All arguments must be defined");
        }
        else if (board.length !== 8) {
            throw new Error("Board must have 8 rows");
        }
        else if (board[0].length !== 8) {
            throw new Error("Board must have 8 columns");
        }
    }

    /**
     * Make a board
     * @param {Array[Array[Number]]} board - Board
     * @returns {Array[Array[MyPiece | Number]]} - Board
     */
    #makeBoard(board) {
        let newBoard = [];
        for (let row = 0; row < 8; row++) {
            newBoard[row] = [];
            for (let column = 0; column < 8; column++) {
                if (board[row][column] !== 0) {
                    newBoard[row][column] = new MyPiece(board[row][column], false);
                }
                else {
                    newBoard[row][column] = null;
                }
            }
        }
        return newBoard;
    }

    /**
     * Set piece on the board.
     * @param {Number} row - Row
     * @param {Number} column - Column
     * @param {MyPiece | null} piece - Piece
     * @throws {Error} - If the piece is invalid
     * @throws {Error} - If the position is invalid
     */
    setPiece(row, column, piece) {
        if (piece !== null && piece.playerNumber !== this.player0.number && piece.playerNumber !== this.player1.number) {
            throw new Error("Piece must null or belong to a player");
        }
        else if (row < 0 || row > 7) {
            throw new Error("Row must be between 0 and 7");
        }
        else if (column < 0 || column > 7) {
            throw new Error("Column must be between 0 and 7");
        }
        else {
            this.board[row][column] = piece;
        }
    }

    /**
     * Get piece from the board.
     * @param {Number} row - Row
     * @param {Number} column - Column
     * @returns {MyPiece | null} - Piece
     * @throws {Error} - If the position is invalid
     */
    getPiece(row, column) {
        if (row < 0 || row > 7) {
            throw new Error("Row must be between 0 and 7");
        }
        else if (column < 0 || column > 7) {
            throw new Error("Column must be between 0 and 7");
        }
        else {
            return this.board[row][column];
        }
    }

    /**
     * Get player's number of pieces.
     * @param {MyPlayer} player - Player
     * @returns {Number} - Number of pieces
     * @throws {Error} - If the player is invalid
     */
    getPlayerPieces(player) {
        if (player === undefined || player === null) {
            throw new Error("Player must be defined");
        }
        else if (player.type !== "MyPlayer") {
            throw new Error("Player must be of type MyPlayer");
        }
        else {
            let pieces = 0;

            for (let row = 0; row < 8; row++) {
                for (let column = 0; column < 8; column++) {
                    if (this.board[row][column] !== null && this.board[row][column].isPlayerPiece(player)) {
                        pieces++;
                    }
                }
            }

            return pieces;
        }
    }

    /**
     * Check if the player has any pieces.
     * @param {MyPlayer} player - Player
     * @returns {Boolean} - True if the player has any pieces, false otherwise
     * @throws {Error} - If the player is invalid
     */
    hasPlayerPieces(player) {
        if (player === undefined || player === null) {
            throw new Error("Player must be defined");
        }
        else if (player.type !== "MyPlayer") {
            throw new Error("Player must be of type MyPlayer");
        }
        else {
            return this.getPlayerPieces(player) > 0;
        }
    }

    /**
     * Check if square is empty.
     * @param {Number} row - Row
     * @param {Number} column - Column
     * @returns {Boolean} - True if the square is empty, false otherwise
     * @throws {Error} - If the position is invalid
     */
    isEmptySquare(row, column) {
        if (row < 0 || row > 7) {
            throw new Error("Row must be between 0 and 7");
        }
        else if (column < 0 || column > 7) {
            throw new Error("Column must be between 0 and 7");
        }
        else {
            return this.board[row][column] === null;
        }
    }

    /**
     * Checks if the square is occupied by an opponent's piece.
     * @param {Number} row - Row
     * @param {Number} column - Column
     * @param {MyPlayer} player - Player
     * @returns {Boolean} - True if the square is occupied by an opponent's piece, false otherwise
     * @throws {Error} - If the position is invalid
     * @throws {Error} - If the player is invalid
     */
    isOpponentSquare(row, column, player) {
        if (row < 0 || row > 7) {
            throw new Error("Row must be between 0 and 7");
        }
        else if (column < 0 || column > 7) {
            throw new Error("Column must be between 0 and 7");
        }
        else if (player === undefined || player === null) {
            throw new Error("Player must be defined");
        }
        else if (player.type !== "MyPlayer") {
            throw new Error("Player must be of type MyPlayer");
        }
        else {
            return this.board[row][column] !== null && !this.board[row][column].isPlayerPiece(player);
        }
    }
}