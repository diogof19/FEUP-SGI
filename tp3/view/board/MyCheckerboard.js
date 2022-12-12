import { CGFobject } from '../../../lib/CGF.js';
import { MySquare } from './MySquare.js';

export class MyCheckerboard extends CGFobject {
    constructor(scene, darkTexture, lightTexture, darkMaterial, lightMaterial) {
        super(scene);

        this.darkTexture = darkTexture;
        this.lightTexture = lightTexture;
        this.darkMaterial = darkMaterial;
        this.lightMaterial = lightMaterial;

        this.squares = [
            [
                new MySquare(scene, this, 0, 0, true), new MySquare(scene, this, 1, 0, false), 
                new MySquare(scene, this, 2, 0, true), new MySquare(scene, this, 3, 0, false), 
                new MySquare(scene, this, 4, 0, true), new MySquare(scene, this, 5, 0, false), 
                new MySquare(scene, this, 6, 0, true), new MySquare(scene, this, 7, 0, false)
            ],
            [
                new MySquare(scene, this, 0, 1, false), new MySquare(scene, this, 1, 1, true), 
                new MySquare(scene, this, 2, 1, false), new MySquare(scene, this, 3, 1, true), 
                new MySquare(scene, this, 4, 1, false), new MySquare(scene, this, 5, 1, true), 
                new MySquare(scene, this, 6, 1, false), new MySquare(scene, this, 7, 1, true)
            ],
            [
                new MySquare(scene, this, 0, 2, true), new MySquare(scene, this, 1, 2, false), 
                new MySquare(scene, this, 2, 2, true), new MySquare(scene, this, 3, 2, false), 
                new MySquare(scene, this, 4, 2, true), new MySquare(scene, this, 5, 2, false), 
                new MySquare(scene, this, 6, 2, true), new MySquare(scene, this, 7, 2, false)
            ],
            [
                new MySquare(scene, this, 0, 3, false), new MySquare(scene, this, 1, 3, true), 
                new MySquare(scene, this, 2, 3, false), new MySquare(scene, this, 3, 3, true), 
                new MySquare(scene, this, 4, 3, false), new MySquare(scene, this, 5, 3, true), 
                new MySquare(scene, this, 6, 3, false), new MySquare(scene, this, 7, 3, true)
            ],
            [
                new MySquare(scene, this, 0, 4, true), new MySquare(scene, this, 1, 4, false), 
                new MySquare(scene, this, 2, 4, true), new MySquare(scene, this, 3, 4, false), 
                new MySquare(scene, this, 4, 4, true), new MySquare(scene, this, 5, 4, false), 
                new MySquare(scene, this, 6, 4, true), new MySquare(scene, this, 7, 4, false)
            ],
            [
                new MySquare(scene, this, 0, 5, false), new MySquare(scene, this, 1, 5, true), 
                new MySquare(scene, this, 2, 5, false), new MySquare(scene, this, 3, 5, true), 
                new MySquare(scene, this, 4, 5, false), new MySquare(scene, this, 5, 5, true), 
                new MySquare(scene, this, 6, 5, false), new MySquare(scene, this, 7, 5, true)
            ],
            [
                new MySquare(scene, this, 0, 6, true), new MySquare(scene, this, 1, 6, false), 
                new MySquare(scene, this, 2, 6, true), new MySquare(scene, this, 3, 6, false), 
                new MySquare(scene, this, 4, 6, true), new MySquare(scene, this, 5, 6, false), 
                new MySquare(scene, this, 6, 6, true), new MySquare(scene, this, 7, 6, false)
            ],
            [
                new MySquare(scene, this, 0, 7, false), new MySquare(scene, this, 1, 7, true), 
                new MySquare(scene, this, 2, 7, false), new MySquare(scene, this, 3, 7, true), 
                new MySquare(scene, this, 4, 7, false), new MySquare(scene, this, 5, 7, true), 
                new MySquare(scene, this, 6, 7, false), new MySquare(scene, this, 7, 7, true)
            ]
        ];
    }

    toggleSelectSquare(squareId) {
        let row = Math.floor(squareId / 10);
        let col = squareId % 10;

        this.squares[row][col].toggleSelect();
    }

    getSquare(squareId) {
        let row = Math.floor(squareId / 10);
        let col = squareId % 10;

        return this.squares[row][col];
    }

    getSquare(row, col) {
        return this.squares[row][col];
    }

    display() {
        this.scene.clearPickRegistration();

        for(let row = 0; row < 8; row++) {
            for(let col = 0; col < 8; col++) {
                // id = row * 10 + col
                // object on row 1, col 2 has id 12
                this.scene.registerForPick(row * 10 + col, this.squares[row][col]);
                this.squares[row][col].display();
            }
        }
    }
}