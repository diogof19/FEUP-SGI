import { CGFobject } from '../lib/CGF.js';

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
        var nZ = (this.base - this.top) / this.height;

		for(var stack = 0; stack <= this.stacks; stack++){

            var vZ = stack * this.height / this.stacks;
            for(var slice = 0; slice <= this.slices; slice++){
                var alpha = Math.PI * 2 * slice / this.slices;
                
                var cos = Math.cos(alpha);
                var sin = Math.sin(alpha);

                var vX = cos * radius;
                var vY = sin * radius;
                
                this.vertices.push(vX, vY, vZ);

                var normal = vec3.create();
                normal = vec3.fromValues(cos, sin, nZ);
                var normalized = vec3.create();
                normalized = vec3.normalize(normalized, normal);

                this.normals.push(normalized.x, normalized.y, normalized.z);

                if(stack != this.stacks && slice != this.slices){
                    var v1 = (this.slices + 1) * stack + slice;
                    var v2 = v1 + 1;
                    var v3 = (this.slices + 1) * (stack + 1) + slice;
                    var v4 = v3 + 1;

                    this.indices.push(v1, v2, v4);
                    this.indices.push(v4, v3, v1);
                }

                this.texCoords.push(slice / this.slices, stack / this.stacks);
            }

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

