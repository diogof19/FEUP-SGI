import { MyAnimation } from "./MyAnimation.js";

export class MyKeyframeAnimation extends MyAnimation {
    constructor(scene, animationID, keyframes){
        super(scene);
    
        this.animationID = animationID;
        this.keyframes = keyframes;
        console.log(this.keyframes);
    }

    interpolation(x, x1, x2, y1, y2){
        return y1 + (x - x1) * (y2 - y1) / (x2 - x1);
    }

    update(t){
        t = t / 1000; //MAYBE BUT NOT SURE
        
        //console.log("IN UPDATE");
        if(this.keyframes.length == 1){
            //console.log("ONLY ONE KEYFRAME");
            if(this.keyframes[0].instant < t){ //OBJETO NÂO EXISTIR ANTES DE COMEÇAR A ANIMAÇÃO MAS TEM DE EXISITR NO FIM
                return;
            }
            return;
        }

        //console.log("MORE THAN ONE KEYFRAME");

        var keyframe1 = this.keyframes[0];
        var keyframe2 = this.keyframes[1];

        var time1 = keyframe1.instant;
        var time2 = keyframe2.instant;

        var timeDiff = time2 - time1;
        var timeElapsed = t - time1;

        console.log(t);

        if(t < time1){
            console.log(t);
            return;
        }

        if(timeElapsed >= timeDiff){
            this.keyframes.shift();
            this.update(t);
            return;
        }

        console.log(timeElapsed);
        console.log(keyframe1.translation);

        var translation = vec3.create();
        vec3.lerp(translation, keyframe1.translation, keyframe2.translation, timeElapsed / timeDiff);

        var rotation_x = vec3.create();
        vec3.lerp(rotation_x, vec3.fromValues(keyframe1.rotation_x, 0, 0), vec3.fromValues(keyframe2.rotation_x, 0, 0), timeElapsed / timeDiff);
        console.log(rotation_x);

        var rotation_y = vec3.create();
        vec3.lerp(rotation_y, vec3.fromValues(0, keyframe1.rotation_y, 0), vec3.fromValues(0, keyframe2.rotation_y, 0), timeElapsed / timeDiff);

        var rotation_z = vec3.create();
        vec3.lerp(rotation_z, vec3.fromValues(0, 0, keyframe1.rotation_z), vec3.fromValues(0, 0, keyframe1.rotation_x), timeElapsed / timeDiff);

        var scale = vec3.create();
        vec3.lerp(scale, keyframe1.scale, keyframe2.scale, timeElapsed / timeDiff);

        mat4.translate(this.animationMatrix, this.animationMatrix, translation);
        mat4.rotate(this.animationMatrix, this.animationMatrix, rotation_x[0], [1, 0, 0]);
        mat4.rotate(this.animationMatrix, this.animationMatrix, rotation_y[1], [0, 1, 0]);
        mat4.rotate(this.animationMatrix, this.animationMatrix, rotation_z[2], [0, 0, 1]);
        mat4.scale(this.animationMatrix, this.animationMatrix, scale);
    }

}