import { MyCheckerboard } from "../../model/MyCheckerboard,js";

/**
 * MyCommand class, abstract class for all commands related to the checkers game.
 * @constructor
 * @param {MyCheckerboard} checkerboard - Checkerboard
 */
export class MyCommand {
    constructor(board) {
        this.board = board;
    }

    /**
     * Execute the command.
     * @returns {void}
     * @throws {Error} - If the command is invalid
     * @abstract
     * @public
     */
    execute() {
        throw new Error("Abstract method");
    }

    /**
     * Undo the command.
     * @returns {void}
     * @throws {Error} - If the command is invalid
     * @abstract
     * @public
     */
    undo() {
        throw new Error("Abstract method");
    }
}