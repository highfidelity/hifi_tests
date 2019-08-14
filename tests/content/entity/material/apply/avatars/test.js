if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Apply Material Entities to Avatars", Script.resolvePath("."), "secondary", undefined, undefined, function(testType) {
    Script.include(nitpick.getUtilsRootPath() + "test_stage.js");

    // Add the test Cases
    var initData = {
        flags : { 
            hasAmbientLight: false
        },
        originFrame: nitpick.getOriginFrame()
    };
    var createdEntities = setupStage(initData);

    var posOri = getStagePosOriAt(0, 0, 0);

    var LIFETIME = 120;

    createdEntities.push(Entities.addEntity({
        type: "Material",
        materialURL: "materialData",
        position: posOri,
        materialData: JSON.stringify({ "materials": {
            "albedo": [0, 0, 1]
        }}),
        lifetime: LIFETIME,
        priority: 1,
        parentMaterialName: 2,
        parentID: MyAvatar.SELF_ID
    }, true));

    var previousSkeletonURL;
    var previousScale;
    var previousAvatarVisibility;
    var assetsRootPath = nitpick.getAssetsRootPath();

    nitpick.addStep("Setup avatar", function () {
        // Use a specific avatar.  This is needed because we want the avatar's height to be fixed.
        previousSkeletonURL = MyAvatar.skeletonModelURL;
        MyAvatar.skeletonModelURL = assetsRootPath + 'models/testAvatar/testAvatar.fst';

        previousScale = MyAvatar.scale;
        MyAvatar.scale = 1.0;

        previousAvatarVisibility = MyAvatar.getEnableMeshVisible();
        MyAvatar.setEnableMeshVisible(true);

        // Wait for skeleton to load (for now - only in test mode)
        if (typeof Test !== 'undefined') {
            Test.waitIdle();
        }

        validationCamera_translate({ x: 0.0, y: -0.25, z: 0.4 });
    });

    nitpick.addStep("Set T-Pose", function () {
        // Set Avatar to T-pose
        for (var i = 0; i < MyAvatar.getJointNames().length; ++i) {
            MyAvatar.setJointData(i, MyAvatar.getDefaultJointRotation(i), MyAvatar.getDefaultJointTranslation(i));
        }
    });

    nitpick.addDelay(5);

    nitpick.addStepSnapshot("Avatar without material");
    
    nitpick.addStep("Add material to avatar", function () {
        createdEntities.push(Entities.addEntity({
            type: "Material",
            materialURL: "materialData",
            position: MyAvatar.position,
            materialData: JSON.stringify({ "materials": {
                "albedo": [0, 0, 1]
            }}),
            lifetime: LIFETIME,
            priority: 1,
            parentMaterialName: 0,
            parentID: MyAvatar.SELF_ID
            }, true)
        );    
    });
    
    nitpick.addStepSnapshot("Display material on avatar");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }

        // Restore avatar and camera mode
        MyAvatar.skeletonModelURL = previousSkeletonURL;
        MyAvatar.scale = previousScale;
        MyAvatar.clearJointsData();

        MyAvatar.setEnableMeshVisible(previousAvatarVisibility);
    });

    var result = nitpick.runTest(testType);
});