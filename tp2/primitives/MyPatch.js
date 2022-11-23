import { CGFobject, CGFnurbsSurface, CGFnurbsObject } from '../../lib/CGF.js';

/**
 * MyPatch class, which represents a NURBS primitive
 * @extends CGFobject
 * @constructor
 * @param {CGFscene} scene - MyScene object
 * @param {String} id - ID of the primitive
 * @param {Number} orderU - Order of the surface in the U direction
 * @param {Number} orderV - Order of the surface in the V direction
 * @param {Number} partsU - Number of parts in the U direction
 * @param {Number} partsV - Number of parts in the V direction
 * @param {Array} controlPoints - Array of control points
 */
export class MyPatch extends CGFobject {
	constructor(scene, id, degreeU, partsU, degreeV, partsV, controlPoints) {
		super(scene);
        this.id = id;
		this.degreeU = degreeU;
        this.partsU = partsU;
        this.degreeV = degreeV;
        this.partsV = partsV;
        this.controlPoints = controlPoints;
		
        this.object = this.makeSurface();
	}
	
	/**
	 * Creates the surface
	 * @returns {CGFnurbsObject} Patch object
	 */
	makeSurface(){
        var nurbsSurface = new CGFnurbsSurface(this.degreeU, this.degreeV, this.controlPoints);
		return new CGFnurbsObject(this.scene, this.partsU, this.partsV, nurbsSurface);
    }

	/**
	 * Displays the object
	 */
    display(){
        this.object.display();
    }

    /**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the patch
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(length_s, length_t) {
		this.updateTexCoordsGLBuffers();
	}
}

