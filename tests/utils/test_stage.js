// Test content stage

// This script generate a stage made of a dark zone with no lighting, haze or skybox
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

function getTileColor(a, b, c) {
    var offset = (Math.abs(a) + ((Math.abs(b) + (Math.abs(c) % 2)) %  2)) % 2;
    var intensity = (1 - offset) * 128 + offset * 255;
    return { red: intensity, green: intensity, blue: intensity };
}

function addTile(a, b, c, lifetime) {
    var center = Vec3.sum(stageTileRoot, Vec3.multiply(a, stageAxisA));
    center = Vec3.sum(center, Vec3.multiply(b, stageAxisB));
    center = Vec3.sum(center, Vec3.multiply(c, stageAxisC));

    return (Entities.addEntity({
        type: "Shape",
        shape: "Cube",
        name: "Backdrop",
        color: getTileColor(a, b, c),
        position: center,
        rotation: stageOrientation,
        dimensions: TILE_DIM,
        canCastShadow: false,
        userData: JSON.stringify({ grabbableKey: { grabbable: false } }),
        lifetime: (lifetime === undefined) ? DEFAULT_LIFETIME : lifetime
    }));
}

function addBackdropGrid(backdrop, lifetime) {
    for (i = BACKDROP_HALFSIZE; i > -BACKDROP_HALFSIZE; i--) {
        for (j = -BACKDROP_HALFSIZE; j < BACKDROP_HALFSIZE; j++) {
            backdrop.push(addTile(i, j, BACKDROP_MIN_C, lifetime));
        }
    }

    for (i = -1; i < BACKDROP_HALFSIZE; i++) {
         for (j = -BACKDROP_HALFSIZE; j < BACKDROP_HALFSIZE; j++) {
            backdrop.push(addTile(BACKDROP_HALFSIZE, j, i, lifetime));
        }
    }
}

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

        keyLightMode: (flags === undefined || flags.hasKeyLight === undefined || flags.hasKeyLight) ? "enabled" : "disabled",
        skyboxMode: (flags === undefined || flags.hasSkybox === undefined || flags.hasSkybox) ? "enabled" : "disabled",
        ambientLightMode: (flags === undefined || flags.hasAmbientLight === undefined || flags.hasAmbientLight) ? "enabled" : "disabled",

        keyLight:{
            intensity: 0.8,
            castShadows: (flags === undefined || flags.hasKeyLightShadow === undefined || !flags.hasKeyLightShadow) ? "disabled" : "enabled",
            direction: {
                "x": 0.037007175385951996,
                "y": -0.7071067690849304,
                "z": -0.7061376571655273
            },
        },
        ambientLight: {
            ambientIntensity: 1.0,
            ambientURL: assetsRootPath + "skymaps/Sky_Day-Sun-Mid-photo.texmeta.json",
        },

        hazeMode: (flags !== undefined && flags.hasHaze !== undefined && flags.hasHaze) ? "enabled" : "disabled",
        backgroundMode: "skybox",
        skybox:{
            color: {"red":2,"green":2,"blue":2}, // Dark grey background
        }
    }));
}

function addPointLight(pos, color, intensity, lifetime) {
    return (Entities.addEntity({
        type: "Light",
        name: "Point light",

        position: pos,
        dimensions: {
            x: 6,
            y: 6,
            z: 6
        },
        lifetime: (lifetime === undefined) ? DEFAULT_LIFETIME : lifetime,

        "color": color,
        "intensity": intensity,

        falloffRadius: 0.1
    }));
}

function addSpotLight(pos, rotation, color, intensity, lifetime) {
    return (Entities.addEntity({
        type: "Light",
        name: "Spot light",

        position: pos,
        "rotation": rotation,
        dimensions: {
            x: 6,
            y: 6,
            z: 6
        },

        lifetime: (lifetime === undefined) ? DEFAULT_LIFETIME : lifetime,

        "color": color,
        "intensity": intensity,

        falloffRadius: 1.0,
        cutoff: 60,
        exponent: 3,
        isSpotlight: 1
    }));
}

// see comment for setupStage
function addTestBackdrop(name, flags, lifetime) {
    var backdrop = [];

    addBackdropGrid(backdrop, lifetime);

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
