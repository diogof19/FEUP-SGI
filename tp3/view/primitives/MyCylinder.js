import { CGFobject } from '../../../lib/CGF.js';

/**
 * MyCylinder class, which represents a cylinder primitive
 * @extends CGFobject
 * @constructor
 * @param {CGFscene} scene - MyScene object
 * @param {String} id - ID of the primitive
 * @param {Number} base - Cylinder base radius
 * @param {Number} top - Cylinder top radius
 * @param {Number} height - Cylinder height
 * @param {Number} slices - Number of slices
 * @param {Number} stacks - Number of stacks
 */
export class MyCylinder extends CGFobject {
	constructor(scene, id, base, top, height, slices, stacks) {
		super(scene);
		this.base = base;
        this.top = top;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var radiusIncrement = (this.top - this.base) / this.stacks;
        var radius = this.base;

        let tan = (this.base - this.top) / this.height;

        let angle = Math.atan(tan);
        let nZ = Math.sin(angle);
        let nXY = Math.cos(angle);

        // Bottom to top
		for(var stack = 0; stack <= this.stacks; stack++){
            // Current stack height
            var vZ = stack * this.height / this.stacks;

            // Create a new circle
            for(var slice = 0; slice <= this.slices; slice++){
                // Current slice angle
                var alpha = Math.PI * 2 * slice / this.slices;
                
                var cos = Math.cos(alpha);
                var sin = Math.sin(alpha);

                var vX = cos * radius;
                var vY = sin * radius;
                
                // Vertices
                this.vertices.push(vX, vY, vZ);

                let normal = [nXY * cos, nXY * sin, nZ];

                // Normals
                this.normals.push(...normal);

                // Indices
                if(stack != this.stacks && slice != this.slices){
                    var v1 = (this.slices + 1) * stack + slice;
                    var v2 = v1 + 1;
                    var v3 = (this.slices + 1) * (stack + 1) + slice;
                    var v4 = v3 + 1;

                    this.indices.push(v1, v2, v4);
                    this.indices.push(v4, v3, v1);
                }

                // Texture coordinates
                this.texCoords.push(slice / this.slices, stack / this.stacks);
            }

            // Update radius
            radius += radiusIncrement;
        }
		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(length_s, length_t) {
		this.updateTexCoordsGLBuffers();
	}
}

