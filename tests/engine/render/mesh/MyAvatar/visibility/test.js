if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Control MyAvatar mesh visibility", Script.resolvePath("."), "secondary", function(testType) {
    var LIFETIME = 120;

    var previousSkeletonURL;
    var previousScale;
	var previousCameraMode;
    var previousAvatarVisibility;
	var zone;
	
    autoTester.addStep("Create a zone", function () {
        var assetsRootPath = autoTester.getAssetsRootPath();
        var zoneProperties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "zone",
            position: autoTester.getOriginFrame(),
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0 ),
            
            dimensions: { x: 2000.0, y: 2000.0, z: 2000.0 },

            keyLightMode: "enabled",
            keyLight:{
                color: { "red": 255, "green": 255, "blue": 255 },
                intensity: 0.8,
                direction: {
                    "x": 0.0,
                    "y": -0.70710678118,
                    "z": -0.70710678118
                }
            },

            skyboxMode: "enabled",
            skybox: {
                color: { "red": 255,"green": 255,"blue": 255 },
                url: assetsRootPath + 'skymaps/YellowCube.jpg'
            }
        };
        zone = Entities.addEntity(zoneProperties);
    });

    autoTester.addStep("Setup avatar", function () {
        // Use a specific avatar.  This is needed because we want the avatar's height to be fixed.
        previousSkeletonURL = MyAvatar.skeletonModelURL;
        MyAvatar.skeletonModelURL = "https://highfidelity.com/api/v1/commerce/entity_edition/813addb9-b985-49c8-9912-36fdbb57e04a.fst?certificate_id=MEUCIQDgYR2%2BOrCh5HXeHCm%2BkR0a2JniEO%2BY4y9tbApxCAPo4wIgXZEQdI4cQc%2FstAcr9tFT9k4k%2Fbuj3ufB1aB4W0tjIJc%3D";

        previousScale = MyAvatar.scale;
        MyAvatar.scale = 1.0;

        previousAvatarVisibility = MyAvatar.getEnableMeshVisible();
        MyAvatar.setEnableMeshVisible(true);

        // Wait for skeleton to load (for now - only in test mode)
        if (typeof Test !== 'undefined') {
            Test.waitIdle();
        }

        previousCameraMode = Camera.mode;
        Camera.mode = "first person";
    });

    autoTester.addStep("Set camera to third person", function () {
		Camera.mode = "third person";
    });    

    autoTester.addStep("Set T-Pose", function () {
        // Set Avatar to T-pose
        for (var i = 0; i < MyAvatar.getJointNames().length; ++i) {
            MyAvatar.setJointData(i, MyAvatar.getDefaultJointRotation(i), MyAvatar.getDefaultJointTranslation(i));
        }
    });    

    autoTester.addStep("Position secondary camera", function () {
        validationCamera_setRotation(0.0, 0.0, 0.0);
        validationCamera_setTranslation(Vec3.sum(MyAvatar.getEyePosition(), { x: 0.0, y: -0.8, z: 0.5 }));
    });


    autoTester.addStepSnapshot("Avatar visible");
    
    autoTester.addStep("Hide avatar mesh", function () {
		MyAvatar.setEnableMeshVisible(false);
    });
    
    autoTester.addStepSnapshot("Avatar not visible");

    autoTester.addStep("Clean up after test", function () {
        Entities.deleteEntity(zone);

        MyAvatar.skeletonModelURL = previousSkeletonURL;
        MyAvatar.scale = previousScale;
        MyAvatar.clearJointsData();
        MyAvatar.setEnableMeshVisible(previousAvatarVisibility);
        
        Camera.mode = previousCameraMode;
    });

    autoTester.runTest(testType);
});