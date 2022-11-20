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
        var itemNames = Object.keys(this.scene.graph.views)
        this.gui.add(this.scene.graph, 'selectedCamera', itemNames)
            .name('Selected Camera')
            .onChange((value) => {
            this.scene.graph.selectedCamera = value;
            this.scene.updateCamera();
        });
        this.processKeyboard = function(){
            if(this.isKeyPressed("KeyM")){
                this.scene.graph.incrementMaterialIndex();
            } 
        };

        this.gui.add(this.scene, 'displayLights').name('Lights Visible').onChange(this.scene.updateLightsVisibility.bind(this.scene));

        var folder = this.gui.addFolder("Lights");
        var lightNames = Object.keys(this.scene.graph.lights);
        for(let i = 0; i < lightNames.length; i++){
            folder.add(this.scene.lights[i], 'enabled').name(lightNames[i]).onChange(this.scene.updateLights.bind(this.scene));
        }

        var folder = this.gui.addFolder('Highlights');
        var components = this.scene.graph.components;
        for(let element in components){
            if(components[element].highlighted){
                var componentFolder = folder.addFolder(element)
                componentFolder.add(components[element], 'highlighted').name(element); 
                componentFolder.add(components[element], 'highlight_scale', 1, 10).name('Scale');

                var colours = {'colour': this.rgbToHex(...components[element].highlight_colour)};
                var colourController = componentFolder.addColor(colours, 'colour').name('Colour');
                colourController.onChange((value) => {
                    colours['colour'] = value;
                    components[element].highlight_colour = this.hexToRgb(value);
                });
            }
        }
    }
}