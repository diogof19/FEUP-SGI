import { CGFobject } from '../../../lib/CGF.js';
import { MyCylinder } from '../primitives/MyCylinder.js';
import { MyPatch } from '../primitives/MyPatch.js';

export class MyPiece extends CGFobject {
    constructor(scene, x, y, appearance) {
        super(scene);
        this.x = x;
        this.y = y;
        this.appearance = appearance;
        this.cylinder = new MyCylinder(scene, null, 0.5, 0.5, 0.2, 20, 20);
        this.cylinderTopHalfOne = new MyPatch(scene, null, 3, 20, 1, 20, [
            [
                [0, 0, 0.2, 1],
                [0, 1.5/3, 0.2, 1]
            ],
            [
                [2/3, 0, 0.2, 1],
                [2/3, 1.5/3, 0.2, 1]
            ],
            [
                [2/3, 0, 0.2, 1],
                [2/3, -1.5/3, 0.2, 1]
            ],
            [
                [0, 0, 0.2, 1],
                [0, -1.5/3, 0.2, 1]
            ]
        ]);
    }

    display(animation) {
        this.appearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, 0.1);

        if (animation != null){
            animation.apply();
        }
            
        this.cylinder.display();
        this.cylinderTopHalfOne.display();
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.cylinderTopHalfOne.display();
        this.scene.popMatrix();
    }
}