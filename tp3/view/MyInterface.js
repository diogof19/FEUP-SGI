import { CGFinterface, CGFapplication, dat } from '../../lib/CGF.js';

/**
* MyInterface class, creating a GUI interface.
*/
export class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.scene = application.scene;

        // add a group of controls (and open/expand by defult)

        this.initKeys();

        return true;
    }

    /**
     * initKeys
     */
    initKeys() {
        this.activeKeys={};
    }
    
    processKeyDown(event) {
        this.activeKeys[event.code]=true;
    };

    processKeyUp(event) {
        this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

    componentToHex(c) {
        var hex = (c * 255).toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
      
    rgbToHex(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return [
          parseInt(result[1], 16) / 255,
          parseInt(result[2], 16) / 255,
          parseInt(result[3], 16) / 255
        ];
      }

    onGraphLoaded() {
        this.processKeyboard = function(){
            if(this.isKeyPressed("KeyM")){
                this.scene.graph.incrementMaterialIndex();
            }
            if(this.isKeyPressed("KeyZ")){
                this.scene.boardController.undo();
            }
            if(this.isKeyPressed("KeyA")){
                this.scene.boardController.redo();
            }
        };
    }
}