import { CGFobject } from "../../../lib/CGF.js";
import { MySphere } from "../primitives/MySphere.js";
import { MyRectangle } from "../primitives/MyRectangle.js";

export class MyHUD extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.rectangle = new MyRectangle(this.scene, null, -0.99, -0.80, -0.9, -0.8);
    }

    display() {
        this.scene.registerForPick(101, this.rectangle);
        this.rectangle.display();
    }
}