// Test shadow setup

// To use this script, include it, and call "setup(altitude, azimuth)", altitude and azimuth being
// the altitude angle. The function returns an array of created entities.
// 
// The models are loaded from the "MODEL_DIR_URL" located on github where we store all our test models

// Test material matrix
Script.include("../../../utils/test_stage.js?raw=true")

var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";

var TESTS_URL = "https://github.com/" + user + repository + "blob/" + branch;
var ASSETS_URL = TESTS_URL+"assets/"
var MODEL_DIR_URL = ASSETS_URL + "models/material_matrix_models/fbx/blender/";
var SUFFIX = "?raw=true";
var MODEL_NAME_SUFFIX = ".fbx"+SUFFIX;
var MODEL_SCALE = 1.0;
var LIFETIME = 100;

TEST_POSITION =  { x: 10, y: 3, z: 10 };
TEST_ORIENTATION =Quat.angleAxis(-30, { x: 1, y: 0, z: 0 });

setup = function (altitude, azimuth) {
    var pos =  TEST_POSITION;
    var entities = []
    // Initial setup
    MyAvatar.goToLocation(
        pos,
        true,
        Quat.multiply(Quat.angleAxis(180, { x: 0, y: 1, z: 0 }), Quat.angleAxis(30, { x: 1, y: 0, z: 0 })),
        true
    );
    
    entities.push( Entities.addEntity({
        type: 'Box',
        name: 'TerrainRight',
        shape: 'Cube',
        dimensions: { x: 3.0, y: 10.0, z: 2000.0 },
        position: { x: pos.x+4.0, y: pos.y - 8.0, z: pos.z },
        color: { "blue": 200, "green": 200, "red": 200 },
        canCastShadow: false
    }) );
    entities.push( Entities.addEntity({
        type: 'Box',
        name: 'TerrainFar',
        shape: 'Cube',
        dimensions: { x: 100.0, y: 0.2, z: 2000.0 },
        position: { x: pos.x, y: pos.y - 5.0, z: pos.z },
        color: { "blue": 100, "green": 200, "red": 200 },
        canCastShadow: false
    }) );
    entities.push( Entities.addEntity({
        type: 'Box',
        name: 'TerrainCenter',
        shape: 'Cube',
        dimensions: { x: 2.0, y: 10, z: 2000.0 },
        position: { x: pos.x-0.5, y: pos.y - 8.0, z: pos.z },
        color: { "blue": 200, "green": 200, "red": 200 },
        canCastShadow: false
    }) );

    var SKY_URL = Script.resolvePath(TESTS_URL + 'assets/skymaps/Sky_Day-Sun-Mid-photo.ktx' + SUFFIX);
    var sky = Entities.addEntity({
        type: "Zone",
        name: "Sky",

        position: {x: pos.x, y: pos.y - 3.0, z: pos.z},
        rotation: MyAvatar.orientation,    
        dimensions: { x: 10000.0, y: 600.0, z: 10000.0 },

        keyLightMode: "enabled",
        keyLight:{
            color: {"red":255, "green":255, "blue":255},
            direction: Vec3.fromPolar(altitude * Math.PI/180.0, azimuth * Math.PI/180.0),
            intensity: 1.0,
            castShadows: true
        },

        skyboxMode: "enabled",
        skybox: {
            color: {"red":255,"green":255,"blue":255},
            url: SKY_URL
        },
        
        ambientLightMode: "enabled",
        ambientLight: {
            ambientURL: SKY_URL
        }
    });
    entities.push(sky)

    var modelUrl = MODEL_DIR_URL + "hifi_albedoM_ao" + MODEL_NAME_SUFFIX;
    entities.push( Entities.addEntity({
        type: "Model",
        modelURL: modelUrl,
        name: "Opaque",
        position: { x: pos.x+1.0, y: pos.y-1.0, z: pos.z - 5.0},    
        dimensions: {x:MODEL_SCALE, y:MODEL_SCALE, z:MODEL_SCALE},
        lifetime: LIFETIME,
        canCastShadow: true
    }) );
    entities.push( Entities.addEntity({
        type: "Model",
        modelURL: modelUrl,
        name: "Opaque",
        position: { x: pos.x+1.0, y: pos.y-2.0, z: pos.z - 6.0},    
        dimensions: {x:MODEL_SCALE, y:MODEL_SCALE, z:MODEL_SCALE},
        lifetime: LIFETIME,
        canCastShadow: true
    }) );
    entities.push( Entities.addEntity({
        type: "Model",
        modelURL: modelUrl,
        name: "On Floor",
        position: { x: pos.x, y: pos.y-2.75, z: pos.z - 4.0},    
        dimensions: {x:MODEL_SCALE, y:MODEL_SCALE, z:MODEL_SCALE},
        lifetime: LIFETIME,
        canCastShadow: true
    }) );
    entities.push( Entities.addEntity({
        type: "Model",
        modelURL: modelUrl,
        name: "Behind",
        position: { x: pos.x, y: pos.y-1.5, z: pos.z + 2.5},    
        dimensions: {x:MODEL_SCALE, y:MODEL_SCALE, z:MODEL_SCALE},
        lifetime: LIFETIME,
        canCastShadow: true
    }) );
    modelUrl = MODEL_DIR_URL + "hifi_roughnessV75_metallicV_albedoV_ao" + MODEL_NAME_SUFFIX;
    entities.push( Entities.addEntity({
        type: "Model",
        modelURL: modelUrl,
        name: "No Cast",
        position: { x: pos.x-1.0, y: pos.y-1.5, z: pos.z - 3.0},    
        dimensions: {x:MODEL_SCALE, y:MODEL_SCALE, z:MODEL_SCALE},
        lifetime: LIFETIME,
        canCastShadow: false
    }) );

    return entities
}

 