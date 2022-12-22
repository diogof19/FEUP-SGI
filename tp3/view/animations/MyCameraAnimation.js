import { MyAnimation } from "./MyAnimation.js";
import { CGFcamera } from "../../../lib/CGF.js";

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

    apply(){
        var camera = new CGFcamera(this.fov, this.startCamera.near, this.startCamera.far, this.position, this.target);
        this.scene.graph.views['cameraAnimation'] = camera;
        this.scene.graph.selectedCamera = 'cameraAnimation';
        this.scene.updateCamera();
    }

    update(t){
        if(this.stopped)
            return;
        if(t >= this.endTime){
            this.stopped = true;
            return;
        }

        var timeDiff = this.endTime - this.startTime;
        var timeElapsed = t - this.startTime;

        vec3.lerp(this.position, this.startCamera.position, this.endCamera.position, timeElapsed / timeDiff);

        vec3.lerp(this.target, this.startCamera.target, this.endCamera.target, timeElapsed / timeDiff);

        this.fov = this.startCamera.fov + (this.endCamera.fov - this.startCamera.fov) * (timeElapsed / timeDiff);
    }
}