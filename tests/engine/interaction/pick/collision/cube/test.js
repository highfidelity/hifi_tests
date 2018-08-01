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
    
    autoTester.addStep("Create test box", function () {
        // Create box
        createdEntities.push(Entities.addEntity({
            color: COLOR_NEUTRAL,
            lifetime: ENTITY_LIFETIME,
            userData: ENTITY_USER_DATA,
            type: "Box",
            name: "Box",
            position: getStagePosOriAt(3, -1, 0).pos,
            dimensions: { x: 1, y: 1, z: 1 }
        }));
    });
    
    autoTester.addStep("Create cubic collision picks", function () {
        // Create three picks, one with a gap, one touching, and one definitely inside
        // Box:      [ ]      (y = -1)
        // Pick 1:      [ ]   (gap) (y = +0.5)
        // Pick 2:     [ ]    (touching at border) (y = 0)
        // Pick 3:    [ ]     (overlapping 50%) (y = -0.5)
        for (var i = 0; i <= 2; i++) {
            createTestPick(createdPicks, PickType.Collision, {
                enabled: true,
                filter: Picks.PICK_ENTITIES,
                shape: {
                    shapeType: "box",
                    dimensions: { x: 1, y: 1, z: 1 }
                },
                position: getStagePosOriAt(3, (i-1)*-0.5, 0).pos,
                orientation: Quat.normalize({ x: 0, y: 0, z: .1, w: 1})
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
        
        for (var i = 0; i < createdPicks.length; i++) {
            var intersect = pickIntersects[i];
            var collisionRegion = intersect.collisionRegion;
            
            var intersectColor;
            if (intersect.intersects == true) {
                intersectColor = COLOR_YES_COLLISION;
            } else {
                intersectColor = COLOR_NO_COLLISION;
            }
            
            // A height difference makes it easier to differentiate the cubes
            var stageHeightOffset = Vec3.subtract(getStagePosOriAt(0, 0, i).pos, getStagePosOriAt(0, 0, 0).pos);
            
            createdEntities.push(Entities.addEntity({
                color: intersectColor,
                lifetime: ENTITY_LIFETIME,
                userData: ENTITY_USER_DATA,
                type: "Box",
                name: "Box",
                position: Vec3.sum(collisionRegion.position, stageHeightOffset),
                rotation: collisionRegion.orientation,
                dimensions: collisionRegion.shape.dimensions
            }));
            
            var zJustBiggerThanPick = 1.1*collisionRegion.shape.dimensions.z;
            var collisionDisplayDimensions = { x: 0.15, y: 0.15, z: zJustBiggerThanPick };
            var pickPositionOffset = stageHeightOffset;
            
            // Collision point visualizations
            for (var j = 0; j < intersect.entityIntersections.length; j++) {
                var entityIntersection = intersect.entityIntersections[j];
                
                visualizePickCollisions(createdEntities, intersect, entityIntersection, pickPositionOffset, collisionDisplayDimensions);
            }
        }
    });
    
    autoTester.addStepSnapshot("Collision pick results are visible");
    
    autoTester.addStep("Clean up after test", function () {
        clearEntities(createdEntities);
        clearTestPicks(createdPicks);
    });
    
    var result = autoTester.runTest(testType);
});