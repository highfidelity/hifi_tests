if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Particle effect protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');

    var object;
    var backgroundZone;
    var entityProperties = setCommonEntityProperties();

    entityProperties.type = "ParticleEffect";

    entityProperties.isEmitting = false;
    entityProperties.maxParticles = 2002;
    entityProperties.lifespan = 14;
    entityProperties.emitRate = 27;
    entityProperties.emitSpeed = 3;
    entityProperties.emitAcceleration = { x: 0.4, y: 26.9, z: 99 };
    entityProperties.accelerationSpread = { x: 33, y: 17, z: 7.3 };
    entityProperties.emitterShouldTrail = true;
    entityProperties.emitOrientation = Quat.fromPitchYawRollDegrees(30.3, 40.04, 72 )
    entityProperties.emitDimensions = { x: 3.3, y: 26.9, z: 17.3 };
    entityProperties.emitRadiusStart = 0.8;

    entityProperties.polarStart = 0.55;
    entityProperties.polarFinish = 0.72;

    entityProperties.azimuthStart = 1.1;
    entityProperties.azimuthFinish = 2.2;

    entityProperties.textures = "http://textureURL";

    entityProperties.particleRadius =  0.11;
    entityProperties.radiusStart =  0.08;
    entityProperties.radiusFinish = 0.80;
    entityProperties.radiusSpread = 0.04;

    entityProperties.color = { red: 12, green: 255, blue: 2 };
    entityProperties.colorStart = { red: 102, green: 25, blue: 98 };
    entityProperties.colorFinish = { red: 140, green: 250, blue: 123 };
    entityProperties.colorSpread = { red: 3, green: 5, blue: 2 };

    entityProperties.alpha = 0.80;
    entityProperties.alphaStart = 0.63;
    entityProperties.alphaFinish = 0.97;
    entityProperties.alphaSpread = 0.02;

    entityProperties.particleSpin = 0.18;
    entityProperties.spinStart = 0.33;
    entityProperties.spinFinish = 0.67;
    entityProperties.spinSpread = 0.12;

    entityProperties.rotateWithEntity = false;
    entityProperties.registrationPoint = { x: 0.2, y: 0.4, z: 0.0444 };

    nitpick.addStep("Set up particle effect", function () {
        object = Entities.addEntity(entityProperties);
    });

    nitpick.addStep("Test particle effect", function () {
        var getProperties = Entities.getEntityProperties(object);
        saveResults(compareObjects(entityProperties, getProperties));
    });

    nitpick.addStep("Clean up after test", function () {
        Entities.deleteEntity(backgroundZone);
        Entities.deleteEntity(object);
    });

    var result = nitpick.runTest(testType);
});
