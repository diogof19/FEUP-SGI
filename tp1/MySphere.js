import { CGFobject } from "../lib/CGF.js";

export class MySphere extends CGFobject {
    constructor(scene, id, radius, slices, stacks) {
        super(scene);
        this.radius = radius;
        this.stacks = stacks;
        this.slices = slices;

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
        let thetaInc = (2 * Math.PI) / this.slices;
        let index = 0;
        let verticesByStack = this.slices * 2;
    
        for (let latitude = 0; latitude <= this.stacks; latitude++) {
            // Don't repeat points at the poles of the sphere
            if (latitude === 0) {
                this.vertices.push(
                    0, 0, this.radius,
                    0, 0, -this.radius
                );
                this.normals.push(
                    0, 0, 1,
                    0, 0, -1,
                );
                index += 2;
            }
            else {
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                theta = 0;

                for (let longitude = 0; longitude < this.slices; longitude++) {
                    let sinTheta = Math.sin(theta);
                    let cosTheta = Math.cos(theta);

                    let z1 = this.radius * cosPhi;
                    let x1 = this.radius * sinPhi * cosTheta;
                    let y1 = this.radius * sinPhi * sinTheta;

                    this.vertices.push(
                        x1, y1, z1,
                        x1, y1, -z1,
                    );
                    this.normals.push(
                        sinPhi * cosTheta, sinPhi * sinTheta, cosPhi,                 
                        sinPhi * cosTheta, sinPhi * sinTheta, -cosPhi,
                    );

                    if (longitude == this.slices - 1) {
                        // Use triagles instead of quadrilaterals at the poles of the sphere
                        if (phi === phiInc) {
                            this.indices.push(
                                // North
                                0, index, index - verticesByStack + 2,
                                // South
                                1, index + 1 - verticesByStack + 2, index + 1
                            );
                        }
                        else {
                            this.indices.push(
                                // North
                                index - verticesByStack, index, index - verticesByStack + 2,
                                index - verticesByStack + 2, index - verticesByStack * 2 + 2, index - verticesByStack,
                                // South
                                index + 1 - verticesByStack + 2, index + 1, index + 1 - verticesByStack,
                                index + 1 - verticesByStack, index + 1 - verticesByStack * 2 + 2, index + 1 - verticesByStack + 2,
                            );
                        }
                    }
                    else {
                        // Use triagles instead of quadrilaterals at the poles of the sphere
                        if (phi === phiInc) {
                            this.indices.push(
                                // North
                                0, index, index + 2,
                                // South
                                index + 1 + 2, index + 1, 1,  
                            );
                            this.texCoords.push(

                            );
                        }
                        else {
                            this.indices.push(
                                // North
                                index - verticesByStack, index, index + 2,
                                index + 2, index - verticesByStack + 2, index - verticesByStack,
                                // South
                                index + 1, index + 1 - verticesByStack, index + 1 - verticesByStack + 2,
                                index + 1 - verticesByStack + 2, index + 1 + 2, index + 1,
                            );
                        }
                    }
                    theta += thetaInc;
                    index += 2;
                }
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