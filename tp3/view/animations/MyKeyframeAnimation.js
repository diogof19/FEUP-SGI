import { MyAnimation } from "./MyAnimation.js";

/**
 * Keyframe animation class
 * @extends MyAnimation
 * @constructor
 * @param {CGFscene} scene - MyScene object
 * @param {String} animationID - ID of the animation
 * @param {Array} keyframes - Array of keyframes
 */
export class MyKeyframeAnimation extends MyAnimation {
    constructor(scene, animationID, keyframes){
        super(scene);
    
        this.animationID = animationID;
        this.keyframes = keyframes;
        this.startTime = keyframes[0].instant;
        this.stopped = false;
    }

    /**
     * Updates the animation matrix according to the current time
     * @param {Number} t time since scene started
     * @returns {null}
     */
    update(t){
        // If there is only one keyframe, the animation is static (set animation matrix to the keyframe matrix)
        // Set stopped to true for efficiency
        if(this.keyframes.length == 1 && t >= this.keyframes[0].instant && !this.stopped){
            this.stopped = true;
            this.animationMatrix = mat4.identity(this.animationMatrix);

            // Translation
            this.animationMatrix = mat4.translate(this.animationMatrix, this.animationMatrix, this.keyframes[0].translation);

            // Rotation
            this.animationMatrix = mat4.rotateZ(this.animationMatrix, this.animationMatrix, this.keyframes[0].rotation_z);
            this.animationMatrix = mat4.rotateY(this.animationMatrix, this.animationMatrix, this.keyframes[0].rotation_y);
            this.animationMatrix = mat4.rotateX(this.animationMatrix, this.animationMatrix, this.keyframes[0].rotation_x);

            // Scale
            this.animationMatrix = mat4.scale(this.animationMatrix, this.animationMatrix, this.keyframes[0].scale);
            return;
        }
        // If the animation is stopped, do nothing
        else if (this.stopped)
            return;

        var keyframe1 = this.keyframes[0];
        var keyframe2 = this.keyframes[1];

        var time1 = keyframe1.instant;
        var time2 = keyframe2.instant;

        var timeDiff = time2 - time1;
        var timeElapsed = t - time1;

        // If the animation start instant hasn't been reached yet, do nothing
        if(t < time1){
            return;
        }

        // If t is greater than the 2nd keyframe instant, remove the first keyframe and update the animation
        if(timeElapsed >= timeDiff){
            this.keyframes.shift();
            this.update(t);
            return;
        }

        // If the animation is between 2 keyframes, interpolate the values
        var translation = vec3.create();
        vec3.lerp(translation, keyframe1.translation, keyframe2.translation, timeElapsed / timeDiff);

        var rotation_x = keyframe1.rotation_x + (keyframe2.rotation_x - keyframe1.rotation_x) * (timeElapsed / timeDiff);
        var rotation_y = keyframe1.rotation_y + (keyframe2.rotation_y - keyframe1.rotation_y) * (timeElapsed / timeDiff);
        var rotation_z = keyframe1.rotation_z + (keyframe2.rotation_z - keyframe1.rotation_z) * (timeElapsed / timeDiff);

        var scale = vec3.create();
        vec3.lerp(scale, keyframe1.scale, keyframe2.scale, timeElapsed / timeDiff);

        this.animationMatrix = mat4.identity(this.animationMatrix);
        mat4.translate(this.animationMatrix, this.animationMatrix, translation);
        mat4.rotateZ(this.animationMatrix, this.animationMatrix, rotation_z);
        mat4.rotateY(this.animationMatrix, this.animationMatrix, rotation_y);
        mat4.rotateX(this.animationMatrix, this.animationMatrix, rotation_x);
        mat4.scale(this.animationMatrix, this.animationMatrix, scale);
    }

}