// Test shadow setup

// To use this script, include it, and call "setup(altitude, azimuth)", altitude and azimuth being
// the key light angles. The function returns an array of created entities.
// 
// The models are loaded from the "MODEL_DIR_URL" located on github where we store all our test models

// Test material matrix
Script.include(autoTester.getUtilsRootPath() + "test_stage.js")

var assetsRootPath = autoTester.getAssetsRootPath();

var LIFETIME = 300;
var SHADER_URL = assetsRootPath + "shaders/texture.fs";

var IMAGE_POSITION;
var USER_DATA = { 
    ProceduralEntity: {
        version: 2,
        uniforms: { mipf: 0 },
        shaderUrl: SHADER_URL,
    },
    grabbableKey: { grabbable: false, ignoreIK: true }
};

setup = function (originFrame) {
    IMAGE_POSITION = { x: originFrame.x, y: originFrame.y + 1.8, z: originFrame.z - 0.5 };

    var initData = {
        flags : { 
            hasZone: false,
            hasKeyLight: false,
            hasAmbientLight: false
        },
        originFrame: autoTester.getOriginFrame()
    };
    return setupStage(initData);
}

getAspect = function(props) {
    if (props.aspect) {
        return props.aspect;
    }
    
    if (props.resolution) {
        return props.resolution[0] / props.resolution[1];
    }

    return 1.0;
}

log2 = function(val) {
    return (Math.log(val) / Math.log(2));
}

getMaxMip = function(props) {
    var dim = Math.min.apply(null, props.resolution);
    return Math.floor(log2(dim));
}

getMipCount = function(props) {
    return 1 + getMaxMip(props);
}

createTexture = function(props) {
    var aspect = getAspect(props);
    var maxMip = getMipCount(props);
    var dimensions = { x: 0.5, y: 0.5, z: 0.01 };
    if (aspect > 1) {
        dimensions.y /= aspect;
    } else if (aspect < 1) {
        dimensions.x *= aspect;
    }

    var imageUrl = Script.resolvePath(assetsRootPath + "textures/" + props.image + "?raw=true");
    USER_DATA.ProceduralEntity.channels = [ imageUrl ];

    return Entities.addEntity({
        type: "Box",
        lifetime: LIFETIME,
        position: IMAGE_POSITION,
        color: { red: 255, green: 255, blue: 255 },
        dimensions: dimensions,
        userData: JSON.stringify(USER_DATA)
    }); 
}

updateTextureMip = function(entityId, mip) {
    var userData = JSON.parse(Entities.getEntityProperties(entityId, ['userData']).userData);
    userData.ProceduralEntity.uniforms = { mipf: mip };
    Entities.editEntity(entityId, { userData: JSON.stringify(userData) });
}

 