if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("MyAvatar scaling", Script.resolvePath("."), "secondary", function(testType) {
    var LIFETIME = 120;

    var previousSkeletonURL;
    var previousScale;
	var previousCameraMode;
	var zone;
	var box;
	var floor;

    autoTester.addStep("Setup avatar", function () {
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
		
		previousCameraMode = Camera.mode;
		Camera.mode = "third person";
    });

    autoTester.addStep("Set T-Pose", function () {
        // Set Avatar to T-pose
        for (var i = 0; i < MyAvatar.getJointNames().length; ++i) {
            MyAvatar.setJointData(i, MyAvatar.getDefaultJointRotation(i), MyAvatar.getDefaultJointTranslation(i));
        }
    });    
	
    autoTester.addStep("Create zone and cube", function () {
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
                color: { red: 255, green: 255, blue: 255 },
                intensity: 0.8,
                direction: { x: 0.0, y: -0.70710678118, z: -0.70710678118 }
            },

            skyboxMode: "enabled",
            skybox: {
                color: { red: 255, green: 255, blue: 255 },
                url: assetsRootPath + 'skymaps/YellowCube.jpg'
            }
        };
        zone = Entities.addEntity(zoneProperties);
		
		var boxPosition = Vec3.sum(MyAvatar.position, { x: 0.0, y: 0.0, z: -3.0 });
        var boxProperties = {
            lifetime: LIFETIME,
            type: "Box",
            name: "box",
            position: boxPosition,
            rotation: MyAvatar.rotation,
            dimensions: { x: 4.0, y: 0.5, z: 0.5 },
			color: { red: 0, green: 0, blue: 255 },
            visible: true,
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        };
        box = Entities.addEntity(boxProperties);
		
		var floorPosition = Vec3.sum(MyAvatar.position, { x: 0.0, y: -1.1, z: 0.0 });
        var floorProperties = {
            lifetime: LIFETIME,
            type: "Box",
            name: "box",
            position: floorPosition,
            rotation: MyAvatar.rotation,
            dimensions: { x: 2000.0, y: 0.1, z: 2000.0 },
			color: { red: 0, green: 255, blue: 0 },
            visible: true,
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        };
        floor = Entities.addEntity(floorProperties);
    });

    autoTester.addStep("Position secondary camera", function () {
        validationCamera_setTranslation(MyAvatar.getEyePosition());
    });

    autoTester.addStepSnapshot("Scale = 1.0");

    autoTester.addStep("Set scale to 2.0", function () {
        MyAvatar.scale = 2.0;
    });

    autoTester.addStep("Position secondary camera", function () {
        validationCamera_setTranslation(MyAvatar.getEyePosition());
    });

    autoTester.addStepSnapshot("Scale = 2.0");

    autoTester.addStep("Set scale to 0.5", function () {
        MyAvatar.scale = 0.5;
    });

    autoTester.addStep("Position secondary camera", function () {
        validationCamera_setTranslation(MyAvatar.getEyePosition());
    });

    autoTester.addStepSnapshot("Scale = 0.5");

    autoTester.addStep("Clean up after test", function () {
        Entities.deleteEntity(zone);
        Entities.deleteEntity(box);
        Entities.deleteEntity(floor);

        // Restore avatar and camera mode

        // Restore avatar and camera mode
        MyAvatar.skeletonModelURL = previousSkeletonURL;
        MyAvatar.scale = previousScale;
        MyAvatar.clearJointsData();
		
		Camera.mode = previousCameraMode;
    });

    autoTester.runTest(testType);
});