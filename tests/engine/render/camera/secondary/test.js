if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("MyAvatar scaling", Script.resolvePath("."), "secondary", function(testType) {
    var LIFETIME = 120;
	var createdEntities = [];
    var position = autoTester.getOriginFrame();
	
    secondaryCamera = Render.getConfig("SecondaryCamera");

    autoTester.addStep("Create zone and model", function () {
        var assetsRootPath = autoTester.getAssetsRootPath();
     
        createdEntities.push(Entities.addEntity({
            lifetime: LIFETIME,
            type: "Zone",
            name: "zone",
            position: autoTester.getOriginFrame(),
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),
            
            dimensions: { x: 2000.0, y: 2000.0, z: 2000.0 },

            keyLightMode: "enabled",
            keyLight:{
                color: { red: 255, green: 255, blue: 255 },
                intensity: 0.8,
                direction: { x: 0.0, y: -0.70710678118, z: -0.70710678118 }
            },

            skyboxMode: "enabled",
            skybox: {
                color: { red: 255, green: 255, blue: 255 },
                url: assetsRootPath + 'skymaps/YellowCube.jpg'
            }
        }));

        createdEntities.push(Entities.addEntity({
            lifetime: LIFETIME,
            type: "Model",
            modelURL: assetsRootPath + 'models/obj_models/testTransparent.obj',
            position: Vec3.sum(position, {x: 0.0, y: 1.75, z: -2.2 }),   
            rotation: Quat.fromPitchYawRollDegrees(45.0, 45.0, 0.0),    
            visible: true,
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        }));
    });
    autoTester.addStepSnapshot("Snapshot - 1920x1080, 45 degrees");

    autoTester.addStep("Change position", function () {
        secondaryCamera.position = { x: secondaryCamera.position.x - 0.8,  y: secondaryCamera.position.y, z: secondaryCamera.position.z + 1.0 }; 
    });
    autoTester.addStepSnapshot("Camera has moved back and left");

    autoTester.addStep("Change orientation", function () {
        secondaryCamera.orientation = Quat.fromPitchYawRollDegrees(5.0, -25.0, 0.0);
    });
    autoTester.addStepSnapshot("Camera has tilted up and yawed right");

    autoTester.addStep("Change field of view", function () {
        secondaryCamera.vFoV = 25.0;
    });
    autoTester.addStepSnapshot("Field of view has decreased");

    autoTester.addStep("Change image size", function () {
        secondaryCamera.resetSizeSpectatorCamera(1200, 600);
    });
    autoTester.addStepSnapshot("Image size has been reduced");
    
    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    autoTester.runTest(testType);
});