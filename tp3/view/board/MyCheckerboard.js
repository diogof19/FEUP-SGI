import { CGFobject,CGFtexture } from '../../../lib/CGF.js';
import { MySquare } from './MySquare.js';
import { MyPiece } from './MyPiece.js';

export class MyCheckerboard extends CGFobject {
    constructor(scene, darkTexture, lightTexture, darkMaterial, lightMaterial, board, auxBoardView0, auxBoardView1) {
        super(scene);

        this.darkTexture = darkTexture;
        this.lightTexture = lightTexture;
        this.darkMaterial = darkMaterial;
        this.lightMaterial = lightMaterial;
        this.board = board;
        this.auxBoardView0 = auxBoardView0;
        this.auxBoardView1 = auxBoardView1;
        this.registerForPick = true;
        this.currentAnimation = null;

        this.setBoardSquares();

        this.setBoardViewPieces();

        this.replaySquare = new MySquare(this.scene, this, -2, 0, false);
        this.replaySquare.setTexture(new CGFtexture(this.scene, "scenes/images/replay.jpg"));
    }

    setBoardSquares() {
        let squares = [];

        for(let row = 0; row < 8; row++) {
            squares.push([]);
            if (row % 2 == 0) {
                for(let col = 0; col < 8; col++) {
                    squares[row].push(new MySquare(this.scene, this, col, row, col % 2 == 0));
                }
            }
            else {
                for(let col = 0; col < 8; col++) {
                    squares[row].push(new MySquare(this.scene, this, col, row, col % 2 != 0));
                }
            }
        }

        this.squares = squares;
    }

    toggleSelectSquare(squareId) {
        let coords = this.getCoords(squareId);

        this.getSquare(coords[0], coords[1]).toggleSelect();
    }

    deselectAllSquares() {
        this.squares.forEach(row => {
            row.forEach(square => {
                square.deselect();
            });
        });
    }

    getCoords(squareId) {
        let row = Math.floor((squareId - 1)/ 10);
        let col = (squareId - 1) % 10;

        return [row, col];
    }

    getSquare(row, col) {
        return this.squares[row][col];
    }

    display() {        
        // Only register for pick if there is no animation
        this.registerForPick = this.currentAnimation == null;

        for(let row = 0; row < 8; row++) {
            for(let col = 0; col < 8; col++) {
                // id = row * 10 + col + 1
                // object on row 1, col 2 has id 12
                // indices start at 1
                let piece = this.board.getPiece(row, col);
                if(this.registerForPick && (piece == null || piece.playerNumber == this.board.currentPlayer.number))
                    this.scene.registerForPick(row * 10 + col + 1, this.squares[row][col]);

                if(this.currentAnimation != null) {
                    if(this.currentAnimation.oldCoords[0] == col && this.currentAnimation.oldCoords[1] == row)
                        this.squares[row][col].display(this.currentAnimation.moveAnimation);
                    else if(this.currentAnimation.capturedPiece != null && this.currentAnimation.capturedPiece[0] == col && this.currentAnimation.capturedPiece[1] == row)
                        this.squares[row][col].display(this.currentAnimation.capturedPieceAnimation);
                    else this.squares[row][col].display();
                }
                else this.squares[row][col].display();
            }
        }

        if (this.registerForPick) {
            this.scene.registerForPick(101, this.replaySquare);
        }
        this.replaySquare.display();
    }

    update(t) {
        if(this.currentAnimation != null) {
            this.currentAnimation.update(t);

            if(this.scene.instant >= this.currentAnimation.moveAnimation.keyframes[this.currentAnimation.moveAnimation.keyframes.length - 1].instant){
                this.currentAnimation = null;
                this.setBoardViewPieces();
                this.auxBoardView0.resetPieces();
                this.auxBoardView1.resetPieces();
            }
        }
    }


    setBoardViewPieces() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let square = this.getSquare(i, j);
                if (this.board.board[i][j] !== null) {
                    let coords = square.getMiddle();
                    square.setPiece(new MyPiece(this.scene, coords[0], coords[1], (this.board.board[i][j].playerNumber == this.board.player0.number ? this.board.player0.appearance : this.board.player1.appearance)));
                }
                else {
                    square.setPiece(null);
                }
            }
        }
    }

    setAnimation(animation) {
        this.currentAnimation = animation;
    }
}