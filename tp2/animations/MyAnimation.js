
export class MyAnimation{
    constructor(scene){
        this.scene = scene;

        this.animationMatrix = mat4.create();
        this.animationMatrix = mat4.identity(this.animationMatrix);
    }

    /**
     * Applies the animation matrix to the scene graph
     */
    apply(){
        this.scene.multMatrix(this.animationMatrix);
    }
}