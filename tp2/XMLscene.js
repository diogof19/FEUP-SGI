import { CGFscene } from '../lib/CGF.js';
import { CGFaxis,CGFcamera,CGFshader } from '../lib/CGF.js';


var DEGREE_TO_RAD = Math.PI / 180;

const UPDATE_PERIOD_MS = 1000;

/**
 * XMLscene class, representing the scene that is to be rendered.
 */
export class XMLscene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myinterface 
     */
    constructor(myinterface) {
        super();

        this.interface = myinterface;

        this.instant = 0;
    }

    /**
     * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);

        this.sceneInited = false;

        this.setUpdatePeriod(UPDATE_PERIOD_MS);

        this.startTime = null;

        this.initCameras();

        this.enableTextures(true);

        this.setUpdatePeriod(1000)

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        this.setUpdatePeriod(100);

        this.highlightingShader = new CGFshader(this.gl, './shaders/vert/jello.vert', './shaders/frag/huey.frag');

        this.highlightingShader.setUniformsValues({ uSampler: 0 });
        this.highlightingShader.setUniformsValues({ uTimeFactor: 0 });
        this.highlightingShader.setUniformsValues({ uHighlightScale: 1.0 });
        this.highlightingShader.setUniformsValues({ uHighlightColor: [1.0, 1.0, 1.0] });

        this.displayLights = false;
    }

    /**
     * Initializes the scene cameras.
     */
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(0, 60, 150), vec3.fromValues(0,20, 0));
    }
    /**
     * Initializes the scene lights with the values read from the XML file.
     */
    initLights() {
        var i = 0;
        // Lights index.
        
        // Reads the lights from the scene graph.
        for (var key in this.graph.lights) {
            if (i >= 8)
                break;              // Only eight lights allowed by WebGL.

            if (this.graph.lights.hasOwnProperty(key)) {
                var light = this.graph.lights[key];

                this.lights[i].setPosition(light[2][0], light[2][1], light[2][2], light[2][3]);
                this.lights[i].setAmbient(light[3][0], light[3][1], light[3][2], light[3][3]);
                this.lights[i].setDiffuse(light[4][0], light[4][1], light[4][2], light[4][3]);
                this.lights[i].setSpecular(light[5][0], light[5][1], light[5][2], light[5][3]);
                
                this.lights[i].setConstantAttenuation(light[6][0]);
                this.lights[i].setLinearAttenuation(light[6][1]);
                this.lights[i].setQuadraticAttenuation(light[6][2]);

                if (light[1] == "spot") {
                    this.lights[i].setSpotCutOff(light[7]);
                    this.lights[i].setSpotExponent(light[8]);
                    this.lights[i].setSpotDirection(light[9][0] - light[2][0], light[9][1] - light[2][1], light[9][2] - light[2][3]);
                }

                this.lights[i].setVisible(this.displayLights);
                if (light[0])
                    this.lights[i].enable();
                else
                    this.lights[i].disable();

                this.lights[i].update();
            }

            i++;
        }

    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    /** Handler called when the graph is finally loaded. 
     * As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {
        this.updateCamera();

        this.axis = new CGFaxis(this, this.graph.referenceLength);

        this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

        this.setGlobalAmbientLight(this.graph.ambient[0], this.graph.ambient[1], this.graph.ambient[2], this.graph.ambient[3]);

        this.initLights();

        this.interface.onGraphLoaded();

        this.sceneInited = true;
    }

    updateCamera() {
        this.camera = this.graph.views[this.graph.selectedCamera];
        this.interface.setActiveCamera(this.camera);
    }

    updateLights() {
        var i = 0;
        for (var key in this.graph.lights) {
            if (i >= 8)
                break;

            if (this.graph.lights.hasOwnProperty(key)) {
                if (this.lights[i]['enabled'])
                    this.lights[i].enable();
                else
                    this.lights[i].disable();

                this.lights[i].update();
                i++;
            }
        }
    }

    updateLightsVisibility() {
        var i = 0;
        for (var key in this.graph.lights) {
            if (i >= 8)
                break;

            if (this.graph.lights.hasOwnProperty(key)) {
                this.lights[i].setVisible(this.displayLights);
                this.lights[i].update();
                i++;
            }
        }
    }

    update(t) {
        this.highlightingShader.setUniformsValues({ uTimeFactor: (t % 1000) / 1000});

        if(this.startTime == null)
            this.startTime = t;

        this.instant = (t - this.startTime) / 1000;

        for(var key in this.graph.animations) {
            if(this.graph.animations.hasOwnProperty(key)) {
                this.graph.animations[key].update(this.instant);
            }
        }
    }

    /**
     * Displays the scene.
     */
    display() {
        // ---- BEGIN Background, camera and axis setup

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.pushMatrix();
        this.axis.display();

        this.updateLights();

        for (var i = 0; i < this.lights.length; i++) {
            this.lights[i].setVisible(this.displayLights);
            this.lights[i].update();
        }

        if (this.sceneInited) {
            // Draw axis
            this.setDefaultAppearance();

            // Displays the scene (MySceneGraph function).
            this.graph.displayScene();
        }

        this.popMatrix();
        // ---- END Background, camera and axis setup
    }
}