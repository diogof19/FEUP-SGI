export class MyMoveRecord {
    constructor(row, col, newRow, newCol, capturedPiece, playerBefore) {
        this.row = row;
        this.col = col;
        this.newRow = newRow;
        this.newCol = newCol;
        this.capturedPiece = capturedPiece;
        this.playerBefore = playerBefore;
    }
}
