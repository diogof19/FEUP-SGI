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

        for (let loop = 0; loop <= this.loops; loop++) {
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);
            
            for (let slice = 0; slice <= this.slices; slice++) {
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

                theta += thetaInc;
            }
            

            phi += phiInc;
        }

        
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
}