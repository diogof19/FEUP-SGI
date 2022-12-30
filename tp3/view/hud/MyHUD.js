import { CGFobject,CGFshader,CGFappearance,CGFtexture } from "../../../lib/CGF.js";
import { MyQuad } from "../primitives/MyQuad.js";
import { MyHUDButton } from "./MyHUDButton.js";

/**
 * MyHUD class, representing the HUD.
 * @constructor
 * @param {CGFscene} scene - MyScene object
 */
export class MyHUD extends CGFobject {
    constructor(scene, board) {
        super(scene);
        this.scene = scene;
        this.quad = new MyQuad(this.scene);

        this.board = board

        // Buttons
        this.undoButton = new MyHUDButton(this, -40, -17, 201, "UNDO");
        this.changeSceneButton = new MyHUDButton(this, -40, -15.9, 202, "CHANGE SCENE");
        this.changeCamerasButton = new MyHUDButton(this, -40, -14.8, 203, "ENABLE CHANGE CAMERAS");
        this.restartButton = new MyHUDButton(this, -9, -1, 204, "    Play Again?   ");
        this.boardCameraButton = new MyHUDButton(this, 28, 18, 205, "Board");
        this.playerOneCameraButton = new MyHUDButton(this, 28, 16.9, 206, "Player 1");
        this.playerTwoCameraButton = new MyHUDButton(this, 28, 15.8, 207, "Player 2");
        this.redoButton = new MyHUDButton(this, -40, -18.1, 208, "REDO");

        this.invalid = 0;
        this.invalidMsg = "Invalid Move!";
        
        this.initShader();
        this.initAppearance();
    }

    /**
     * Initialize shader.
     */
    initShader() {
        this.shader = new CGFshader(this.scene.gl, 'view/shaders/vert/hud.vert', 'view/shaders/frag/hud.frag');
        this.shader.setUniformsValues({'dims': [16, 16]});
    }

    /**
     * Initialize appearances.
     */
    initAppearance() {
        this.transTextAppearance = new CGFappearance(this.scene);
		this.transFontTexture = new CGFtexture(this.scene, "scenes/images/oolite-font.trans.png");
		this.transTextAppearance.setTexture(this.transFontTexture);

        this.opaqueTextAppearance = new CGFappearance(this.scene);
        this.opaqueFontTexture = new CGFtexture(this.scene, "scenes/images/oolite-font.png");
        this.opaqueTextAppearance.setTexture(this.opaqueFontTexture);
    }

    /**
     * Displats the hud.
     */
    display() {
        // Always draw in front of everything
        this.scene.gl.disable(this.scene.gl.DEPTH_TEST);

        // Apply shader and appearance
        this.scene.setActiveShaderSimple(this.shader);

        // Transparent text
        this.transTextAppearance.apply();

        this.scene.pushMatrix();

        this.scene.loadIdentity();

        this.displayStringAt(`PLAYER ${this.board.player0.number}: ${this.board.player0.captured}`, -40, 19);
        this.displayStringAt(`PLAYER ${this.board.player1.number}: ${this.board.player1.captured}`, -40, 18);

        if(!this.board.gameOver){
            this.playTimeString = `PLAY TIME: ${this.scene.instant.toFixed(1)}s`;
            this.moveTimeString = `MOVE TIME: ${this.board.moveInstant.toFixed(1)}s`;
        }
        else {
            this.opaqueTextAppearance.apply();
            this.displayStringAt("                  ", -9, 2);
            this.displayStringAt("     GAME OVER    ", -9, 1);
            this.displayStringAt("  " + `PLAYER ${this.board.getWinner().number} WINS!` + "  ", -9, 0);
            this.restartButton.display();
            this.displayStringAt("                  ", -9, -2);
            this.transTextAppearance.apply();
        }

        this.displayStringAt(this.playTimeString, 41 - this.playTimeString.length, -17);
        this.displayStringAt(this.moveTimeString, 41 - this.moveTimeString.length, -18);

        this.displayStringAt("CHANGE CAMERA:", 28, 19);

        // Opaque text (Buttons)
        this.opaqueTextAppearance.apply();
        
        this.undoButton.display();
        this.changeSceneButton.display();
        this.changeCamerasButton.display();
        this.boardCameraButton.display();
        this.playerOneCameraButton.display();
        this.playerTwoCameraButton.display();
        this.redoButton.display();

        if(this.invalid != 0){
            this.displayStringAt(" ".repeat(this.invalidMsg.length + 2), -(this.invalidMsg.length / 2) -1, 19);
            this.displayStringAt(" " + this.invalidMsg + " ", -(this.invalidMsg.length / 2)-1, 18);
            this.displayStringAt(" ".repeat(this.invalidMsg.length + 2), -(this.invalidMsg.length / 2) -1, 17);
            this.invalid++;
        }

        if(this.invalid > 25) this.invalid = 0;

        // Reset to default shader and appearance
        this.scene.setActiveShaderSimple(this.scene.defaultShader);
        this.scene.setDefaultAppearance();

        // Reset depth test
        this.scene.gl.enable(this.scene.gl.DEPTH_TEST);
    }

    /**
     * Displays a string at the given coordinates.
     * @param {String} string - String to display
     * @param {Number} x - X coordinate
     * @param {Number} y - Y coordinate
     */
    displayStringAt(string, x, y) {
        this.scene.pushMatrix();
        this.scene.translate(x, y, -50);
        this.displayString(string);
        this.scene.popMatrix();
    }

    /**
     * Displays a string.
     * @param {String} string 
     */
    displayString(string) {
        for(let i = 0; i < string.length; i++) {
            this.scene.pushMatrix();
            this.scene.translate(i, 0, 0);
            this.scene.activeShader.setUniformsValues({'charCoords': this.getCharCoords(string[i])});
            this.quad.display();
            this.scene.popMatrix();
        }
    }

    /**
     * Gets the coordinates of a character in the font texture.
     * @param {char} char 
     * @returns 
     */
    getCharCoords(char) {
        return [char.charCodeAt(0) % 16, Math.floor(char.charCodeAt(0) / 16)]
    }

    /**
     * Switches the change cameras toggle button text.
     */
    switchChangeCamerasButton() {
        if (this.changeCamerasButton.string == "ENABLE CHANGE CAMERAS") {
            this.changeCamerasButton.string = "DISABLE CHANGE CAMERAS";
        } else {
            this.changeCamerasButton.string = "ENABLE CHANGE CAMERAS";
        }
    }
}