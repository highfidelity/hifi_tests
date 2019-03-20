// Ambient occlusion test setup

// To use this script, include it and execute it,
// the script will create the correct zone and objects and move the Avatar and return the list of entities in an array.
// Example:
// var entities = setup();
// 
// The models are loaded from the "MODEL_DIR_URL" located on github where we store all our test models

var assetsRootPath = nitpick.getAssetsRootPath();
var MODEL_DIR_URL = assetsRootPath + "models/material_matrix_models/fbx/blender/";

var MODEL_NAME_SUFFIX = ".fbx";

var MODEL_SCALE = 1.0;
var LIFETIME = 120;

var aoConfig;
var aoConfig_sc;
var lightingModel_sc;

var obscuranceEnabled_sc;
var originalParameters = {};
var originalParameters_sc = {};

configureAO = function(parameter, value) {
    if (originalParameters[parameter] == null) {
        originalParameters[parameter] = aoConfig[parameter];
    }
    if (originalParameters_sc[parameter] == null) {
        originalParameters_sc[parameter] = aoConfig_sc[parameter];
    }
    aoConfig[parameter] = value;
    aoConfig_sc[parameter] = value;
}

setup = function (originFrame) {
    var entities = []

    aoConfig = Render.getConfig("RenderMainView.AmbientOcclusion");
    aoConfig_sc = Render.getConfig("SecondaryCameraJob.AmbientOcclusion");
    lightingModel_sc = Render.getConfig("SecondaryCameraJob.LightingModel");

    configureAO("enabled", true);
    obscuranceEnabled_sc = lightingModel_sc.enableObscurance;
    obscuranceEnabled_sc = true;

    Script.include(nitpick.getUtilsRootPath() + "test_stage.js")

    MyAvatar.orientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
    var orientation = MyAvatar.orientation;
    orientation = Quat.safeEulerAngles(orientation);
    orientation.x = 0;
    orientation = Quat.fromVec3Degrees(orientation);

    var initData = {
        flags : {
            hasKeyLight: true,
            hasAmbientLight: true,
            hasLocalLights: false
        },
        originFrame: nitpick.getOriginFrame()
    };
    entities = setupStage(initData);

    var right = Quat.getRight(orientation);
    var up = Quat.getUp(orientation);
    var forward = Quat.getForward(orientation);
    var center = Vec3.sum(originFrame, Vec3.multiply(6.0, forward));
    var white = { blue: 210, green: 210, red: 210 };

    entities.push( Entities.addEntity({
        type: 'Box',
        name: 'Box1',
        shape: 'Cube',
        dimensions: { x: 5.0, y: 4.0, z: 1.0 },
        position: Vec3.sum(center, Vec3.sum(Vec3.multiply(1.5, right), Vec3.sum(Vec3.multiply(1.0, up), Vec3.multiply(3.0, forward)))),
        rotation: Quat.multiply(orientation, Quat.fromVec3Degrees({x:-30, y:-25, z:0})),
        color: white,
        lifetime: LIFETIME,
    }) );

    entities.push( Entities.addEntity({
        type: 'Box',
        name: 'Box2',
        shape: 'Cube',
        dimensions: { x: 3.0, y: 3.0, z: 0.1 },
        position: Vec3.sum(center, Vec3.sum(Vec3.multiply(0.1, up), Vec3.multiply(-1.5, right))),
        rotation: Quat.multiply(orientation, Quat.fromVec3Degrees({x:80, y:15, z:0})),
        color: white,
        lifetime: LIFETIME,
    }) );

    var i;
    var PICKET_COUNT = 23;
    for (i=0 ; i<PICKET_COUNT ; i++) {
        entities.push( Entities.addEntity({
            type: 'Box',
            name: 'Small Boxes',
            shape: 'Cube',
            dimensions: { x: 0.03, y: 1.5, z: 0.5 },
            position: Vec3.sum(center, Vec3.sum(Vec3.sum(Vec3.multiply(-1.0, up), Vec3.multiply(1.0 + (i-(PICKET_COUNT-1)/2)*0.075, right)), Vec3.multiply(-0.5, forward))),
            color: white,
            lifetime: LIFETIME,
        }) );
    }

    var url = MODEL_DIR_URL + "hifi_albedoM_ao" + MODEL_NAME_SUFFIX;

    center = Vec3.sum(center, Vec3.multiply(-0.1, up));
    entities.push( Entities.addEntity({
        type: "Model",
        modelURL: url,
        name: "Opaque",
        position: Vec3.sum(center, Vec3.sum(Vec3.multiply(-0.5, up), Vec3.multiply(-1.0, right))),    
        rotation: orientation,
        dimensions: {x:MODEL_SCALE, y:MODEL_SCALE, z:MODEL_SCALE},
        lifetime: LIFETIME,
    }) );

    url = MODEL_DIR_URL + "hifi_opacityV_albedoM_ao" + MODEL_NAME_SUFFIX;
    entities.push( Entities.addEntity({
        type: "Model",
        modelURL: url,
        name: "Transparent",
        position: Vec3.sum(center, Vec3.sum(Vec3.multiply(-0.5, up), Vec3.multiply(-2.0, right))),    
        rotation: orientation,
        dimensions: {x:MODEL_SCALE, y:MODEL_SCALE, z:MODEL_SCALE},
        lifetime: LIFETIME,
    }) );

    return entities;
}

finalize = function() {
    for(var parameter in Object.keys(originalParameters)){
        aoConfig[parameter] = originalParameters[parameter];
    }
    for(var parameter in Object.keys(originalParameters_sc)){
        aoConfig_sc[parameter] = originalParameters_sc[parameter];
    }
    lightingModel_sc.enableObscurance = obscuranceEnabled_sc;
}