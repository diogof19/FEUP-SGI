
export class MyAnimation{
    constructor(scene){
        this.scene = scene;

        this.animationMatrix = mat4.create();
        this.animationMatrix = mat4.identity(this.animationMatrix);
    }

    update(t){
        
    }

    apply(){
        this.scene.multMatrix(this.animationMatrix);
    }
}