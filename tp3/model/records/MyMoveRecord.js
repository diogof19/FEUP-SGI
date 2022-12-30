/**
 * This class represents a move record.
 * @constructor
 * @param {Number} row - The row of the piece to be moved.
 * @param {Number} col - The column of the piece to be moved.
 * @param {Number} newRow - The row of the piece's new position.
 * @param {Number} newCol - The column of the piece's new position.
 * @param {MyPiece} capturedPiece - The piece that was captured.
 * @param {Number} playerNumberBefore - The player number before the move.
 * @param {Number} player0CapturedBefore - The number of pieces captured by player 1 before the move.
 * @param {Number} player1CapturedBefore - The number of pieces captured by player 2 before the move.
 */
export class MyMoveRecord {
    constructor(row, col, newRow, newCol, capturedPiece, playerNumberBefore, player0CapturedBefore, player1CapturedBefore) {
        this.row = row;
        this.col = col;
        this.newRow = newRow;
        this.newCol = newCol;
        this.capturedPiece = capturedPiece;
        this.playerNumberBefore = playerNumberBefore;
        this.player0CapturedBefore = player0CapturedBefore;
        this.player1CapturedBefore = player1CapturedBefore;
    }
}
