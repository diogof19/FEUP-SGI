import { MyAnimation } from "./MyAnimation.js";

export class MyKeyframeAnimation extends MyAnimation {
    constructor(scene, animationID, keyframes){
        super(scene);
    
        this.animationID = animationID;
        this.keyframes = keyframes;
    }

    update(t){
        if(this.keyframes.length == 1){
            if(this.keyframes[0].instant == t)
                this.animationMatrix = this.keyframes[0].animationMatrix;
            return;
        }

        var keyframe1 = this.keyframes[0];
        var keyframe2 = this.keyframes[1];

        var time1 = keyframe1.instant;
        var time2 = keyframe2.instant;

        var timeDiff = time2 - time1;
        var timeElapsed = t - time1;

        if(timeElapsed >= timeDiff){
            this.keyframes.shift();
            this.update(t);
            return;
        }

        var translation = vec3.create();
        vec3.lerp(translation, keyframe1.translation, keyframe2.translation, timeElapsed / timeDiff);

        var rotation_x = vec3.create();
        vec3.lerp(rotation_x, keyframe1.rotation_x, keyframe2.rotation_x, timeElapsed / timeDiff);

        var rotation_y = vec3.create();
        vec3.lerp(rotation_y, keyframe1.rotation_y, keyframe2.rotation_y, timeElapsed / timeDiff);

        var rotation_z = vec3.create();
        vec3.lerp(rotation_z, keyframe1.rotation_z, keyframe2.rotation_z, timeElapsed / timeDiff);

        var scale = vec3.create();
        vec3.lerp(scale, keyframe1.scale, keyframe2.scale, timeElapsed / timeDiff);

        mat4.translate(this.animationMatrix, this.animationMatrix, translation);
        mat4.rotate(this.animationMatrix, this.animationMatrix, rotation_x[0], [1, 0, 0]);
        mat4.rotate(this.animationMatrix, this.animationMatrix, rotation_y[0], [0, 1, 0]);
        mat4.rotate(this.animationMatrix, this.animationMatrix, rotation_z[0], [0, 0, 1]);
        mat4.scale(this.animationMatrix, this.animationMatrix, scale);
    }

}