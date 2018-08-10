if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));
Script.include(autoTester.getUtilsRootPath() + "test_stage.js");
// Shared script code for collision pick tests
Script.include(Script.resolvePath(autoTester.getTestsRootPath() + "/engine/interaction/pick/collision/shared.js"));

var assetsRootPath = autoTester.getAssetsRootPath();
var jackModelURL = assetsRootPath + "models/collisions/xyzCross-three-submeshes.fbx";

autoTester.perform("Test model CollisionPick with models", Script.resolvePath("."), "secondary", function(testType) {
    var initData = { originFrame: autoTester.getOriginFrame() };
    createdEntities = setupStage(initData);
    var createdPicks = [];
    
    var TEST_DIMENSIONS = { x: 1.01, y: 1.01, z: 1.01 };
    
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
        createTestPick(createdPicks, PickType.Collision, {
            enabled: true,
            filter: Picks.PICK_ENTITIES,
            shape: {
                shapeType: "simple-compound",
                modelURL: jackModelURL,
                dimensions: TEST_DIMENSIONS
            },
            position: getStagePosOriAt(3, 0.5, 0.5).pos
        });
        createTestPick(createdPicks, PickType.Collision, {
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
            var collisionResult = pickIntersects[i];
            var collisionRegion = collisionResult.collisionRegion;
            
            visualizePick(createdEntities, collisionResult, { x: 0, y: 0, z: 0 });
            
            var zJustBiggerThanPick = 1.1*collisionRegion.shape.dimensions.z;
            var collisionDisplayDimensions = { x: 0.15, y: 0.15, z: zJustBiggerThanPick };
            
            // Collision point visualizations
            for (var j = 0; j < collisionResult.intersectingObjects.length; j++) {
                var intersectingObject = collisionResult.intersectingObjects[j];
                
                visualizePickCollisions(createdEntities, collisionResult, intersectingObject, {x:0,y:0,z:0}, collisionDisplayDimensions);
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