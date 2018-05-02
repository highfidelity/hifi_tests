// Test shadow setup

// To use this script, include it, and call "setup(altitude, azimuth)", altitude and azimuth being
// the key light angles. The function returns an array of created entities.
// 
// The models are loaded from the "MODEL_DIR_URL" located on github where we store all our test models

// Test material matrix
Script.include("../../../utils/test_stage.js?raw=true")

var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";

var TESTS_URL = "https://github.com/" + user + repository + "blob/" + branch;
var ASSETS_URL = TESTS_URL + "assets/"
var MODEL_DIR_URL = ASSETS_URL + "models/material_matrix_models/fbx/blender/";
var SUFFIX = "?raw=true";
var MODEL_NAME_SUFFIX = ".fbx"+SUFFIX;
var MODEL_SCALE = 1.0;
var LIFETIME = 100;

setup = function (altitude, azimuth) {
    // Create backdrop
	var flags = { 
		hasZone: false,
		hasKeyLight: false,
		hasAmbientLight: false
	};
    var entities = setupStage(flags, LIFETIME)
    
    var pos = MyAvatar.position;
    
    // Create zone
    var BRIGHT_SKY_URL = Script.resolvePath(TESTS_URL + 'assets/skymaps/Sky_Day-Sun-Mid-photo.ktx' + SUFFIX);
    entities.push(Entities.addEntity({
        type: "Zone",
        name: "Zone",

        position: { x: MyAvatar.position.x, y: MyAvatar.position.y, z: MyAvatar.position.z },
        rotation: MyAvatar.orientation,    
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
    }) );

    var modelUrl = MODEL_DIR_URL + "hifi_albedoM_ao" + MODEL_NAME_SUFFIX;
    entities.push(Entities.addEntity({
        type: "Model",
        modelURL: modelUrl,
        name: "Opaque",
        position: { x: pos.x - 2.0, y: pos.y + 1.25, z: pos.z - 5.0},    
        dimensions: {x: MODEL_SCALE, y: MODEL_SCALE, z: MODEL_SCALE},
        lifetime: LIFETIME,
        canCastShadow: true
    }) );
    
    entities.push(Entities.addEntity({
        type: "Model",
        modelURL: modelUrl,
        name: "Opaque",
        position: { x: pos.x - 1.0, y: pos.y + 1.25, z: pos.z - 5.0},    
        dimensions: {x: MODEL_SCALE, y: MODEL_SCALE, z: MODEL_SCALE},
        lifetime: LIFETIME,
        canCastShadow: true
    }) );
    
    entities.push(Entities.addEntity({
        type: "Model",
        modelURL: modelUrl,
        name: "On Floor",
        position: { x: pos.x, y: pos.y + 1.25, z: pos.z - 5.0},    
        dimensions: {x: MODEL_SCALE, y: MODEL_SCALE, z: MODEL_SCALE},
        lifetime: LIFETIME,
        canCastShadow: true
    }) );
    
    entities.push(Entities.addEntity({
        type: "Model",
        modelURL: modelUrl,
        name: "Behind",
        position: { x: pos.x + 1.0, y: pos.y + 1.25, z: pos.z - 5.0},    
        dimensions: {x: MODEL_SCALE, y: MODEL_SCALE, z: MODEL_SCALE},
        lifetime: LIFETIME,
        canCastShadow: true
    }) );
    
    modelUrl = MODEL_DIR_URL + "hifi_roughnessV75_metallicV_albedoV_ao" + MODEL_NAME_SUFFIX;
    entities.push(Entities.addEntity({
        type: "Model",
        modelURL: modelUrl,
        name: "No Cast",
        position: { x: pos.x + 2.0, y: pos.y + 1.25, z: pos.z - 5.0},    
        dimensions: {x: MODEL_SCALE, y: MODEL_SCALE, z: MODEL_SCALE},
        lifetime: LIFETIME,
        canCastShadow: false
    }) );

    return entities
}

 