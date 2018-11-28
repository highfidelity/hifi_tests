if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

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

    nitpick.addStep("Create a background zone", function () {
        var zoneProperties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "background",
            position: originPosition,
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0 ),
            
            dimensions: { x: 2000.0, y: 2000.0, z: 2000.0 },

            keyLightMode: "enabled",
            keyLight:{
                color: { red: 255, green: 255, blue: 255 },
                intensity: 0.8,
                direction: {
                    "x": 0.0,
                    "y": -0.70710678118,
                    "z": -0.70710678118
                }
            },

            skyboxMode: "enabled",
            skybox: {
                color: { red: 255, green: 255, blue: 255 },
                url: assetsRootPath + 'skymaps/YellowCube.jpg'
            }
        };
        backgroundZone = Entities.addEntity(zoneProperties);
    });
    
    nitpick.addStep("Prepare result box, green if passed, red if failed", function () {
        var boxProperties = {
            type: "Box",
            name: "box",
            lifetime: LIFETIME,
            color: { red: 255, green: 255, blue: 255 },
            position: Vec3.sum(originPosition, { x: 0.0, y: 1.7, z: -2.0 }),
            dimensions: { x: 1.0, y: 1.0, z: 1.0 },
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        };
        box = Entities.addEntity(boxProperties);
    });
    nitpick.addStepSnapshot("Check that box is white (testing the tester...)");

    nitpick.addStep("Set up particle effect", function () {
        object = Entities.addEntity(entityProperties);
    });
    
    nitpick.addStep("Test particle effect", function () {
        var getProperties = Entities.getEntityProperties(object);
        showResults(compareObjects(entityProperties, getProperties));
    });
    nitpick.addStepSnapshot("Show result");
    
    nitpick.addStep("Clean up after test", function () {
        teardown();
        Entities.deleteEntity(backgroundZone);
        Entities.deleteEntity(object);
    });
    
    var result = nitpick.runTest(testType);
});
