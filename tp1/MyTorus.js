import { CGFobject } from "../lib/CGF.js";

export class MyTorus extends CGFobject {
    constructor(scene, id, inner, outer, slices, loops) {
        super(scene);
        this.inner = inner;
        this.outer = outer;
        this.slices = slices;
        this.loops = loops;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // Outer angle
        let phi = 0;
        // Inner angle
        let theta = 0;

        let phiInc = (2 * Math.PI) / this.loops;
        let thetaInc = (2 * Math.PI) / this.slices;

        let index = 0;

        for (let loop = 0; loop < this.loops; loop++) {
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);

            for (let slice = 0; slice < this.slices; slice++) {
                    let sinTheta = Math.sin(theta);
                    let cosTheta = Math.cos(theta);

                    let distanceToOrigin = this.outer + cosTheta * this.inner;

                    let x = sinPhi * distanceToOrigin;
                    let y = cosPhi * distanceToOrigin;
                    let z = sinTheta * this.inner;
                    
                    this.vertices.push(
                        x, y, z,
                    );
                    this.normals.push(
                        sinPhi * cosTheta, cosPhi * cosTheta, sinTheta
                    );
                    
                    if (slice != this.slices - 1 && loop != this.loops - 1) {
                        this.indices.push(
                            index, index + 1, index + this.slices + 1,
                            index + this.slices + 1, index + this.slices, index
                        )
                    }
                    else if (loop != this.loops - 1) {
                        this.indices.push(
                            index, index - this.slices + 1, index + 1,
                            index + 1, index + this.slices, index
                        );
                    }
                    else if (slice != this.slices - 1) {
                        this.indices.push(
                            index, index + 1, index + 1 - this.slices * (this.loops - 1),
                            index + 1 - this.slices * (this.loops - 1), index - this.slices * (this.loops - 1), index
                        );
                    }
                    else  {
                        this.indices.push(
                            index, index - this.slices + 1, 0,
                            0, this.slices - 1, index
                        );
                    }

                    theta += thetaInc;

                    index++;
                }
                    
                

            phi += phiInc;
            }
            
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }

        
}