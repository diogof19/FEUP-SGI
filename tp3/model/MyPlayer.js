/**
 * MyPlayer class, which represents the player.
 * @constructor
 * @param {Number} number - Player number
 * @param {CGFappearance} appearance - Player appearance
 */
export class MyPlayer {
    constructor(number, appearance) {
        this.number = number;
        this.appearance = appearance;
        this.captured = 0;
    }
}