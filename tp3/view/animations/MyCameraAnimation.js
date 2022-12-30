import { MyAnimation } from "./MyAnimation.js";
import { CGFcamera } from "../../../lib/CGF.js";

/**
 * Class that represents a camera animation.
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 * @param {CGFcamera} startCamera - Starting camera
 * @param {CGFcamera} endCamera - Ending camera
 */
export class MyCameraAnimation extends MyAnimation {
    constructor(scene, startCamera, endCamera){
        super(scene);

        this.startCamera = startCamera;
        this.endCamera = endCamera;

        this.startTime = this.scene.instant;
        this.endTime = this.startTime + 2;
        this.stopped = false;

        this.position = vec3.create();
        this.target = vec3.create();
        this.fov = 0;
    }

    /**
     * Applies the animation.
     */
    apply(){
        var camera = new CGFcamera(this.fov, this.startCamera.near, this.startCamera.far, this.position, this.target);
        this.scene.graph.views['cameraAnimation'] = camera;
        this.scene.graph.selectedCamera = 'cameraAnimation';
        this.scene.updateCamera();
    }

    /**
     * Updates the animation.
     * @param {Number} t
     */
    update(t){
        if(this.stopped)
            return;

        var timeDiff = this.endTime - this.startTime;
        var timeElapsed = t - this.startTime;

        vec3.lerp(this.position, this.startCamera.position, this.endCamera.position, timeElapsed / timeDiff);

        vec3.lerp(this.target, this.startCamera.target, this.endCamera.target, timeElapsed / timeDiff);

        this.fov = this.startCamera.fov + (this.endCamera.fov - this.startCamera.fov) * (timeElapsed / timeDiff);

        if(this.endTime < t){
            this.apply();
            this.stopped = true;

            //Once it ends, make sure it's at the end position
            this.fov = this.endCamera.fov;
            this.position = this.endCamera.position;
            this.target = this.endCamera.target;
            this.apply();
            return;
        }
    }
}