import { CGFobject } from '../lib/CGF.js';

export class MyTriangle extends CGFobject {
	constructor(scene, id, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
		super(scene);
		this.x1 = x1;
		this.y1 = y1;
        this.z1 = z1;
        this.x2 = x2;
        this.y2 = y2;
        this.z2 = z2;
        this.x3 = x3;
        this.y3 = y3;
        this.z3 = z3;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			this.x1, this.y1, this.z1,
            this.x2, this.y2, this.z2,
            this.x3, this.y3, this.z3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2
		];

        var vectorU = vec3.create();
        var vectorV = vec3.create();
        vec3.subtract(vectorU, vec3.fromValues(this.x2, this.y2, this.z2), vec3.fromValues(this.x1, this.y1, this.z1));
        vec3.subtract(vectorV, vec3.fromValues(this.x3, this.y3, this.z3), vec3.fromValues(this.x1, this.y1, this.z1));

        var normal = vec3.create();
		vec3.cross(normal, vectorU, vectorV);

        this.normals = [
            normal[0], normal[1], normal[2],
            normal[0], normal[1], normal[2],
            normal[0], normal[1], normal[2]
        ]

        var a = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2) + Math.pow(this.z2 - this.z1, 2));
        var b = Math.sqrt(Math.pow(this.x3 - this.x2, 2) + Math.pow(this.y3 - this.y2, 2) + Math.pow(this.z3 - this.z2, 2));
        var c = Math.sqrt(Math.pow(this.x1 - this.x3, 2) + Math.pow(this.y1 - this.y3, 2) + Math.pow(this.z1 - this.z3, 2));

        var cosAlpha = (Math.pow(a, 2) - Math.pow(b, 2) + Math.pow(c, 2)) / (2 * a * c)
        var sinAlpha = Math.sqrt(1 - Math.pow(cosAlpha, 2));

		this.texCoords = [
            0, 0,
            a, 0,
            c * cosAlpha, c * sinAlpha
        ]

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(length_s, length_t) {
		var newCoords = [];

		for(var i = 0; i < this.texCoords.length; i++){
			if(i % 2 == 0){
				newCoords[i] = this.texCoords[i] / length_s;
			}
			else newCoords[i] = this.texCoords[i] / length_t;
		}

		this.texCoords = newCoords;

		this.updateTexCoordsGLBuffers();
	}
}

