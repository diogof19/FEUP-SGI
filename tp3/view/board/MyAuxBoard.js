import { CGFobject } from '../../../lib/CGF.js';
import { MyPatch } from '../primitives/MyPatch.js';
import { MyPiece } from './MyPiece.js';

/**
 * MyAuxBoard class, representing a player's auxiliary board.
 * @constructor
 * @param {CGFscene} scene - MyScene object
 * @param {CGFtexture} boardTexture - Board texture
 * @param {CGFappearance} boardMaterial - Board material
 * @param {MyBoard} board - Board model
 * @param {Number} playerNum - Player number
 */
export class MyAuxBoard extends CGFobject {
    constructor(scene, boardTexture, boardMaterial, board, playerNum){
        super(scene);

        this.boardTexture = boardTexture;
        this.boardMaterial = boardMaterial;
        this.board = board;
        this.playerNum = playerNum;
        this.pieces = [];

        this.createBoard();
    }

    /**
     * Create inital board
     */
    createBoard(){
        if(this.playerNum == 1){
            this.baseX = 9.0;
            this.incrementX = 2.0;

            this.baseY = 0.0;
            this.incrementY = 5.0;
        }
        else{
            this.baseX = -1.0;
            this.incrementX = -2.0;

            this.baseY = 8.0;
            this.incrementY = -5.0;
        }

        
        this.patch = new MyPatch(this.scene, null, 1, 20, 1, 20, [
            [
                [this.baseX, this.baseY, 0.0, 1 ],
                [this.baseX, this.baseY + this.incrementY, 0.0, 1 ]
                
            ],
            [
                [this.baseX + this.incrementX, this.baseY, 0.0, 1 ],
                [this.baseX + this.incrementX, this.baseY + this.incrementY, 0.0, 1 ]							 
            ]
        ]);
    }

    /**
     * Calculates the position where a new captured piece should be placed
     * @returns [x, y, z] of new piece
     */
    calculateNewPiecePosition(){
        let x = this.baseX + this.incrementX/2;

        if(this.playerNum == 1)
            var y = this.baseY + 1.0 + this.pieces.length % 4;
        else
            var y = this.baseY - 1.0 - this.pieces.length % 4;

        let z = 0.2 * Math.floor(this.pieces.length / 4);

        return [x, y, z];
    }

    /**
     * Add piece to aux board
     */
    addPiece(){
        var [x, y, _] = this.calculateNewPiecePosition();

        this.pieces.push(new MyPiece(this.scene, x, y, this.board.opponent.appearance));
    }

    /**
     * Resets the board
     */
    resetPieces(){
        this.pieces = [];
        for(let i = 0; i < this.board.numPieces; i++)
            this.addPiece();
    }   

    /**
     * Display the board
     */
    display(){
        this.boardMaterial.setTexture(this.boardTexture);
        this.boardMaterial.apply();
        
        this.patch.display();

        this.pieces.forEach((piece, index) => {
            this.scene.pushMatrix();
            
            if(index >= 0 && index <= 3)
                var factor = 0;
            else if(index >= 4 && index <= 7)
                var factor = 1;
            else var factor = 2;

            this.scene.translate(0, 0, factor * 0.2);
            
            piece.display();

            this.scene.popMatrix();
        });
    }
}