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

        console.log(timeElapsed / timeDiff);

        var translation = vec3.create();
        vec3.lerp(translation, keyframe1.translation, keyframe2.translation, timeElapsed / timeDiff);

        var rotation_x = keyframe1.rotation_x + (keyframe2.rotation_x - keyframe1.rotation_x) * (timeElapsed / timeDiff);
        var rotation_y = keyframe1.rotation_y + (keyframe2.rotation_y - keyframe1.rotation_y) * (timeElapsed / timeDiff);
        var rotation_z = keyframe1.rotation_z + (keyframe2.rotation_z - keyframe1.rotation_z) * (timeElapsed / timeDiff);

        var scale = vec3.create();
        vec3.lerp(scale, keyframe1.scale, keyframe2.scale, timeElapsed / timeDiff);

        mat4.translate(this.animationMatrix, this.animationMatrix, translation);
        mat4.rotateZ(this.animationMatrix, this.animationMatrix, rotation_x);
        mat4.rotateY(this.animationMatrix, this.animationMatrix, rotation_y);
        mat4.rotateX(this.animationMatrix, this.animationMatrix, rotation_z);
        mat4.scale(this.animationMatrix, this.animationMatrix, scale);
    }

}