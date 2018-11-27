if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Model protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');
    
    var object;
    var backgroundZone;
    var entityProperties = setCommonEntityProperties();

    entityProperties.type = "Model";
        
    entityProperties.dimensions = { x: 111, y: 222, z: 333 },
    entityProperties.color = { "red": 4, "green": 55, "blue": 166 },
	entityProperties.modelURL = "http://modelURL";
	entityProperties.textures = "http://textures";
	entityProperties.shapeType = "none";
	entityProperties.compoundShapeURL = "http://compoundShapeURL";
	
	entityProperties.animation = {
		running: true,
		url: "http://animationURL"
	};
	entityProperties.jointRotations = [
		Quat.fromPitchYawRollDegrees(1.0, 2.0, 3.0 ),
		Quat.fromPitchYawRollDegrees(2.0, 3.0, 4.0 ),
		Quat.fromPitchYawRollDegrees(3.0, 4.0, 5.0 ),
		Quat.fromPitchYawRollDegrees(4.0, 5.0, 6.0 )
	];
	entityProperties.jointRotationsSet = [ true, true, true, true ];
	
	entityProperties.jointTranslations = [
		{ x: 0.1, y: 0.2, z: 0.3 },
		{ x: 0.2, y: 0.3, z: 0.4 },
		{ x: 0.3, y: 0.4, z: 0.5 },
		{ x: 0.4, y: 0.5, z: 0.6 }
	];
	entityProperties.jointTranslationsSet = [ true, true, true, true ];

	entityProperties.relayParentJoints = true;

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

    nitpick.addStep("Set up model", function () {
        object = Entities.addEntity(entityProperties);
    });
    
    nitpick.addStep("Test model", function () {
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
