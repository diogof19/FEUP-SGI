import { CGFobject,CGFshader,CGFappearance,CGFtexture } from "../../../lib/CGF.js";
import { MyQuad } from "../primitives/MyQuad.js";
import { MyHUDButton } from "./MyHUDButton.js";

/**
 * MyHUD class, representing the HUD.
 * @constructor
 * @param {CGFscene} scene - MyScene object
 */
export class MyHUD extends CGFobject {
    constructor(scene, player0, player1) {
        super(scene);
        this.scene = scene;
        this.quad = new MyQuad(this.scene);

        this.undoButton = new MyHUDButton(this, -40, -18, 201, "UNDO");
        this.changeSceneButton = new MyHUDButton(this, -40, -17, 202, "CHANGE SCENE");
        this.changeCamerasButton = new MyHUDButton(this, -40, -16, 203, "ENABLE CHANGE CAMERAS");

        this.player0 = player0;
        this.player1 = player1;
        
        this.initShader();
        this.initAppearance();
    }

    initShader() {
        this.shader = new CGFshader(this.scene.gl, 'view/shaders/vert/hud.vert', 'view/shaders/frag/hud.frag');
        this.shader.setUniformsValues({'dims': [16, 16]});
    }

    initAppearance() {
        this.textAppearance = new CGFappearance(this.scene);
		this.fontTexture = new CGFtexture(this.scene, "scenes/images/oolite-font.trans.png");
		this.textAppearance.setTexture(this.fontTexture);
    }

    display() {
        // Always draw in front of everything
        this.scene.gl.disable(this.scene.gl.DEPTH_TEST);

        // Apply shader and appearance
        this.scene.setActiveShaderSimple(this.shader);
        this.textAppearance.apply();

        this.scene.pushMatrix();

        this.scene.loadIdentity();

        this.undoButton.display();
        this.changeSceneButton.display();
        this.changeCamerasButton.display();

        this.displayStringAt(`PLAYER ${this.player0.number}: ${this.player0.captured}`, -40, 19);
        this.displayStringAt(`PLAYER ${this.player1.number}: ${this.player1.captured}`, -40, 18);

        // Reset to default shader and appearance
        this.scene.setActiveShaderSimple(this.scene.defaultShader);
        this.scene.setDefaultAppearance();

        // Reset depth test
        this.scene.gl.enable(this.scene.gl.DEPTH_TEST);
    }

    displayStringAt(string, x, y) {
        this.scene.pushMatrix();
        this.scene.translate(x, y, -50);
        this.displayString(string);
        this.scene.popMatrix();
    }

    displayString(string) {
        for(let i = 0; i < string.length; i++) {
            this.scene.pushMatrix();
            this.scene.translate(i, 0, 0);
            this.scene.activeShader.setUniformsValues({'charCoords': this.getCharCoords(string[i])});
            this.quad.display();
            this.scene.popMatrix();
        }
    }

    getCharCoords(char) {
        return [char.charCodeAt(0) % 16, Math.floor(char.charCodeAt(0) / 16)]
    }

    switchChangeCamerasButton() {
        if (this.changeCamerasButton.string == "ENABLE CHANGE CAMERAS") {
            this.changeCamerasButton.string = "DISABLE CHANGE CAMERAS";
        } else {
            this.changeCamerasButton.string = "ENABLE CHANGE CAMERAS";
        }
    }
}