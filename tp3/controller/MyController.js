import { MyCheckerboard as MyCheckerboardModel } from "../model/MyCheckerboard.js";
import { MyCommand } from "./commands/MyCommand.js";
import { MyCheckerboard as MyCheckerboardView } from "../model/MyCheckerboard.js";
import { controllerState } from "./enums/MyControllerState.js";

/**
 * MyController, implements rules for game and manages the game state.
 * @constructor
 * @param {MyCheckerboardModel} boardModel - Checkerboard
 * @param {MyCheckerboardView} boardView - Checkerboard
 */
export class MyController {
    constructor(boardModel, boardView) {
        this.board = boardModel;
        this.boardView = boardView;
        this.state = controllerState.IDLE;

        this.selectedCoords = null;

        this.undoStack = [];
        this.redoStack = [];
    }

    readSceneInput() {
        let scene = this.boardView.scene;

        if (scene.pickMode == false) {
            if (scene.pickResults != null && scene.pickResults.length > 0) {
                for (let i = 0; i < scene.pickResults.length; i++) {
                    let obj = scene.pickResults[i][0];
                    if (obj) {
                        let customId = scene.pickResults[i][1];
                        this.boardView.toggleSelectSquare(customId);

                        if (this.state == controllerState.IDLE) {
                            this.state = controllerState.SELECTING_MOVE;
                            this.selectedCoords = [Math.floor(customId / 10), customId % 10];
                        }
                        else if (this.state == controllerState.SELECTING_MOVE) {
                            this.state = controllerState.IDLE;
                            this.makeMove(this.selectedCoords[0], this.selectedCoords[1], Math.floor(customId / 10), customId % 10);
                            this.boardView.deselectAllSquares();
                        }
                    }
                }
                scene.pickResults.splice(0, scene.pickResults.length);
            }
        }
    }

    makeMove(row1, col1, row2, col2) {
        let command = new MyCommand(this.board, this.boardView, row1, col1, row2, col2);
        command.execute();
        this.undoStack.push(command);
    }

    undo() {
        if (this.undoStack.length == 0) {
            return;
        }

        let command = this.undoStack.pop();
        command.undo();
        this.redoStack.push(command);
    }

    redo() {
        if (this.redoStack.length == 0) {
            return;
        }

        let command = this.redoStack.pop();
        command.redo();
        this.undoStack.push(command);
    }
}