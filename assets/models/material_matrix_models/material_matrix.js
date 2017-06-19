// Create the material test model matrix


var MODEL_DIR_URL = "https://github.com/highfidelity/hifi_tests/blob/master/assets/models/material_matrix_models/fbx/blender/";
var MODEL_NAME_SUFFIX = ".fbx?raw=true";
var MODEL_DIMS = {"x":0.809423565864563,"y":0.9995689988136292,"z":0.8092837929725647};
var MODEL_Y_OFFSET = -0.1;
var MODEL_SCALE = 0.75;
var MODEL_SPIN = 0.15;

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
      lifetime: 1200,
    });

//  dims = Entities.getEntityProperties(newModel, ["dimensions"]).dimensions;
//  print(JSON.stringify(dims));

  return newModel;
}

function addTestCase(test, origin, orientation) {

  var unit = MODEL_SCALE * (MODEL_DIMS.x + MODEL_DIMS.z);

  var center = Vec3.sum(origin, Vec3.multiply(test.a * unit, Quat.getForward(orientation)));
  center = Vec3.sum(center, Vec3.multiply(test.b * unit, Quat.getRight(orientation)));

  addTestModel(test.name, center, orientation);
}

function addCases(origin, orientation) {
  for (var i = 0; i < TEST_CASES.length; i++) {
    addTestCase(TEST_CASES[i], origin, orientation);
  }
}


// List here all the entries of the Material Matrix
var TEST_CASES = [
  {name:"hifi",     a:0, b:0},

  {name:"hifi-ao",  a:1, b:0},

  {name:"hifi_albedoV_ao",  a:2, b:0},
  {name:"hifi_albedoM_ao",  a:2, b:1},
  {name:"hifi_albedoVM_ao",  a:2, b:2},

  {name:"hifi_metallicV_albedoV_ao",  a:3, b:0},
  {name:"hifi_metallicV_albedoM_ao",  a:3, b:1},
  {name:"hifi_metallicV_albedoVM_ao",  a:3, b:2},

  {name:"hifi_metallicM_albedoV_ao",  a:4, b:0},
  {name:"hifi_metallicM_albedoM_ao",  a:4, b:1},

  {name:"hifi_roughnessV00_albedoV_ao",  a:5, b:0},
  {name:"hifi_roughnessV25_albedoV_ao",  a:5, b:1},
  {name:"hifi_roughnessV50_albedoV_ao",  a:5, b:2},
  {name:"hifi_roughnessV75_albedoV_ao",  a:5, b:3},
  {name:"hifi_roughnessV100_albedoV_ao",  a:5, b:4},

  {name:"hifi_roughnessV00_metallicV_albedoV_ao",  a:6, b:0},
  {name:"hifi_roughnessV25_metallicV_albedoV_ao",  a:6, b:1},
  {name:"hifi_roughnessV50_metallicV_albedoV_ao",  a:6, b:2},
  {name:"hifi_roughnessV75_metallicV_albedoV_ao",  a:6, b:3},
  {name:"hifi_roughnessV100_metallicV_albedoV_ao",  a:6, b:4},

  {name:"hifi_roughnessM_albedoV_ao",  a:7, b:0},
  {name:"hifi_roughnessM_metallicV_albedoV_ao",  a:7, b:1},

  {name:"hifi_normalM_albedoV_ao",  a:8, b:0},
  {name:"hifi_normalM_metallicV_albedoV_ao",  a:8, b:2},

  {name:"hifi_emissiveV_albedoV_ao",  a:9, b:0},
  {name:"hifi_emissiveM_albedoV_ao",  a:9, b:1},

  {name:"hifi_opacityV_albedoM_ao",  a:10, b:0}
];




var orientation = MyAvatar.orientation;
orientation = Quat.safeEulerAngles(orientation);
orientation.x = 0;
orientation = Quat.fromVec3Degrees(orientation);
var root = Vec3.sum(MyAvatar.position, Vec3.multiply(5, Quat.getForward(orientation)));
root = Vec3.sum(root, Vec3.multiply(MODEL_Y_OFFSET, Quat.getUp(orientation)));

addCases(root, orientation)


//Script.stop();