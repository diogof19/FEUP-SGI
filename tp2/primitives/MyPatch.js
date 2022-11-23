import { CGFobject, CGFnurbsSurface, CGFnurbsObject } from '../../lib/CGF.js';

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
	
	makeSurface(){
        var nurbsSurface = new CGFnurbsSurface(this.degreeU, this.degreeV, this.controlPoints);
		return new CGFnurbsObject(this.scene, this.partsU, this.partsV, nurbsSurface);
    }

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

