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
Script.include("../../../utils/test_stage.js?raw=true")

var MODEL_DIR_URL = "https://github.com/highfidelity/hifi_tests/blob/master/assets/models/material_matrix_models/fbx/blender/";
var MODEL_NAME_SUFFIX = ".fbx?raw=true";
var MODEL_DIMS = {"x":0.809423565864563,"y":0.9995689988136292,"z":0.8092837929725647};
var MODEL_SCALE = 0.75;
var MODEL_SPIN = 0.0;
var ROOT_Y_OFFSET = -0.1;
var ROOT_Z_OFFSET = 3.0;
<<<<<<< HEAD
var LIFETIME = 360;
var BACKDROP_SIZE = 16;
=======
var LIFETIME = 120;
>>>>>>> a69673cf1a63cbdf69b0012022b7977868441bf2

function addTestBackdropLocal(name, position, orientation) {
    
<<<<<<< HEAD
    var cellDim = Vec3.multiply(unit, MODEL_DIMS);
    
    var up = Quat.getUp(orientation)
    var right = Quat.getRight(orientation)
    var forward = Quat.getForward(orientation)
    var far = Vec3.sum(position, Vec3.multiply(5 * unit, forward))
    var under = Vec3.sum(position, Vec3.multiply(-1.5 * unit, up))
    var under_left_near = Vec3.sum(Vec3.multiply(-5 * unit, forward), Vec3.sum(under, Vec3.multiply(-2.0 * unit, right)))

    var lightDir = Vec3.normalize(Vec3.sum(Vec3.multiply(-1, up),
                                           Vec3.multiply(-1, right)))

    backdrop.push(Entities.addEntity({
        type: "Shape",
        shape: "Cube",
        name: "Backdrop",
        position: under,    
        rotation: orientation,    
        dimensions: {x: cellDim.x * BACKDROP_SIZE, y:cellDim.y , z: BACKDROP_SIZE *cellDim.z},
        lifetime: LIFETIME,
    }));

 
    backdrop.push(Entities.addEntity({
        type: "Shape",
        shape: "Cube",
        name: "Backdrop",
        position: far,    
        rotation: orientation,    
        dimensions: {x: cellDim.x * BACKDROP_SIZE, y:cellDim.y * BACKDROP_SIZE , z: cellDim.z},
        lifetime: LIFETIME,
    }));

    backdrop.push(Entities.addEntity({
        type: "Zone",
        name: "Backdrop zone",
  
        position: under,    
        rotation: orientation,    
        dimensions: {x: cellDim.x * BACKDROP_SIZE, y:cellDim.y * BACKDROP_SIZE , z: cellDim.z* BACKDROP_SIZE},
        lifetime: LIFETIME,
  
        keyLight:{
            ambientIntensity: 1,
            color: {"red":255,"green":255,"blue":255},
            direction: {
                "x": 0.037007175385951996,
                "y": -0.7071067690849304,
                "z": -0.7061376571655273
            },
            intensity: 0.8
        },

        hazeMode:"disabled",

        backgroundMode:"skybox",
        skybox:{
            color: {"red":255,"green":255,"blue":255},
            url: "http://hifi-content.s3.amazonaws.com/DomainContent/baked/island/Sky_Day-Sun-Mid-photo.ktx"
        }
    }));
=======
    var backdrop = setupStage(true, true)
>>>>>>> a69673cf1a63cbdf69b0012022b7977868441bf2

    backdrop.push(Entities.addEntity({
        type: "Light",
        name: "Point Light",
  
        position: under,    
        rotation: orientation,    
        dimensions: {x: cellDim.x * BACKDROP_SIZE, y:cellDim.y * BACKDROP_SIZE , z: cellDim.z* BACKDROP_SIZE},
        lifetime: LIFETIME,
  
        color: {"red":100,"green":120,"blue":255},
        intensity: 2.0,
        falloffRadius: 5.0,
        isSpotlight: false
    }));

    backdrop.push(Entities.addEntity({
        type: "Light",
        name: "Spot Light",
  
        position: under_left_near,    
        rotation: orientation,    
        dimensions: {x: cellDim.x * BACKDROP_SIZE, y:cellDim.y * BACKDROP_SIZE , z: cellDim.z* BACKDROP_SIZE},
        lifetime: LIFETIME,
  
        color: {"red":255,"green":200,"blue":200},
        intensity: 5.0,
        falloffRadius: 15.0,
        isSpotlight: true,
        cutoff: 60.0,
        exponent: 10.0
    }));

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


function addCasesAt(origin, orientation, testCases) {
    var backdrop = addTestBackdropLocal("Material_matrix_backdrop", origin, orientation);
    
    var models = [];
    for (var i = 0; i < testCases.length; i++) {
        models.push(addTestCase(testCases[i], origin, orientation));
    }  
    return models.concat(backdrop);
}
  
addCases = function (testCases) {
    MyAvatar.orientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
    var orientation = MyAvatar.orientation;
    orientation = Quat.safeEulerAngles(orientation);
    orientation.x = 0;
    orientation = Quat.fromVec3Degrees(orientation);
    var root = Vec3.sum(MyAvatar.position, Vec3.multiply(ROOT_Z_OFFSET, Quat.getForward(orientation)));
    root = Vec3.sum(root, Vec3.multiply(ROOT_Y_OFFSET, Quat.getUp(orientation)));

    return addCasesAt(root, orientation, testCases);
}


