if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
if (typeof nitpick === 'undefined') nitpick = createNitpick(Script.resolvePath("."));

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

    nitpick.addStep("Set up model", function () {
        object = Entities.addEntity(entityProperties);
    });
    
    nitpick.addStep("Test model", function () {
        var getProperties = Entities.getEntityProperties(object);
        saveResults(compareObjects(entityProperties, getProperties));
    });
    
    nitpick.addStep("Clean up after test", function () {
        Entities.deleteEntity(backgroundZone);
        Entities.deleteEntity(object);
    });
    
    var result = nitpick.runTest(testType);
});
