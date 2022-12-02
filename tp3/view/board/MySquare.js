import { CGFobject } from '../../../lib/CGF.js';
import { MyCheckerboard } from './MyCheckerboard.js';
import { MyPatch } from '../primitives/MyPatch.js';

/**
 * MySquare class, which represents a square on the checkerboard
 * @extends CGFobject
 * @constructor
 * @param {CGFscene} scene - MyScene object
 * @param {MyCheckerboard} board - Checkerboard object
 * @param {Number} x - X coordinate of the square
 * @param {Number} y - Y coordinate of the square
 * @param {Boolean} dark - Whether the square is dark or not
 */
export class MySquare extends CGFobject {
    constructor(scene, board, x, y, dark) {
        super(scene);
        this.scene = scene;
        //this.id = id;
        this.x = x;
        this.y = y;
        this.patch = new MyPatch(this.scene, 0, 1, 20, 1, 20, [
            [
                [x, y, 0, 1],
                [x + 1, y, 0, 1]
            ],
            [
                [x, y + 1, 0, 1],
                [x + 1, y + 1, 0, 1]
            ]
        ]);
        
        this.material = dark ? board.darkMaterial : board.lightMaterial;
        this.texture = dark ? board.darkTexture : board.lightTexture;
        this.piece = null;
    }
    
    display() {
        this.material.setTexture(this.texture);
        this.material.apply();

        this.patch.display();
    }
}