if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));
Script.include(nitpick.getUtilsRootPath() + "test_stage.js");
// Shared script code for collision pick tests
Script.include(Script.resolvePath(nitpick.getTestsRootPath() + "/engine/interaction/pick/collision/shared.js"));

nitpick.perform("Test CollisionPick with many cubes", Script.resolvePath("."), "secondary", function(testType) {
    var initData = { originFrame: nitpick.getOriginFrame() };
    var createdEntities = setupStage(initData);
    var createdPicks = [];
    
    nitpick.addStep("Create test box and 5 cubic collision picks", function () {
        var extents = Vec3.subtract(
            getStagePosOriAt(3.25, 4.25, 0.25).pos,
            getStagePosOriAt(2.75, -4.25, -0.25).pos
        );
        
        // Create narrow box tilted at an angle
        createdEntities.push(Entities.addEntity({
            color: COLOR_NEUTRAL,
            lifetime: ENTITY_LIFETIME,
            userData: ENTITY_USER_DATA,
            type: "Box",
            name: "Box",
            position: getStagePosOriAt(3, 0, 0.8).pos,
            dimensions: { x: Math.abs(extents.x), y: Math.abs(extents.y), z: Math.abs(extents.z) },
            rotation: Quat.normalize({ x: 0, y: 0, z: 0.1, w: 0.9 })
        }));
        
        // Create five picks with horizontal offsets
        for (var i = 0; i < 5; i++) {
            createTestPick(createdPicks, PickType.Collision, {
                enabled: true,
                filter: Picks.PICK_ENTITIES,
                shape: {
                    shapeType: "box",
                    dimensions: { x: 1, y: 1, z: 1 }
                },
                position: getStagePosOriAt(3.0, 1.5*(i-2), 0.8).pos
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
        
        for (var i = 0; i < createdPicks.length; i++) {
            var collisionResult = pickIntersects[i];
            
            // No need to offset; test shape is narrow.
            var pickVisOffset = {x:0,y:0,z:0};
            var collisionPointVisOffset = {x:0,y:0,z:0};
            
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