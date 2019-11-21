if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

Script.include(nitpick.getUtilsRootPath() + "test_stage.js");
// Shared script code for collision pick tests
Script.include(Script.resolvePath(nitpick.getTestsRootPath() + "/engine/interaction/pick/collision/shared.js"));

nitpick.perform("Test CollisionPick pick filtering", Script.resolvePath("."), "secondary", [["high", "tier"], ["mid", "tier"], ["low.intel", "tier.os.gpu"]], function(testType) {
    var initData = { originFrame: nitpick.getOriginFrame() };
    var createdEntities = setupStage(initData);
    var createdPicks = [];
    var filteredEntity;
    
    nitpick.addStep("Create test box and collision picks with different filters", function () {
        createdEntities.push(Entities.addEntity({
            color: COLOR_NEUTRAL,
            lifetime: ENTITY_LIFETIME,
            userData: ENTITY_USER_DATA,
            type: "Box",
            name: "Box",
            position: getStagePosOriAt(3, 0, 0).pos,
            dimensions: { x: 1, y: 1, z: 1 }
        }));
        filteredEntity = createdEntities[createdEntities.length-1];
        
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
        
        // Pick 0 should not register collision (tests blacklist)
        Picks.setIgnoreItems(createdPicks[0], [filteredEntity]);
        // Pick 1 should not register collision (tests whitelist exclusivity)
        Picks.setIncludeItems(createdPicks[1], [Uuid.NULL]);
        // Pick 2 should register collision (tests whitelist success)
        Picks.setIncludeItems(createdPicks[2], [filteredEntity]);
    });
    
    nitpick.addStep("Show pick collision results", function () {
        // Create boxes where the picks are. Color indicates whether the pick registered an intersection
        var pickIntersects = [];
        for (var i = 0; i < createdPicks.length; i++) {
            pickIntersects.push(Picks.getPrevPickResult(createdPicks[i]));
        }
        
        for (var i = 0; i < createdPicks.length; i++) {
            var collisionResult = pickIntersects[i];
            
            // A depth difference to prevent z-fighting
            // Pick visualizations also have an x-offset to differentiate from the identical picks test
            var pickVisOffset = Vec3.subtract(getStagePosOriAt(-0.02, -0.5+1.5*(i-1), 1.5).pos, getStagePosOriAt(0, 0, 0).pos);
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