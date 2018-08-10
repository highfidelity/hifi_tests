if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));
Script.include(autoTester.getUtilsRootPath() + "test_stage.js");
// Shared script code for collision pick tests
Script.include(Script.resolvePath(autoTester.getTestsRootPath() + "/engine/interaction/pick/collision/shared.js"));

autoTester.perform("Test CollisionPick with cubes", Script.resolvePath("."), "secondary", function(testType) {
    var initData = { originFrame: autoTester.getOriginFrame() };
    var createdEntities = setupStage(initData);
    var createdPicks = [];
    
    autoTester.addStep("Create collision pick at avatar head", function () {
        createTestPick(createdPicks, PickType.Collision, {
            enabled: true,
            filter: Picks.PICK_AVATARS,
            shape: {
                shapeType: "box",
                dimensions: { x: 1, y: 1, z: 1 }
            },
            position: MyAvatar.getEyePosition()
        });
    });
    
    autoTester.addStep("Wait for collision picks to get results");
    
    autoTester.addStep("Show pick collision results", function () {
        // Create boxes where the picks are. Color indicates whether the pick registered an intersection
        // Boxes also have y-offset for better visualization
        var pickIntersects = [];
        for (var i = 0; i < createdPicks.length; i++) {
            pickIntersects.push(Picks.getPrevPickResult(createdPicks[i]));
        }
        
        for (var i = 0; i < createdPicks.length; i++) {
            var collisionResult = pickIntersects[i];
            
            visualizePickAtExactPosition(createdEntities, collisionResult, getStagePosOriAt(3, 0, 0).pos);
        }
    });
    
    autoTester.addStepSnapshot("Collision pick results are visible");
    
    function cleanup() {
        clearEntities(createdEntities);
        clearTestPicks(createdPicks);
    }
    
    Script.scriptEnding.connect(cleanup);
    
    autoTester.addStep("Clean up after test", function () {
        cleanup();
    });
    
    var result = autoTester.runTest(testType);
});