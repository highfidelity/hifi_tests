if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));
Script.include(autoTester.getUtilsRootPath() + "test_stage.js");
var assetsRootPath = autoTester.getAssetsRootPath();
var jackModelURL = assetsRootPath + "models/collisions/xyzCross-three-submeshes.fbx";

autoTester.perform("Test model CollisionPick", Script.resolvePath("."), "secondary", function(testType) {
    var initData = { originFrame: autoTester.getOriginFrame() };
    var createdEntities = setupStage(initData);
    
    ENTITY_LIFETIME = 60;
    ENTITY_USER_DATA = JSON.stringify({ grabbableKey: { grabbable: false } });
    
    // These are for visualization of the collision points
    var COLOR_COLLISION_SELF = { red: 0, green: 128, blue: 255 };
    var COLOR_COLLISION_OTHER = { red: 255, green: 128, blue: 0 };
    
    var TEST_DIMENSIONS = { x: 1.01, y: 1.01, z: 1.01 };
    
    var createdPicks = [];
    
    function createTestPick(pickType, properties) {
        createdPicks.push(Picks.createPick(pickType, properties));
    }
    
    function clearTestPicks() {
        for (var i = 0; i < createdPicks.length; i++) {
            Picks.removePick(createdPicks[i]);
        }
        createdPicks = [];
    }
    
    autoTester.addStep("Create test model", function () {
        // Create jack model to test collisions against
        createdEntities.push(Entities.addEntity({
            lifetime: ENTITY_LIFETIME,
            userData: ENTITY_USER_DATA,
            type: "Model",
            shapeType: "simple-compound",
            modelURL: jackModelURL,
            name: "TestJack",
            position: getStagePosOriAt(3, 0, 1).pos,
            dimensions: TEST_DIMENSIONS
        }));
    });
    
    autoTester.addStep("Create model collision picks", function () {
        // Create two jack-shaped picks, one touching on both corners from the top left side, and one directly underneath
        createTestPick(PickType.Collision, {
            enabled: true,
            filter: Picks.PICK_ENTITIES,
            shape: {
                shapeType: "simple-compound",
                modelURL: jackModelURL,
                dimensions: TEST_DIMENSIONS
            },
            position: getStagePosOriAt(3, 0.5, 0.5).pos
        });
        createTestPick(PickType.Collision, {
            enabled: true,
            filter: Picks.PICK_ENTITIES,
            shape: {
                shapeType: "simple-compound",
                modelURL: jackModelURL,
                dimensions: TEST_DIMENSIONS
            },
            position: getStagePosOriAt(3, -0.5, 1).pos
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
            var intersect = pickIntersects[i];
            var collisionRegion = intersect.collisionRegion;
            
            // TODO: Test
            // An offset makes it easier to see the pick results, but let's not use that for now
            var regionDisplayOffset;
            if (i == 0) {
                regionDisplayOffset = Vec3.subtract(getStagePosOriAt(0, 0, 0).pos, getStagePosOriAt(0, 0, 0).pos);
            }
            else {
                regionDisplayOffset = Vec3.subtract(getStagePosOriAt(0, 0, 0).pos, getStagePosOriAt(0, 0, 0).pos);
            }
            
            createdEntities.push(Entities.addEntity({
                lifetime: ENTITY_LIFETIME,
                userData: ENTITY_USER_DATA,
                type: "Model",
                shapeType: "simple-compound",
                modelURL: jackModelURL,
                name: "Box",
                position: Vec3.sum(collisionRegion.position, regionDisplayOffset),
                rotation: collisionRegion.orientation,
                dimensions: collisionRegion.shape.dimensions
            }));
            
            var zJustBiggerThanPick = 1.1*collisionRegion.shape.dimensions.z;
            
            // Collision point visualizations
            for (var j = 0; j < intersect.entityIntersections.length; j++) {
                var entityIntersection = intersect.entityIntersections[j];
                
                var relativePickCollisionPoint = Vec3.subtract(entityIntersection.pickCollisionPoint, collisionRegion.position);
                createdEntities.push(Entities.addEntity({
                    color: COLOR_COLLISION_SELF,
                    lifetime: ENTITY_LIFETIME,
                    userData: ENTITY_USER_DATA,
                    type: "Box",
                    name: "Box",
                    position: Vec3.sum(regionDisplayOffset, entityIntersection.pickCollisionPoint),
                    rotation: collisionRegion.orientation,
                    dimensions: { x: 0.15, y: 0.15, z: zJustBiggerThanPick }
                }));
                
                var entityPosition = Entities.getEntityProperties(entityIntersection.objectID, ["position"]).position;
                createdEntities.push(Entities.addEntity({
                    color: COLOR_COLLISION_OTHER,
                    lifetime: ENTITY_LIFETIME,
                    userData: ENTITY_USER_DATA,
                    type: "Box",
                    name: "Box",
                    position: entityIntersection.entityCollisionPoint,
                    dimensions: { x: 0.15, y: 0.15, z: zJustBiggerThanPick }
                }));
            }
        }
    });
    
    autoTester.addStepSnapshot("Collision pick results are visible");
    
    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
        clearTestPicks();
    });
    
    var result = autoTester.runTest(testType);
});