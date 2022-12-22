import { MyAnimation } from "./MyAnimation.js";

export class MyCameraAnimation extends MyAnimation {
    constructor(scene, startCamera, endCamera){
        super(scene);

        this.startCamera = startCamera;
        this.endCamera = endCamera;
        console.log(this.startCamera);

        this.startTime = this.scene.instant;
        this.endTime = this.startTime + 2;
        this.stopped = false;
    }

    update(t){
        console.log("Updating camera animation");

        if(this.stopped)
            return;
        if(t >= this.endTime){
            this.stopped = true;
            return;
        }

        var timeDiff = this.endTime - this.startTime;
        var timeElapsed = t - this.startTime;

        var position = vec3.create();
        vec3.lerp(position, this.endCamera.position, this.startCamera.position, timeElapsed / timeDiff);

        var target = vec3.create();
        vec3.lerp(target, this.endCamera.target, this.startCamera.target, timeElapsed / timeDiff);
        
    }
}