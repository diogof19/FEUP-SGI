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
