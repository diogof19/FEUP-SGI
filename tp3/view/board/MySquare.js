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
        this.x = x;
        this.y = y;
        this.patch = new MyPatch(this.scene, 0, 1, 20, 1, 20, [
            [
                [x, y, 0, 1],
                [x, y + 1, 0, 1]
            ],
            [
                [x + 1, y, 0, 1],
                [x + 1, y + 1, 0, 1]
            ]
        ]);        
        this.material = dark ? board.darkMaterial : board.lightMaterial;
        this.texture = dark ? board.darkTexture : board.lightTexture;
        this.selected = false;
        this.piece = null;
    }

    toggleSelect() {
        this.selected = !this.selected;
    }

    deselect() {
        this.selected = false;
    }

    setPiece(piece) {
        this.piece = piece;
    }

    getMiddle() {
        return [this.x + 0.5, this.y + 0.5];
    }
    
    display(animation = null) {
        if (this.selected) {
            this.scene.setActiveShader(this.scene.highlightingShader);
            this.scene.highlightingShader.setUniformsValues({ uHighlightColor: [1.0, 0.0, 0.0] });
            this.scene.highlightingShader.setUniformsValues({ uHighlightScale: 1.0 });
            this.scene.highlightingShader.setUniformsValues({ uMaterialColor: [-1.0, -1.0, -1.0] });
        }
        this.material.setTexture(this.texture);
        this.material.apply();
        this.patch.display();
        if (this.piece != null) {
            this.piece.display(animation);
        }
        if (this.selected) {
            this.scene.setActiveShader(this.scene.defaultShader);
        }
    }
}