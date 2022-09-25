import { CGFobject } from "../lib/CGF.js";

export class MySphere extends CGFobject {
    constructor(scene, id, radius, slices, stacks) {
        super(scene);
        this.radius = radius;
        this.stacks = stacks;
        this.slices = slices / 4;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        let phi = 0;
        let theta = 0;
        let phiInc = Math.PI / (2 * this.stacks);
        let thetaInc = Math.PI / (2 * this.slices);
        let index = 0;
    
        // Make trigonometric calculations only for an octant of the sphere
        for (let latitude = 0; latitude < this.stacks; latitude++) {
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);

            let nextPhi = phi + phiInc;

            let sinNextPhi = Math.sin(nextPhi);
            let cosNextPhi = Math.cos(nextPhi);
        
            // in each stack, build all the slices around, starting on longitude 0
            theta = 0;

            for (let longitude = 0; longitude < this.slices; longitude++) {
                let sinTheta = Math.sin(theta);
                let cosTheta = Math.cos(theta);

                let nextTheta = theta + thetaInc;

                let sinNextTheta = Math.sin(nextTheta);
                let cosNextTheta = Math.cos(nextTheta);

                let z1 = this.radius * cosPhi;
                let z2 = this.radius * cosNextPhi;

                let x1 = this.radius * sinPhi * cosTheta;
                let x2 = this.radius * sinNextPhi * cosTheta;
                let x3 = this.radius * sinNextPhi * cosNextTheta;
                let x4 = this.radius * sinPhi * cosNextTheta;

                let y1 = this.radius * sinPhi * sinTheta;
                let y2 = this.radius * sinNextPhi * sinTheta;
                let y3 = this.radius * sinNextPhi * sinNextTheta;
                let y4 = this.radius * sinPhi * sinNextTheta;

                this.vertices.push(
                    // 1st Octant
                    x1, y1, z1,
                    x2, y2, z2,
                    x3, y3, z2,
                    x4, y4, z1,
                    // 2nd Octant
                    -x1, y1, z1,
                    -x2, y2, z2,
                    -x3, y3, z2,
                    -x4, y4, z1,
                    // 3rd Octant
                    -x1, -y1, z1,
                    -x2, -y2, z2,
                    -x3, -y3, z2,
                    -x4, -y4, z1,
                    // 4th Octant
                    x1, -y1, z1,
                    x2, -y2, z2,
                    x3, -y3, z2,
                    x4, -y4, z1,
                    // 5th Octant
                    x1, y1, -z1,
                    x2, y2, -z2,
                    x3, y3, -z2,
                    x4, y4, -z1,
                    // 6th Octant
                    -x1, y1, -z1,
                    -x2, y2, -z2,
                    -x3, y3, -z2,
                    -x4, y4, -z1,
                    // 7th Octant
                    -x1, -y1, -z1,
                    -x2, -y2, -z2,
                    -x3, -y3, -z2,
                    -x4, -y4, -z1,
                    // 8th Octant
                    x1, -y1, -z1,
                    x2, -y2, -z2,
                    x3, -y3, -z2,
                    x4, -y4, -z1,
                );
                this.normals.push(
                    // 1st Octant
                    sinPhi * cosTheta, sinPhi * sinTheta, cosPhi,
                    sinNextPhi * cosTheta, sinNextPhi * sinTheta, cosNextPhi,
                    sinNextPhi * cosNextTheta, sinNextPhi * sinNextTheta, cosNextPhi,
                    sinPhi * cosNextTheta, sinPhi * sinNextTheta, cosPhi,
                    // 2nd Octant
                    -sinPhi * cosTheta, sinPhi * sinTheta, cosPhi,
                    -sinNextPhi * cosTheta, sinNextPhi * sinTheta, cosNextPhi,
                    -sinNextPhi * cosNextTheta, sinNextPhi * sinNextTheta, cosNextPhi,
                    -sinPhi * cosNextTheta, sinPhi * sinNextTheta, cosPhi,
                    // 3rd Octant
                    -sinPhi * cosTheta, -sinPhi * sinTheta, cosPhi,
                    -sinNextPhi * cosTheta, -sinNextPhi * sinTheta, cosNextPhi,
                    -sinNextPhi * cosNextTheta, -sinNextPhi * sinNextTheta, cosNextPhi,
                    -sinPhi * cosNextTheta, -sinPhi * sinNextTheta, cosPhi,
                    // 4th Octant
                    sinPhi * cosTheta, -sinPhi * sinTheta, cosPhi,
                    sinNextPhi * cosTheta, -sinNextPhi * sinTheta, cosNextPhi,
                    sinNextPhi * cosNextTheta, -sinNextPhi * sinNextTheta, cosNextPhi,
                    sinPhi * cosNextTheta, -sinPhi * sinNextTheta, cosPhi,
                    // 5th Octant                    
                    sinPhi * cosTheta, sinPhi * sinTheta, -cosPhi,
                    sinNextPhi * cosTheta, sinNextPhi * sinTheta, -cosNextPhi,
                    sinNextPhi * cosNextTheta, sinNextPhi * sinNextTheta, -cosNextPhi,
                    sinPhi * cosNextTheta, sinPhi * sinNextTheta, -cosPhi,
                    // 6th Octant
                    -sinPhi * cosTheta, sinPhi * sinTheta, -cosPhi,
                    -sinNextPhi * cosTheta, sinNextPhi * sinTheta, -cosNextPhi,
                    -sinNextPhi * cosNextTheta, sinNextPhi * sinNextTheta, -cosNextPhi,
                    -sinPhi * cosNextTheta, sinPhi * sinNextTheta, -cosPhi,
                    // 7th Octant
                    -sinPhi * cosTheta, -sinPhi * sinTheta, -cosPhi,
                    -sinNextPhi * cosTheta, -sinNextPhi * sinTheta, -cosNextPhi,
                    -sinNextPhi * cosNextTheta, -sinNextPhi * sinNextTheta, -cosNextPhi,
                    -sinPhi * cosNextTheta, -sinPhi * sinNextTheta, -cosPhi,
                    // 8th Octant
                    sinPhi * cosTheta, -sinPhi * sinTheta, -cosPhi,
                    sinNextPhi * cosTheta, -sinNextPhi * sinTheta, -cosNextPhi,
                    sinNextPhi * cosNextTheta, -sinNextPhi * sinNextTheta, -cosNextPhi,
                    sinPhi * cosNextTheta, -sinPhi * sinNextTheta, -cosPhi,
                );
                this.indices.push(
                    // 1st Octant
                    index, index + 1, index + 2,
                    index + 2, index + 3, index,
                    // 2nd Octant
                    index + 6, index + 5, index + 4,
                    index + 4, index + 7, index + 6,
                    // 3rd Octant
                    index + 8, index + 9, index + 10,
                    index + 10, index + 11, index + 8,
                    // 4th Octant
                    index + 14, index + 13, index + 12,
                    index + 12, index + 15, index + 14,
                    // 5th Octant
                    index + 18, index + 17, index + 16,
                    index + 16, index + 19, index + 18,
                    // 6th Octant
                    index + 20, index + 21, index + 22,
                    index + 22, index + 23, index + 20,
                    // 7th Octant
                    index + 26, index + 25, index + 24,
                    index + 24, index + 27, index + 26,
                    // 8th Octant
                    index + 28, index + 29, index + 30,
                    index + 30, index + 31, index + 28,
                );

                theta += thetaInc
                index += 32;
            }

            phi += phiInc;
        }
    
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}

}