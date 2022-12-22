import { CGFobject,CGFtexture } from '../../../lib/CGF.js';
import { MySquare } from './MySquare.js';
import { MyPiece } from './MyPiece.js';
import { MyCameraAnimation } from '../animations/MyCameraAnimation.js';

/**
 * MyCheckerboard class, representing the game board.
 * @constructor
 * @param {CGFscene} scene - MyScene object
 * @param {CGFtexture} darkTexture - Dark square texture
 * @param {CGFtexture} lightTexture - Light square texture
 * @param {CGFappearance} darkMaterial - Dark square material
 * @param {CGFappearance} lightMaterial - Light square material
 * @param {MyBoard} board - Board model
 * @param {MyAuxBoard} auxBoardView0 - Player 1's auxiliary board
 * @param {MyAuxBoard} auxBoardView1 - Player 2's auxiliary board
 * @param {Array} transformation - Transformation that were applied to the board
 */
export class MyCheckerboard extends CGFobject {
    constructor(scene, darkTexture, lightTexture, darkMaterial, lightMaterial, board, auxBoardView0, auxBoardView1, transformation) {
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
        this.transformation = transformation; //[translationX, translationY, scale] - to use for spotlight

        this.setBoardSquares();

        this.setBoardViewPieces();

        this.replaySquare = new MySquare(this.scene, this, -2, 0, false);
        this.replaySquare.setTexture(new CGFtexture(this.scene, "scenes/images/replay.jpg"));

        this.changeCameras = false;
        this.cameraAnimation = null;
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

    setSpotlight(col, row, enable) {


        var spotlight = this.scene.lights[0];

        var positionX = this.transformation[0] + ((col + 0.5) * this.transformation[2]);
        var positionZ = this.transformation[1] + ((-row - 0.5) * this.transformation[2]);

        spotlight.setPosition(positionX, 1, positionZ, 1);
        
        if(enable) spotlight.enable();
        else spotlight.disable();

    }

    toggleSelectSquare(squareId) {
        let coords = this.getCoords(squareId);

        var square = this.getSquare(coords[0], coords[1]);
        square.toggleSelect();

        if(this.board.getPiece(coords[0], coords[1]) != null)
            if(square.selected) this.setSpotlight(coords[1], coords[0], true);
            else this.setSpotlight(coords[1], coords[0], false);
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
        this.registerForPick = this.currentAnimation == null && this.cameraAnimation == null;

        if(this.cameraAnimation != null)
            this.cameraAnimation.apply();

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
                if(this.changeCameras) {
                    if(this.board.currentPlayer.number == 1)
                        this.cameraAnimation = new MyCameraAnimation(this.scene, this.scene.graph.views['playerOneCamera'], this.scene.graph.views['playerTwoCamera']);
                    else
                        this.cameraAnimation = new MyCameraAnimation(this.scene, this.scene.graph.views['playerTwoCamera'], this.scene.graph.views['playerOneCamera']);
                }
            }
        }

        if(this.cameraAnimation != null) {
            this.cameraAnimation.update(t);
            if(this.cameraAnimation.stopped){
                this.cameraAnimation = null;
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

    changeCamerasToggle() {
        this.changeCameras = !this.changeCameras;

        if(this.changeCameras)
            if(this.board.currentPlayer.number == 1)
                this.cameraAnimation = new MyCameraAnimation(this.scene, this.scene.graph.views[this.scene.graph.selectedCamera], this.scene.graph.views['playerOneCamera']);
            else
                this.cameraAnimation = new MyCameraAnimation(this.scene, this.scene.graph.views[this.scene.graph.selectedCamera], this.scene.graph.views['playerTwoCamera']);
        else
            this.cameraAnimation = new MyCameraAnimation(this.scene, this.scene.graph.views[this.scene.graph.selectedCamera], this.scene.graph.views['gameOverviewCamera']);
    }
}