// Test content light stage

// This script generate a stage made of a dark zone with no lighting, haze or skybox

var MODEL_DIMS = {"x":0.809423565864563,"y":0.9995689988136292,"z":0.8092837929725647};
var MODEL_SCALE = 0.75;
var MODEL_SPIN = 0.0;
var ROOT_Y_OFFSET = -0.1;
var ROOT_Z_OFFSET = 3.0;
var LIFETIME = 120;
var BACKDROP_SIZE = 16;

function addTestBackdrop(name, position, orientation) {
    var backdrop = [];
    var unit = MODEL_SCALE * (MODEL_DIMS.x + MODEL_DIMS.z);
    
    var cellDim = Vec3.multiply(unit, MODEL_DIMS);
    
    var under = Vec3.sum(position, Vec3.multiply(-1.5 * unit, Quat.getUp(orientation)))
    var far = Vec3.sum(position, Vec3.multiply(5 * unit, Quat.getForward(orientation)))

    var lightDir = Vec3.normalize(Vec3.sum(Vec3.multiply(-1, Quat.getUp(orientation)),
                                           Vec3.multiply(-1, Quat.getRight(orientation))))

    backdrop.push(Entities.addEntity({
        type: "Shape",
        shape: "Cube",
        name: "Backdrop",
        position: under,    
        rotation: orientation,    
        dimensions: {x: cellDim.x * BACKDROP_SIZE, y:cellDim.y , z: BACKDROP_SIZE *cellDim.z},
        lifetime: LIFETIME,
        locked: true
    }));

 
    backdrop.push(Entities.addEntity({
        type: "Shape",
        shape: "Cube",
        name: "Backdrop",
        position: far,    
        rotation: orientation,    
        dimensions: {x: cellDim.x * BACKDROP_SIZE, y:cellDim.y * BACKDROP_SIZE , z: cellDim.z},
        lifetime: LIFETIME,
        locked: true
    }));

    backdrop.push(Entities.addEntity({
        type: "Zone",
        name: "Backdrop zone",
  
        position: under,    
        rotation: orientation,    
        dimensions: {x: cellDim.x * BACKDROP_SIZE, y:cellDim.y * BACKDROP_SIZE , z: cellDim.z* BACKDROP_SIZE},
        lifetime: LIFETIME,
        locked: true,
  
        keyLight:{
            intensity: 0.0,
            ambientIntensity: 0.0
        },

        hazeMode:"disabled",
        backgroundMode:"skybox",
        skybox:{
            color: {"red":0,"green":0,"blue":0},
        }
    }));

    return backdrop;
}
 
stageOrientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
stageRoot = {"x":0.0,"y":0.0,"z":0.0};

setupStage = function () {
    MyAvatar.orientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
    var orientation = MyAvatar.orientation;
    orientation = Quat.safeEulerAngles(orientation);
    orientation.x = 0;
    orientation = Quat.fromVec3Degrees(orientation);
    var root = Vec3.sum(MyAvatar.position, Vec3.multiply(ROOT_Z_OFFSET, Quat.getForward(orientation)));
    root = Vec3.sum(root, Vec3.multiply(ROOT_Y_OFFSET, Quat.getUp(orientation)));

    stageOrientation = orientation;
    stageRoot = root;

    return addTestBackdrop("Light_stage_backdrop", root, orientation);
}

getStagePosOriAt = function (abc) {    
    var unit = MODEL_SCALE * (MODEL_DIMS.x + MODEL_DIMS.z);

    var axisA = Quat.getForward(stageOrientation);
    var axisB = Quat.getRight(stageOrientation);
    var axisC = Quat.getUp(stageOrientation);

    var center = Vec3.sum(stageRoot, Vec3.multiply(abc.a * unit, axisA));
    center = Vec3.sum(center, Vec3.multiply(abc.b * unit, axisB));
    center = Vec3.sum(center, Vec3.multiply(abc.c * unit, axisC));

    return { "pos": center, "ori": stageOrientation};
}