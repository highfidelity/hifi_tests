// Test material matrix
if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

Script.include(autoTester.getUtilsRootPath() + "test_stage.js");

var assetsRootPath = autoTester.getAssetsRootPath();
var MODEL_DIR_URL = assetsRootPath + "models/material_matrix_models/fbx/blender/";
var MODEL_NAME_SUFFIX = ".fbx?raw=true";
var MODEL_DIMS = {"x":0.809423565864563,"y":0.9995689988136292,"z":0.8092837929725647};
var MODEL_SCALE = 0.75;
var MODEL_SPIN = 0.0;
var ROOT_Y_OFFSET = -0.1;
var ROOT_Z_OFFSET = 3.0;
var LIFETIME = 120;

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

function addTestOverlay(name, infront, position, orientation) {
    var newModel = Overlays.addOverlay("sphere", {
        position: position,
        rotation: orientation,
        size: MODEL_SCALE,
        color: { red: 0, green: 0, blue: 255},
        alpha: 1,
        solid: false,
        drawInFront: infront
    });

    return newModel;
}

function addTestCase(test, origin, orientation) {    
    var center = getStagePosOriAt(test.a, test.b, test.c).pos;
    return addTestModel(test.name, center, orientation);
}

function addOverlayTestCase(test, origin, orientation) {    
    var center = getStagePosOriAt(test.a, test.b, test.c).pos;
    return addTestOverlay(test.name, test.infront, center, orientation);
}

function addCasesAt(origin, orientation, testCases, hasZone) {
    var backdrop = setupStage(hasZone, hasZone, false);

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

addCases = function (testCases, hasZone) {
    MyAvatar.orientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
    var orientation = MyAvatar.orientation;
    orientation = Quat.safeEulerAngles(orientation);
    orientation.x = 0;
    orientation = Quat.fromVec3Degrees(orientation);
    var root = Vec3.sum(MyAvatar.position, Vec3.multiply(ROOT_Z_OFFSET, Quat.getForward(orientation)));
    root = Vec3.sum(root, Vec3.multiply(ROOT_Y_OFFSET, Quat.getUp(orientation)));

    return addCasesAt(root, orientation, testCases, hasZone);
}

addOverlayCases = function (testCases) {
    MyAvatar.orientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
    var orientation = MyAvatar.orientation;
    orientation = Quat.safeEulerAngles(orientation);
    orientation.x = 0;
    orientation = Quat.fromVec3Degrees(orientation);
    var root = Vec3.sum(MyAvatar.position, Vec3.multiply(ROOT_Z_OFFSET, Quat.getForward(orientation)));
    root = Vec3.sum(root, Vec3.multiply(ROOT_Y_OFFSET, Quat.getUp(orientation)));

    return addOverlayCasesAt(root, orientation, testCases);
}

// List here all the entries of the Material Matrix tested in this test
var TEST_CASES = [
    {name:"hifi_normalM_albedoV_ao",  a:0, b:-0.5, c:-0.5},
    {name:"hifi_normalM_metallicV_albedoV_ao",  a:0, b:-0.5, c:0.5},  
];
var TEST_OVERLAYS = [
    {name:"sphere",  a:0, b:0.5, c:-0.5, infront: false},
    {name:"sphereInFront",  a:0, b:0.5, c:0.5, infront: true},  
];

// Add the test Cases
var createdEntities = addCases(TEST_CASES, true)
var createdOverlays = addOverlayCases(TEST_OVERLAYS)

// clean up after test
Script.scriptEnding.connect(function () {
    var i;
    for (i = 0; i < createdEntities.length; i++) {
        Entities.deleteEntity(createdEntities[i]);
    }
    for (i = 0; i < createdOverlays.length; i++) {
        Overlays.deleteOverlay(createdOverlays[i]);
    }
});
