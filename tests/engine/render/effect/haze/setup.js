// Test haze setup

// To use this script, include it, and define an object with all the haze properties, get the spectatorCameraConfig from the
// nitpick and call "setup(hazeProperties, spectatorCameraConfig)",
// the script will create the correct zone and objects and move the Avatar and return the list of entities in an array.
// If null is sent, then haze will be turned off.
// Example:
// var HAZE = {
//    hazeRange: 500.0,
//    hazeColor:{"red":153,"green":107,"blue":47}
//    hazeAltitudeEffect: 1,  
// };
// var entities = setup(HAZE);
// 
// The models are loaded from the "MODEL_DIR_URL" located on github where we store all our test models

var assetsRootPath = nitpick.getAssetsRootPath();
var MODEL_DIR_URL = assetsRootPath + "models/material_matrix_models/fbx/blender/";

var MODEL_NAME_SUFFIX = ".fbx";

var BIG_MODEL_SCALE = 20.0;
var MEDIUM_MODEL_SCALE = 5.0;
var LIFETIME = 30;
var MODEL_COUNT = 10;

setup = function (hazeDef, originFrame) {
    var entities = []

    entities.push( Entities.addEntity({
        type: 'Box',
        name: 'Terrain',
        shape: 'Cube',
        dimensions: { x: 2000.0, y: 0.2, z: 2000.0 },
        position: { x: originFrame.x, y: originFrame.y - 3.0, z: originFrame.z },
        color: { blue: 200, green: 200, red: 200 }
    }) );

    var i;
    var url = MODEL_DIR_URL + "hifi_albedoM_ao" + MODEL_NAME_SUFFIX;
    for (i=0 ; i<MODEL_COUNT ; i++) {
        entities.push( Entities.addEntity({
            type: "Model",
            modelURL: url,
            name: "Opaque",
            position: { x: originFrame.x, y: originFrame.y + 1.0 + i * BIG_MODEL_SCALE, z: originFrame.z - 500.0},    
            dimensions: {x:BIG_MODEL_SCALE, y:BIG_MODEL_SCALE, z:BIG_MODEL_SCALE},
            lifetime: LIFETIME,
        }) );
    }
    entities.push( Entities.addEntity({
        type: "Model",
        modelURL: url,
        name: "Opaque",
        position: { x: originFrame.x + 1.0, y: originFrame.y + 1.0, z: originFrame.z - 3.0},    
        lifetime: LIFETIME,
    }) );
    url = MODEL_DIR_URL + "hifi_opacityV_albedoM_ao" + MODEL_NAME_SUFFIX;
    entities.push( Entities.addEntity({
        type: "Model",
        modelURL: url,
        name: "Transparent",
        position: { x: originFrame.x - 10.0, y: originFrame.y, z: originFrame.z - 50.0},
        lifetime: LIFETIME,
    }) );
    entities.push( Entities.addEntity({
        type: "Model",
        modelURL: url,
        name: "Transparent",
        position: { x: originFrame.x + 20.0, y: originFrame.y + 10.0, z: originFrame.z - 200.0},    
        dimensions: {x:BIG_MODEL_SCALE, y:BIG_MODEL_SCALE, z:BIG_MODEL_SCALE},
        lifetime: LIFETIME,
    }) );

    var hazeMode;

    if (hazeDef) {
        hazeMode = "enabled";
    }

    var SKY_URL = Script.resolvePath(assetsRootPath + 'skymaps/Sky_Day-Sun-Mid-photo.texmeta.json');
    var sky = Entities.addEntity({
        type: "Zone",
        name: "Sky",

        position: { x: originFrame.x, y: originFrame.y - 2.0, z: originFrame.z - 25.0 },
        dimensions: { x: 10000.0, y: 600.0, z: 10000.0 },

        keyLightMode: "enabled",
        keyLight:{
            color: { red: 255, green: 255, blue: 255},
            direction: {
                x:  0.16317591071128845,
                y: -0.3420201241970062,
                z:  0.9254165291786194
            },
            intensity: 0.8
        },

        skyboxMode: "enabled",
        skybox: {
            color: { red: 255, green: 255, blue: 255 },
            url: SKY_URL
        },
        
        ambientLightMode: "enabled",
        ambientLight: {
            ambientURL: SKY_URL
        },

        hazeMode: hazeMode,
        haze: hazeDef
    });
    entities.push(sky)

    return entities;
}