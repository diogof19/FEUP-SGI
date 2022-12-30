import { CGFobject } from "../../../lib/CGF.js";

/**
 * MyHUDButton class, representing a button on the HUD.
 * @constructor
 * @param {MyHUD} hud - HUD object
 * @param {Number} x - X coordinate
 * @param {Number} y - Y coordinate
 * @param {Number} pickId - Picking ID
 * @param {String} string - String to display
 */
export class MyHUDButton extends CGFobject {
    constructor(hud, x, y, pickId, string) {
        super(hud.scene);
        this.hud = hud;
        this.x = x;
        this.y = y;
        this.pickId = pickId;
        this.string = string;
    }

    /**
     * Displays the button.
     */
    display() {
        this.scene.registerForPick(this.pickId, this);
        this.hud.displayStringAt(this.string, this.x, this.y);
    }
}