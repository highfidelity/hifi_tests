if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

Script.include(nitpick.getUtilsRootPath() + "test_stage.js");
// Shared script code for collision pick tests
Script.include(Script.resolvePath(nitpick.getTestsRootPath() + "/engine/interaction/pick/collision/shared.js"));

nitpick.perform("Test CollisionPick with identical cube picks", Script.resolvePath("."), "secondary", undefined, undefined, function(testType) {
    var initData = { originFrame: nitpick.getOriginFrame() };
    var createdEntities = setupStage(initData);
    var createdPicks = [];
    
    nitpick.addStep("Create test box and identical cubic collision picks", function () {
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
        
        // Create three picks in the same place
        for (var i = 0; i <= 2; i++) {
            createTestPick(createdPicks, PickType.Collision, {
                enabled: true,
                filter: Picks.PICK_ENTITIES,
                shape: {
                    shapeType: "box",
                    dimensions: { x: 1, y: 1, z: 1 }
                },
                position: getStagePosOriAt(2.99, 0.499, 0.501).pos,
                orientation: Quat.normalize({ x: 0.001, y: 0.001, z: -0.001, w: 1.0})
            });
        }
    });
    
    nitpick.addStep("Show pick collision results", function () {
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
    
    nitpick.addStepSnapshot("Collision pick results are visible");
    
    function cleanup() {
        clearEntities(createdEntities);
        clearTestPicks(createdPicks);
    }
    
    Script.scriptEnding.connect(cleanup);
    
    nitpick.addStep("Clean up after test", function () {
        cleanup();
    });
    
    var result = nitpick.runTest(testType);
});