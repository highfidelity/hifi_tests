// The models are loaded from the "MODEL_DIR_URL" located on github where we store all our test models
var MODEL_DIR_URL = "https://github.com/highfidelity/hifi_tests/blob/master/assets/models/material_matrix_models/fbx/blender/";

var MODEL_NAME_SUFFIX = ".fbx?raw=true";
var MODEL_DIMS = {"x":0.809423565864563,"y":0.9995689988136292,"z":0.8092837929725647};
var MODEL_SCALE = 0.75;
var UNIT = MODEL_SCALE * (MODEL_DIMS.x + MODEL_DIMS.z);
var CELL_DIM = Vec3.multiply(UNIT, MODEL_DIMS);
var BACKDROP_SIZE = 16;

var avatarOriginOrientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
var avatarOriginPosition = MyAvatar.position;

MyAvatar.orientation = avatarOriginOrientation;

var objectOrientation = avatarOriginOrientation;
var objectPosition = {x: avatarOriginPosition.x, y: avatarOriginPosition.y + 0.7, z: avatarOriginPosition.z - 3.0};

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

var zone1properties = {
    type: "Zone",
    name: "Backdrop zone",

    position: MyAvatar.position,    
    rotation: MyAvatar.orientation,    
    dimensions: {x: CELL_DIM.x * BACKDROP_SIZE, y:CELL_DIM.y * BACKDROP_SIZE , z: CELL_DIM.z* BACKDROP_SIZE},

    keyLight:{
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
};
var zone1 = Entities.addEntity(zone1properties);

Script.setTimeout(
  function() {
    MyAvatar.orientation = avatarOriginOrientation;
    MyAvatar.position  = {x: avatarOriginPosition.x, y: avatarOriginPosition.y, z: avatarOriginPosition.z + 1.0};
    
    var newProperty = { 
      position: {x: MyAvatar.position.x, y: MyAvatar.position.y + 1.0, z: MyAvatar.position.z - 3.0}
    };
    Entities.editEntity(object, newProperty);  
  }, 
    
  2000);

Script.setTimeout(
  function() {
    MyAvatar.orientation = avatarOriginOrientation;
    MyAvatar.position  = {x: avatarOriginPosition.x, y: avatarOriginPosition.y, z: avatarOriginPosition.z + 1.0};
    
    var newProperty = { 
      position: {x: MyAvatar.position.x, y: MyAvatar.position.y - 0.5, z: MyAvatar.position.z - 3.0}
    };
    Entities.editEntity(object, newProperty);  
  }, 
    
  4000);
// clean up after test
Script.scriptEnding.connect(function () {
    Entities.deleteEntity(object);
    Entities.deleteEntity(zone1);
});


