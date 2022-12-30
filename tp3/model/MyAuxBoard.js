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

    /**
     * Adds a piece to the auxiliary board
     */
    addPiece(){
        this.numPieces++;
    }

    /**
     * Removes a piece from the auxiliary board
     */
    removePiece(){
        this.numPieces--;
    }
}