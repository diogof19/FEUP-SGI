
export class MyAnimation{
    constructor(scene){
        this.scene = scene;

        this.animationMatrix = mat4.create();
        this.animationMatrix = mat4.identity(this.animationMatrix);
    }

    apply(){
        this.scene.multMatrix(this.animationMatrix);
    }
}