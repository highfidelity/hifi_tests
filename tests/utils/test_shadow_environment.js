// Test content used for the modiafiable shadow tests

var DEFAULT_LIFETIME = 120;

var BACKDROP_SIZE = 16;
var BACKDROP_HALFSIZE = 8;
var BACKDROP_MIN_C = -2;

var ROOT_Z_OFFSET = -3;
var ROOT_Y_OFFSET = -0.1;

var TILE_UNIT = 1.0;
var TILE_DIM = { x: TILE_UNIT, y: TILE_UNIT, z: TILE_UNIT};

var GRID_TILE_OFFSET = Vec3.multiply(0.5, TILE_DIM);

var assetsRootPath = nitpick.getAssetsRootPath();

addZone = function (flags, lifetime) {
    var zoneDim = Vec3.multiply(BACKDROP_SIZE, TILE_DIM);
    var center = getStagePosOriAt(0, 0, 0).pos;

    var lightDir = Vec3.normalize(Vec3.sum(Vec3.multiply(-1, Quat.getUp(stageOrientation)), Vec3.multiply(-1, Quat.getRight(stageOrientation))))

    return (Entities.addEntity({
        type: "Zone",
        name: "Backdrop zone",

        position: center,
        rotation: stageOrientation,
        dimensions: zoneDim,
        lifetime: (lifetime === undefined) ? DEFAULT_LIFETIME : lifetime,
    }));
}

// see comment for setupStage
function addTestBackdrop(name, flags, lifetime) {
    var backdrop = [];

    if (flags === undefined || flags.hasZone === undefined || flags.hasZone) {
        backdrop.push(addZone(flags, lifetime));
    }

    if (flags !== undefined && flags.hasLocalLights  !== undefined && flags.hasLocalLights) {
        var basePosition = Vec3.sum(stageRoot, Vec3.multiply(1.5, stageAxisC));
        var orientation = Quat.lookAtSimple(basePosition, stageRoot);
        var position = Vec3.sum(stageRoot, Vec3.multiply(-0.5, stageAxisA));
        backdrop.push( addPointLight(position, {red:255,green:255,blue:255}, 15.0, lifetime) );

        position = Vec3.sum(basePosition, Vec3.multiply(1.5, stageAxisB));
        backdrop.push( addSpotLight(position, orientation, {red:255,green:5,blue:5}, 2.5, lifetime) );

        backdrop.push( addSpotLight(basePosition, orientation, {red:5,green:255,blue:5}, 2.5, lifetime) );

        position = Vec3.sum(basePosition, Vec3.multiply(-1.5, stageAxisB));
        backdrop.push( addSpotLight(position, orientation, {red:5,green:5,blue:255}, 2.5, lifetime) );
    }

    return backdrop;
}

// Stage position and orientation initialised at setup
stageOrientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
stageRoot = {"x":0.0,"y":0.0,"z":0.0};
stageTileRoot = {"x":0.0,"y":0.0,"z":0.0};
stageAxisA = Vec3.multiply(TILE_UNIT, Quat.getForward(stageOrientation));
stageAxisB = Vec3.multiply(TILE_UNIT, Quat.getRight(stageOrientation));
stageAxisC = Vec3.multiply(TILE_UNIT, Quat.getUp(stageOrientation));

// initData has 3 elements:
//      flags is an object creating the zone if required, and providing values for its fields:
//           hasZone         - default is on
//           hasKeyLight     - default is on
//           hasAmbientLight - default is on
//           hasLocalLights  - default is off
//           hasSkybox       - default is on
//           hasHaze         - default is off
//      lifetime - default is 200
//      originFrame - the coordinate system origin
setupStage = function (initData) {
    MyAvatar.orientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
    var orientation = MyAvatar.orientation;
    orientation = Quat.safeEulerAngles(orientation);
    orientation.x = 0;
    orientation = Quat.fromVec3Degrees(orientation);

    stageOrientation = orientation;
    stageAxisA = Vec3.multiply(TILE_UNIT, Quat.getForward(stageOrientation));
    stageAxisB = Vec3.multiply(TILE_UNIT, Quat.getRight(stageOrientation));
    stageAxisC = Vec3.multiply(TILE_UNIT, Quat.getUp(stageOrientation));

    if (initData.originFrame) {
        var shiftedOrigin = initData.originFrame;
        shiftedOrigin.y += 1.0;
        stageRoot = Vec3.sum(shiftedOrigin, Vec3.multiply(-ROOT_Z_OFFSET, Quat.getForward(orientation)));
    } else {
        stageRoot = Vec3.sum(MyAvatar.position, Vec3.multiply(-ROOT_Z_OFFSET, Quat.getForward(orientation)));
    }

    stageRoot = Vec3.sum(stageRoot, Vec3.multiply(ROOT_Y_OFFSET, Quat.getUp(orientation)));
    stageTileRoot = Vec3.sum(stageRoot, GRID_TILE_OFFSET);

    return addTestBackdrop("Light_stage_backdrop", initData.flags, initData.lifetime);
}

getStagePosOriAt = function (a, b, c) {
    var center = Vec3.sum(stageRoot, Vec3.multiply(a, stageAxisA));
    center = Vec3.sum(center, Vec3.multiply(b, stageAxisB));
    center = Vec3.sum(center, Vec3.multiply(c, stageAxisC));

    return { "pos": center, "ori": stageOrientation};
}
