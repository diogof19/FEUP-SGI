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
        let verticesByStack = (this.slices * 4 + 4) * 2;
    
        // Make trigonometric calculations only for an octant of the sphere
        for (let latitude = 0; latitude <= this.stacks; latitude++) {
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

            
                // in each stack, build all the slices around, starting on longitude 0
                theta = 0;

                for (let longitude = 0; longitude <= this.slices; longitude++) {
                    let sinTheta = Math.sin(theta);
                    let cosTheta = Math.cos(theta);

                    let z1 = this.radius * cosPhi;

                    let x1 = this.radius * sinPhi * cosTheta;

                    let y1 = this.radius * sinPhi * sinTheta;

                    this.vertices.push(
                        // 1st Octant
                        x1, y1, z1,
                        // 2nd Octant
                        -x1, y1, z1,
                        // 3rd Octant
                        -x1, -y1, z1,
                        // 4th Octant
                        x1, -y1, z1,
                        // 5th Octant
                        x1, y1, -z1,
                        // 6th Octant
                        -x1, y1, -z1,
                        // 7th Octant
                        -x1, -y1, -z1,
                        // 8th Octant
                        x1, -y1, -z1,
                    );
                    this.normals.push(
                        // 1st Octant
                        sinPhi * cosTheta, sinPhi * sinTheta, cosPhi,
                        // 2nd Octant
                        -sinPhi * cosTheta, sinPhi * sinTheta, cosPhi,
                        // 3rd Octant
                        -sinPhi * cosTheta, -sinPhi * sinTheta, cosPhi,
                        // 4th Octant
                        sinPhi * cosTheta, -sinPhi * sinTheta, cosPhi,
                        // 5th Octant                    
                        sinPhi * cosTheta, sinPhi * sinTheta, -cosPhi,
                        // 6th Octant
                        -sinPhi * cosTheta, sinPhi * sinTheta, -cosPhi,
                        // 7th Octant
                        -sinPhi * cosTheta, -sinPhi * sinTheta, -cosPhi,
                        // 8th Octant
                        sinPhi * cosTheta, -sinPhi * sinTheta, -cosPhi,
                    );

                    // If loop is in last iteration skip making triangles with indices to next iteration as the will be none
                    if (longitude != this.slices) {
                        // Use triagles instead of quadrilaterals at the poles of the sphere
                        if (phi === phiInc) {
                            this.indices.push(
                                // 1st Octant
                                0, index, index + 8,
                                // 2nd Octant
                                index + 1 + 8, index + 1, 0,
                                // 3rd Octant
                                0, index + 2, index + 2 + 8,
                                // 4th Octant
                                index + 3 + 8, index + 3, 0,
                                // 5th Octant
                                index + 4 + 8, index + 4, 1,
                                // 6th Octant
                                1, index + 5, index + 5 + 8,
                                // 7th Octant
                                index + 6 + 8, index + 6, 1,
                                // 8th Octant
                                1, index + 7, index + 7 + 8,   
                            );
                        }
                        else {
                            this.indices.push(
                                // 1st Octant
                                index - verticesByStack, index, index + 8,
                                index + 8, index - verticesByStack + 8, index - verticesByStack,
                                // 2nd Octant
                                index + 1, index + 1 - verticesByStack, index + 1 - verticesByStack + 8,
                                index + 1 - verticesByStack + 8, index + 1 + 8, index + 1,
                                // 3rd Octant
                                index + 2 - verticesByStack, index + 2, index + 2 + 8,
                                index + 2 + 8, index + 2 - verticesByStack + 8, index + 2 - verticesByStack,
                                // 4th Octant
                                index + 3, index + 3 - verticesByStack, index + 3 - verticesByStack + 8,
                                index + 3 - verticesByStack + 8, index + 3 + 8, index + 3,
                                // 5th Octant
                                index + 4, index + 4 - verticesByStack, index + 4 - verticesByStack + 8,
                                index + 4 - verticesByStack + 8, index + 4 + 8, index + 4,
                                // 6th Octant                        
                                index + 5 - verticesByStack, index + 5, index + 5 + 8,
                                index + 5 + 8, index + 5 - verticesByStack + 8, index + 5 - verticesByStack,
                                // 7th Octant
                                index + 6, index + 6 - verticesByStack, index + 6 - verticesByStack + 8,
                                index + 6 - verticesByStack + 8, index + 6 + 8, index + 6,
                                // 8th Octant                        
                                index + 7 - verticesByStack, index + 7, index + 7 + 8,
                                index + 7 + 8, index + 7 - verticesByStack + 8, index + 7 - verticesByStack,
                            );
                        }
                    }
                    

                    theta += thetaInc
                    index += 8;
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