import { MyPlayer } from "./MyPlayer.js";

/**
 * MyPiece class, representing a piece of the game board.
 * @constructor
 * @param {Number} playerNumber - Player
 * @param {Boolean} king - True if the piece is a king, false otherwise
 */
export class MyPiece {
    constructor(playerNumber, king) {
        this.playerNumber = playerNumber;
        this.king = king;
    }

    /**
     * Make the piece a king.
     * @returns {void}
     */
    makeKing() {
        this.king = true;
    }

    /**
     * Checks if the piece is a king.
     * @returns {Boolean} - True if the piece is a king, false otherwise
     */
    isKing() {
        return this.king;
    }

    /**
     * Checks if the piece is a player's piece.
     * @param {MyPlayer} player - Player
     * @returns {Boolean} - True if the piece is a player's piece, false otherwise
     */
    isPlayerPiece(player) {
        return this.playerNumber == player.number;
    }
}