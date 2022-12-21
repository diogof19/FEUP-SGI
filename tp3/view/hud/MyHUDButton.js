import { CGFobject } from "../../../lib/CGF.js";

export class MyHUDButton extends CGFobject {
    constructor(hud, x, y, pickId, string) {
        super(hud.scene);
        this.hud = hud;
        this.x = x;
        this.y = y;
        this.pickId = pickId;
        this.string = string;
    }

    display() {
        this.scene.registerForPick(this.pickId, this);
        this.hud.displayStringAt(this.string, this.x, this.y);
    }
}