/**
 * @class MyAuxBoard
 * @classdesc Represents the auxiliary board of a player
 * @constructor
 * @param {MyPlayer} player - Player
 * @param {MyPlayer} opponent - Opponent
 */
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