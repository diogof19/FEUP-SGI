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
        this.currentPlayer = this.player0;
        this.gameOver = false;

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
        else {
            return this.getPlayerPieces(player).length > 0;
        }
    }

    /**
     * Check if square is empty.
     * @param {Number} row - Row
     * @param {Number} column - Column
     * @returns {Boolean} - True if the square is empty, false otherwise
     * @throws {Error} - If the position is invalid
     */
    #isEmptySquare(row, column) {
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
    #isOpponentSquare(row, column, player) {
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
    #isForwardMove(row, _, newRow, __) {
        if (this.currentPlayer.number == this.player0.number) {
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
        let piece = this.getPiece(row, col);
        
        if (piece === null || !piece.isPlayerPiece(this.currentPlayer))
            return false;

        // min and max are to ensure moves are within the board
        if (piece.isKing()) {
            return  this.#isCaptureMove(row, col, Math.min(row + 2, 7), Math.min(col + 2, 7)) ||
                    this.#isCaptureMove(row, col, Math.min(row + 2, 7), Math.max(col - 2, 0)) ||
                    this.#isCaptureMove(row, col, Math.max(row - 2, 0), Math.min(col + 2, 7)) ||
                    this.#isCaptureMove(row, col, Math.max(row - 2, 0), Math.max(col - 2, 0));
        }
        else if (this.currentPlayer.number == this.player0.number) {
            return this.#isCaptureMove(row, col, Math.min(row + 2, 7), Math.min(col + 2, 7)) ||
                this.#isCaptureMove(row, col, Math.min(row + 2, 7), Math.max(col - 2, 0));
        }
        else {
            return this.#isCaptureMove(row, col, Math.max(row - 2, 0), Math.min(col + 2, 7)) ||
                this.#isCaptureMove(row, col, Math.max(row - 2, 0), Math.max(col - 2, 0));
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
        return row >= 0 && row <= 7 && col >= 0 && col <= 7 &&
            newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7;
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
        if (!this.#isEmptySquare(newRow, newCol))
            return false;

        if (!this.#isInBounds(row, col, newRow, newCol))
            return false;

        let rowDiff = newRow - row;
        let colDiff = newCol - col;

        if (Math.abs(rowDiff) == 2 && Math.abs(colDiff) == 2) {
            let piece = this.getPiece(row + rowDiff / 2, col + colDiff / 2);
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
    #isKingMove(row, col, _, __) {
        let piece = this.getPiece(row, col);
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

        if (this.#isEmptySquare(row, col) || !this.getPiece(row, col).isPlayerPiece(this.currentPlayer))
            return false;

        console.log('Is player piece');

        if (!this.#isKingMove(row, col, newRow, newCol) && !this.#isForwardMove(row, col, newRow, newCol))
            return false

        console.log('Is forward move or king move');

        if (!this.#isDiagonalMove(row, col, newRow, newCol))
            return false;

        console.log('Is diagonal move');

        if (this.#hasCaptureMove(row, col) && this.#isCaptureMove(row, col, newRow, newCol)) {
            console.log('Has capture move');
            return true;
        }
        else {
            console.log('Checking one step move');
            return this.#isOneStepMove(row, col, newRow, newCol);
        }
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
                let piece = this.getPiece(row, col);
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
     * Switches the current player.
     * @returns {void}
     * @private
     */
    #switchPlayer() {
        if (this.currentPlayer == this.player0) {
            this.currentPlayer = this.player1;
        }
        else {
            this.currentPlayer = this.player0;
        }
    }

    // TODO: Add documentation, King moves
    makeMove(row, col, newRow, newCol) {
        if (!this.#isValidMove(row, col, newRow, newCol)) {
            return false;
        }
        
        let piece = this.getPiece(row, col);

        let isCaptureMove = this.#isCaptureMove(row, col, newRow, newCol);

        if (isCaptureMove) {
            let rowDiff = newRow - row;
            let colDiff = newCol - col;

            this.setPiece(row + rowDiff / 2, col + colDiff / 2, null);
            this.currentPlayer.captured++;
        }

        this.setPiece(row, col, null);
        this.setPiece(newRow, newCol, piece);

        if (!isCaptureMove)
            this.#switchPlayer();

        return true;
    }


}