
export class MyAuxBoard {
    constructor(player, opponent){
        this.player = player;
        this.opponent = opponent;

        this.numPieces = 0;
    }

    addPiece(){
        this.numPieces++;
    }

    removePiece(){
        this.numPieces--;
    }
}