// The models are loaded from the "MODEL_DIR_URL" located on github where we store all our test models

var MODEL_DIR_URL = "https://github.com/highfidelity/hifi_tests/blob/master/assets/models/material_matrix_models/fbx/blender/";
var MODEL_NAME_SUFFIX = ".fbx?raw=true";
var MODEL_DIMS = {"x":0.809423565864563,"y":0.9995689988136292,"z":0.8092837929725647};
var MODEL_SCALE = 0.75;
var UNIT = MODEL_SCALE * (MODEL_DIMS.x + MODEL_DIMS.z);

// Add the test Cases
MyAvatar.orientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
MyAvatar.position  = {x: 0.0, y: 0.0, z: 0.0};

var objectOrientation = MyAvatar.orientation;
var objectPosition = {x: 0.0, y: 0.7, z: -3.0};
var objectName = "hifi_roughnessV00_metallicV_albedoV_ao";

var objectProperties = {
  type: "Model",
  modelURL: MODEL_DIR_URL + objectName + MODEL_NAME_SUFFIX,
  name: objectName,
  position: objectPosition,    
  rotation: objectOrientation,    
  dimensions: Vec3.multiply(MODEL_SCALE, MODEL_DIMS),
  angularVelocity:{"x":0.0, "y":0.1, "z":0.05},
  angularDamping:0.0,
};
var object = Entities.addEntity(objectProperties);

// clean up after test
Script.scriptEnding.connect(function () {
    Entities.deleteEntity(object);
});


