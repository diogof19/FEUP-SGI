import { MyCheckerboard as MyCheckerboardModel } from "../model/MyCheckerboard.js";
import { MyCommand } from "./commands/MyCommand.js";
import { MyCheckerboard as MyCheckerboardView } from "../model/MyCheckerboard.js";
import { controllerState } from "./enums/MyControllerState.js";
import { MySceneGraph } from "../view/MySceneGraph.js";

/**
 * MyController, implements rules for game and manages the game state.
 * @constructor
 * @param {MyCheckerboardModel} boardModel - Checkerboard
 * @param {MyCheckerboardView} boardView - Checkerboard
 * @param {MyHUD} hud - HUD
 * @param {MyCheckerboardView} auxBoardView0 - Player 1's auxBoardView
 * @param {MyCheckerboardView} auxBoardView1 - Player 2's auxBoardView
 */
export class MyController {
    constructor(boardModel, boardView, hud, auxBoardView0, auxBoardView1) {
        this.board = boardModel;
        this.boardView = boardView;
        this.hud = hud;
        this.auxBoardView0 = auxBoardView0;
        this.auxBoardView1 = auxBoardView1;

        this.state = controllerState.IDLE;

        this.selectedCoords = null;

        this.undoStack = [];
        this.redoStack = [];

        this.scenes = ['barad-dur.xml', 'space.xml'];
        this.sceneIndex = 0;
    }

    readSceneInput() {
        let scene = this.boardView.scene;

        if(this.boardView.currentAnimation == null && this.state == controllerState.ANIMATING)
            this.state = controllerState.IDLE;

        if (scene.pickMode == false && this.state != controllerState.ANIMATING) {
            if (scene.pickResults != null && scene.pickResults.length > 0) {
                for (let i = 0; i < scene.pickResults.length; i++) {
                    let obj = scene.pickResults[i][0];
                    let customId = scene.pickResults[i][1];
                    if (obj && customId == 101) {
                        console.log("Replay button pressed");
                        this.replay();
                    }
                    else if (obj && customId == 201) {
                        console.log("Undo button pressed");
                        this.undo();
                    }
                    else if (obj && customId == 202) {
                        console.log("Change scene button pressed");
                        this.changeScene();
                    }
                    else if (obj && customId == 203) {
                        console.log("Change cameras button pressed");
                        this.boardView.changeCamerasToggle();
                        this.hud.switchChangeCamerasButton();
                    }
                    else if (obj && customId == 204) {
                        console.log("Play again button pressed");
                        this.playAgain();
                    }
                    else if (obj && customId != 0) {
                        this.boardView.toggleSelectSquare(customId);

                        if (this.state == controllerState.IDLE) {
                            this.state = controllerState.SELECTING_MOVE;
                            this.selectedCoords = this.boardView.getCoords(customId);
                        }
                        else if (this.state == controllerState.SELECTING_MOVE) {
                            this.state = controllerState.ANIMATING;
                            let newCoords = this.boardView.getCoords(customId);
                            this.makeMove(this.selectedCoords[0], this.selectedCoords[1], newCoords[0],  newCoords[1]);
    
                            this.redoStack = [];
                            this.boardView.deselectAllSquares();
                        }
                    }
                }
                scene.pickResults.splice(0, scene.pickResults.length);
            }
        }
    }

    makeMove(row1, col1, row2, col2) {
        let command = new MyCommand(this.board, this.boardView, row1, col1, row2, col2, this.auxBoardView0, this.auxBoardView1);
        command.execute();
        if (command.moveNumber != -1)
            this.undoStack.push(command);
        console.log(this.undoStack);
    }

    undo() {
        console.log(this.undoStack);
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

    replay() {
        this.state = controllerState.ANIMATING;
        while(this.undoStack.length > 0) {
            let command = this.undoStack.pop();
            command.undo();
            this.redoStack.push(command);
        }
        while(this.redoStack.length > 0) {
            let command = this.redoStack.pop();
            command.redo();
            this.undoStack.push(command);
        }
        this.state = controllerState.IDLE;
    }

    changeScene() {
        this.sceneIndex = (this.sceneIndex + 1) % this.scenes.length;
        this.boardView.scene.sceneInited = false;
        var graph = new MySceneGraph(this.scenes[this.sceneIndex], this.boardView.scene);
    }

    playAgain() {
        this.boardView.scene.sceneInited = false;
        this.boardView.scene.initCheckers();
        this.boardView.scene.startTime = null;
        this.board.startTime = null;
        this.boardView.scene.graph.selectedCamera = 'gameOverviewCamera';
        this.boardView.scene.updateCamera();
        this.boardView.scene.sceneInited = true;
    }
}