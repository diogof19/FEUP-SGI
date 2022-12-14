import { CGFobject } from '../../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';

export class MyPiece extends CGFobject {
    constructor(scene, x, y, appearance) {
        super(scene);
        this.x = x;
        this.y = y;
        this.appearance = appearance;
        this.sphere = new MySphere(scene, null, 0.5, 20, 20);
    }

    display() {
        this.appearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, 0.1);
        this.sphere.display();
        this.scene.popMatrix();
    }
}