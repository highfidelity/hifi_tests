// Test shadow setup

// To use this script, include it, and call "setup(altitude, azimuth)", altitude and azimuth being
// the key light angles. The function returns an array of created entities.
// 
// The models are loaded from the "MODEL_DIR_URL" located on github where we store all our test models

// Test material matrix
Script.include("../../../utils/test_stage.js?raw=true")

if (typeof user === 'undefined') user = "highfidelity/";
if (typeof repository === 'undefined') repository = "hifi_tests/";
if (typeof branch === 'undefined') branch = "master/";

var TESTS_URL = "https://github.com/" + user + repository + "blob/" + branch;
var RAW_TESTS_URL = "https://raw.githubusercontent.com/" + user + repository + branch;
var ASSETS_URL = TESTS_URL + "assets/"
var MODEL_DIR_URL = ASSETS_URL + "models/material_matrix_models/fbx/blender/";
var SUFFIX = "?raw=true";
var MODEL_NAME_SUFFIX = ".fbx"+SUFFIX;
var MODEL_SCALE = 1.0;
var LIFETIME = 100;

setup = function (altitude, azimuth, originFrame) {
    // Create backdrop
    var flags = { 
        hasZone: false,
        hasKeyLight: false,
        hasAmbientLight: false
    };
    var entities = setupStage(flags, LIFETIME)

    // Create zone
    var BRIGHT_SKY_URL = Script.resolvePath(RAW_TESTS_URL + 'assets/skymaps/Sky_Day-Sun-Mid-photo.texmeta.json');
    entities.push(Entities.addEntity({
        type: "Zone",
        name: "Zone",

        position: originFrame,
        dimensions: { x: 1000.0, y: 1000.0, z: 1000.0},

        keyLightMode: "enabled",
        keyLight:{
            color: { red: 255, green: 255, blue: 255},
            direction: Vec3.fromPolar(altitude * Math.PI/180.0, azimuth * Math.PI/180.0),
            intensity: 0.8,
            castShadows: true
        },

        skyboxMode: "disabled",
        ambientLightMode: "disabled"
    }));

    var modelUrl = MODEL_DIR_URL + "hifi_albedoM_ao" + MODEL_NAME_SUFFIX;
    entities.push(Entities.addEntity({
        type: "Model",
        modelURL: modelUrl,
        name: "Opaque",
        position: { x: originFrame.x - 2.0, y: originFrame.y + 1.25, z: originFrame.z - 5.0},    
        dimensions: {x: MODEL_SCALE, y: MODEL_SCALE, z: MODEL_SCALE},
        lifetime: LIFETIME,
        canCastShadow: true
    }));

    entities.push(Entities.addEntity({
        type: "Model",
        modelURL: modelUrl,
        name: "Opaque",
        position: { x: originFrame.x - 1.0, y: originFrame.y + 1.25, z: originFrame.z - 5.0},    
        dimensions: {x: MODEL_SCALE, y: MODEL_SCALE, z: MODEL_SCALE},
        lifetime: LIFETIME,
        canCastShadow: true
    }));

    entities.push(Entities.addEntity({
        type: "Model",
        modelURL: modelUrl,
        name: "On Floor",
        position: { x: originFrame.x, y: originFrame.y + 1.25, z: originFrame.z - 5.0},    
        dimensions: {x: MODEL_SCALE, y: MODEL_SCALE, z: MODEL_SCALE},
        lifetime: LIFETIME,
        canCastShadow: true
    }));

    entities.push(Entities.addEntity({
        type: "Model",
        modelURL: modelUrl,
        name: "Behind",
        position: { x: originFrame.x + 1.0, y: originFrame.y + 1.25, z: originFrame.z - 5.0},    
        dimensions: {x: MODEL_SCALE, y: MODEL_SCALE, z: MODEL_SCALE},
        lifetime: LIFETIME,
        canCastShadow: true
    }));

    modelUrl = MODEL_DIR_URL + "hifi_roughnessV75_metallicV_albedoV_ao" + MODEL_NAME_SUFFIX;
    entities.push(Entities.addEntity({
        type: "Model",
        modelURL: modelUrl,
        name: "No Cast",
        position: { x: originFrame.x + 2.0, y: originFrame.y + 1.25, z: originFrame.z - 5.0},    
        dimensions: {x: MODEL_SCALE, y: MODEL_SCALE, z: MODEL_SCALE},
        lifetime: LIFETIME,
        canCastShadow: false
    }));

    return entities
}
