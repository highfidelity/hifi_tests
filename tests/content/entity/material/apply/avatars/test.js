Script.include("https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js");
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Apply Material Entities to Avatars", Script.resolvePath("."), "primary", function(testType) {
    Script.include("../../../../../utils/test_stage.js?raw=true");

    // Add the test Cases
    var flags = { 
        hasAmbientLight: false
    };
    var createdEntities = setupStage(flags, undefined, autoTester.getOriginFrame());

    var posOri = getStagePosOriAt(0, 0, 0);

    MyAvatar.orientation = Quat.fromVec3Degrees({x:0, y:180, z:0});

    var LIFETIME = 120;

    createdEntities.push(Entities.addEntity({
        type: "Material",
        materialURL: "materialData",
        position: MyAvatar.position,
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

        validationCamera_translate({ x: 0.0, y: -0.25, z: 0.4 });
    });

    autoTester.addStep("Set T-Pose", function () {
        // Set Avatar to T-pose
        for (var i = 0; i < MyAvatar.getJointNames().length; ++i) {
            MyAvatar.setJointData(i, MyAvatar.getDefaultJointRotation(i), MyAvatar.getDefaultJointTranslation(i));
        }
    });    

    autoTester.addStepSnapshot("Avatar without material");
    
    autoTester.addStep("Add material to avatar", function () {
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
    
    autoTester.addStepSnapshot("Display material on avatar");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }

        // Restore avatar and camera mode
        MyAvatar.skeletonModelURL = previousSkeletonURL;
        MyAvatar.scale = previousScale;
        MyAvatar.clearJointsData();

        MyAvatar.setEnableMeshVisible(previousAvatarVisibility);
    });

    var result = autoTester.runTest(testType);
});