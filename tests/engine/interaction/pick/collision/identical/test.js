if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));
Script.include(autoTester.getUtilsRootPath() + "test_stage.js");
// Shared script code for collision pick tests
Script.include(Script.resolvePath(autoTester.getTestsRootPath() + "/engine/interaction/pick/collision/shared.js"));

autoTester.perform("Test CollisionPick with identical cubes", Script.resolvePath("."), "secondary", function(testType) {
    var initData = { originFrame: autoTester.getOriginFrame() };
    var createdEntities = setupStage(initData);
    var createdPicks = [];
    
    autoTester.addStep("Create test box", function () {
        // Create box
        createdEntities.push(Entities.addEntity({
            color: COLOR_NEUTRAL,
            lifetime: ENTITY_LIFETIME,
            userData: ENTITY_USER_DATA,
            type: "Box",
            name: "Box",
            position: getStagePosOriAt(3, 0, 0).pos,
            dimensions: { x: 1, y: 1, z: 1 }
        }));
    });
    
    autoTester.addStep("Create identical cubic collision picks", function () {
        // Create three picks in the same place
        for (var i = 0; i <= 2; i++) {
            createTestPick(createdPicks, PickType.Collision, {
                enabled: true,
                filter: Picks.PICK_ENTITIES,
                shape: {
                    shapeType: "box",
                    dimensions: { x: 1, y: 1, z: 1 }
                },
                position: getStagePosOriAt(3.0, 0.5, 0.5).pos
            });
        }
    });
    
    autoTester.addStep("Wait for collision picks to get results");
    
    autoTester.addStep("Show pick collision results", function () {
        // Create boxes where the picks are. Color indicates whether the pick registered an intersection
        // Boxes also have y-offset for better visualization
        var pickIntersects = [];
        for (var i = 0; i < createdPicks.length; i++) {
            pickIntersects.push(Picks.getPrevPickResult(createdPicks[i]));
        }
        
        // Second pick is up a bit and third pick is to the right, to fit in the camera properly
        var pickOffsets = [
            [0, 0, 0],
            [0, 0, 1.5],
            [0, 1.5, 0]
        ]
        
        for (var i = 0; i < createdPicks.length; i++) {
            var collisionResult = pickIntersects[i];
            
            // A depth difference to prevent z-fighting
            var pickVisOffset = Vec3.subtract(
                getStagePosOriAt(-0.01+pickOffsets[i][0], pickOffsets[i][1], pickOffsets[i][2]).pos,
                getStagePosOriAt(0, 0, 0).pos
            );
            var collisionPointVisOffset = Vec3.sum({ x:0.01, y:0, z:0 }, pickVisOffset);
            
            visualizePick(createdEntities, collisionResult, pickVisOffset);
            
            var zJustBiggerThanPick = 1.1*collisionResult.collisionRegion.shape.dimensions.z;
            var collisionDisplayDimensions = { x: 0.15, y: 0.15, z: zJustBiggerThanPick };
            
            // Collision point visualizations
            for (var j = 0; j < collisionResult.intersectingObjects.length; j++) {
                var intersectingObject = collisionResult.intersectingObjects[j];
                
                visualizePickCollisions(createdEntities, collisionResult, intersectingObject, collisionPointVisOffset, collisionDisplayDimensions);
            }
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