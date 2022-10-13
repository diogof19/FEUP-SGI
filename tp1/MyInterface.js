import { CGFinterface, CGFapplication, dat } from '../lib/CGF.js';

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

        this.gui = new dat.GUI();
        this.scene = application.scene;

        // add a group of controls (and open/expand by defult)

        this.initKeys();

        return true;
    }

    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui=this;
        this.processKeyboard = function(){
            if(this.isKeyPressed("KeyM")){
                console.log(this.scene.graph.materialIndex);
                this.scene.graph.incrementMaterialIndex();
            } 
        };
        this.activeKeys={"KeyM": true};
    }

    processKeyDown(event) {
        this.activeKeys[event.code]=true;
        console.log(event);
    };

    processKeyUp(event) {
        this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

    onGraphLoaded() {
        var itemNames = Object.keys(this.scene.graph.views)
        this.gui.add(this.scene.graph, 'selectedCamera', itemNames)
            .name('theSelectionBoxLabel')
            .onChange((value) => {
            this.scene.graph.selectedCamera = value;
            this.scene.updateCamera();
        });
    }
}