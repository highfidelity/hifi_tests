// Test material matrix

// To use this script, include it, and define an array of test cases "testCases" and call "addCases(testCases)",
// the script will create a grid of test models in front of the Avatar as described in the test cases.
// A test case of the testCases array is specified with the "name" of the model file and its location 
// in the grid from "a" and "b":
// var TEST_CASES = [
//    {name:"hifi_emissiveV_albedoV_ao",  a:0, b:0},
//    {name:"hifi_emissiveM_albedoV_ao",  a:0, b:1},  
//];
// 
// The models are loaded from the "MODEL_DIR_URL" located on github where we store all our test models

// Test material matrix
Script.include(autoTester.getUtilsRootPath() + "test_stage.js")

var assetsRootPath = autoTester.getAssetsRootPath();
var MODEL_DIR_URL = assetsRootPath + "models/material_matrix_models/fbx/blender/";
var MODEL_NAME_SUFFIX = ".fbx?raw=true";
var MODEL_DIMS = {"x":0.809423565864563,"y":0.9995689988136292,"z":0.8092837929725647};
var MODEL_SCALE = 0.75;
var MODEL_SPIN = 0.0;
var ROOT_Y_OFFSET = -0.1;
var ROOT_Z_OFFSET = 4.0;
var LIFETIME = 120;

function addTestBackdropLocal(name, position, orientation, hasZone, hasLocalLights, originFrame) {  
    var initData = {
        flags : { 
            hasKeyLight: hasZone,
            hasAmbientLight: hasZone,
            hasLocalLights: hasLocalLights
        },
        originFrame: autoTester.getOriginFrame()
    };
    var backdrop = setupStage(initData);

    return backdrop;
}

function addTestModel(name, position, orientation) {
  var newModel = Entities.addEntity({
      type: "Model",
      modelURL: MODEL_DIR_URL + name + MODEL_NAME_SUFFIX,
      name: name,
      position: position,    
      rotation: orientation,    
      dimensions: Vec3.multiply(MODEL_SCALE, MODEL_DIMS),
      angularVelocity:{"x":0.0,"y":MODEL_SPIN,"z":0},
      angularDamping:0,
      lifetime: LIFETIME,
    });

  return newModel;
}

function addTestCase(test, origin, orientation) {    
    var center = getStagePosOriAt(test.a, test.b, test.c).pos;
    return addTestModel(test.name, center, orientation);
}

function addTestOverlay(name, infront, position, orientation) {
    var newModel = Overlays.addOverlay("sphere", {
        position: position,
        rotation: orientation,
        size: MODEL_SCALE,
        color: { red: 0, green: 0, blue: 255},
        alpha: 1,
        solid: false,
        drawInFront: infront,
        isVisibleInSecondaryCamera: true
    });
  
    return newModel;
}

function addOverlayTestCase(test, origin, orientation) {    
    var center = getStagePosOriAt(test.a, test.b, test.c).pos;
    return addTestOverlay(test.name, test.infront, center, orientation);
}

function addCasesAt(origin, orientation, testCases, hasZone, hasLocalLights, originFrame) {
    var backdrop = addTestBackdropLocal("Material_matrix_backdrop", origin, orientation, hasZone, hasLocalLights, originFrame);
    
    var models = [];
    for (var i = 0; i < testCases.length; i++) {
        models.push(addTestCase(testCases[i], origin, orientation));
    }  
    return models.concat(backdrop);
}
  
function addOverlayCasesAt(origin, orientation, testCases) {
    var models = [];
    for (var i = 0; i < testCases.length; i++) {
        models.push(addOverlayTestCase(testCases[i], origin, orientation));
    }  
    return models;
}
  
addCases = function (testCases, hasZone, hasLocalLights, originFrame) {
    MyAvatar.orientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
    var orientation = MyAvatar.orientation;
    orientation = Quat.safeEulerAngles(orientation);
    orientation.x = 0;
    orientation = Quat.fromVec3Degrees(orientation);
    var root = Vec3.sum(originFrame, Vec3.multiply(ROOT_Z_OFFSET, Quat.getForward(orientation)));
    root = Vec3.sum(root, Vec3.multiply(ROOT_Y_OFFSET, Quat.getUp(orientation)));

    return addCasesAt(root, orientation, testCases, hasZone, hasLocalLights, originFrame);
}

addOverlayCases = function (testCases, originFrame) {
    MyAvatar.orientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
    var orientation = MyAvatar.orientation;
    orientation = Quat.safeEulerAngles(orientation);
    orientation.x = 0;
    orientation = Quat.fromVec3Degrees(orientation);
    var root = Vec3.sum(originFrame, Vec3.multiply(ROOT_Z_OFFSET, Quat.getForward(orientation)));
    root = Vec3.sum(root, Vec3.multiply(ROOT_Y_OFFSET, Quat.getUp(orientation)));

    return addOverlayCasesAt(root, orientation, testCases);
}
