if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("MyAvatar scaling", Script.resolvePath("."), "secondary", function(testType) {
    var LIFETIME = 120;

    var previousSkeletonURL;
    var previousScale;
	var zone;
	
    nitpick.addStep("Create zone", function () {
        var assetsRootPath = nitpick.getAssetsRootPath();
        var zoneProperties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "zone",
            position: nitpick.getOriginFrame(),
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
            },

            ambientLightMode: "disabled",
            hazeMode: "disabled",
            bloomMode: "disabled",
            shapeType: "box"
        };
        zone = Entities.addEntity(zoneProperties);
    });

    nitpick.addStep("Setup avatar", function () {
        // Use a specific avatar.  This is needed because we want the avatar's height to be fixed.
        previousSkeletonURL = MyAvatar.skeletonModelURL;
        MyAvatar.skeletonModelURL = "https://highfidelity.com/api/v1/commerce/entity_edition/813addb9-b985-49c8-9912-36fdbb57e04a.fst?certificate_id=MEUCIQDgYR2%2BOrCh5HXeHCm%2BkR0a2JniEO%2BY4y9tbApxCAPo4wIgXZEQdI4cQc%2FstAcr9tFT9k4k%2Fbuj3ufB1aB4W0tjIJc%3D";

        previousScale = MyAvatar.scale;
        MyAvatar.scale = 1.0;
        MyAvatar.setEnableMeshVisible(true);

        // Wait for skeleton to load (for now - only in test mode)
        if (typeof Test !== 'undefined') {
            Test.waitIdle();
        }
    });

    nitpick.addStep("Set T-Pose", function () {
        // Set Avatar to T-pose
        for (var i = 0; i < MyAvatar.getJointNames().length; ++i) {
            MyAvatar.setJointData(i, MyAvatar.getDefaultJointRotation(i), MyAvatar.getDefaultJointTranslation(i));
        }

        // Set orientation to 0
        MyAvatar.orientation = Quat.fromVec3Degrees({x: 0.0, y: 0.0, z: 0.0 });        
    });    

    nitpick.addStep("Position secondary camera behind eyepoint", function () {
        validationCamera_translate({ x: 0.0, y: -0.2, z: 2.5 });
    });

    nitpick.addStep("Delay");
    nitpick.addStepSnapshot("Scale = 1.0");

    nitpick.addStep("Set scale to 2.0", function () {
        MyAvatar.scale = 2.0;
    });

    nitpick.addStep("Delay");
    nitpick.addStepSnapshot("Scale = 2.0");

    nitpick.addStep("Set scale to 0.5", function () {
        MyAvatar.scale = 0.5;
    });

    nitpick.addStep("Delay");
    nitpick.addStepSnapshot("Scale = 0.5");
    
    nitpick.addStep("Clean up after test", function () {
        MyAvatar.skeletonModelURL = previousSkeletonURL;
        MyAvatar.scale = previousScale;
        MyAvatar.clearJointsData();

        Entities.deleteEntity(zone);
    });

    nitpick.runTest(testType);
});