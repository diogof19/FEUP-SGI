import { CGFobject } from "../../../lib/CGF.js";
import { MyRectangle } from "../primitives/MyRectangle.js";

/**
 * MyHUD class, representing the HUD.
 * @constructor
 * @param {CGFscene} scene - MyScene object
 */
export class MyHUD extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.rectangle = new MyRectangle(this.scene, null, -0.99, -0.80, -0.9, -0.8);
    }

    display() {
        this.rectangle.display();
    }
}