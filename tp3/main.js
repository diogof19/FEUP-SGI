import { CGFapplication } from '../lib/CGF.js';
import { XMLscene } from './view/XMLscene.js';
import { MyInterface } from './view/MyInterface.js';
import { MySceneGraph } from './view/MySceneGraph.js';

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return vars;
}	 

function main() {

	// Standard application, scene and interface setup
    var app = new CGFapplication(document.body);
    var myInterface = new MyInterface();
    var myScene = new XMLscene(myInterface);

    app.init();

    app.setScene(myScene);
    app.setInterface(myInterface);

    myInterface.setActiveCamera(myScene.camera);

	// get file name provided in URL, e.g. http://localhost/myproj/?file=myfile.xml 
	// or use "demo.xml" as default (assumes files in subfolder "scenes", check MySceneGraph constructor) 
	
    var filename=getUrlVars()['file'] || "barad-dur.xml";

	// create and load graph, and associate it to scene. 
	// Check console for loading errors
	var baradDurGraph = new MySceneGraph(filename, myScene);
	
	// start
    app.run();
}

main();
