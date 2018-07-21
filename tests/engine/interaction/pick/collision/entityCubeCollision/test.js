if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Test CollisionPick", Script.resolvePath("."), "secondary", function(testType) {
    var initData = { originFrame: autoTester.getOriginFrame() };
    var createdEntities = setupStage(initData);
    
    ENTITY_LIFETIME = 60;
    ENTITY_USER_DATA = JSON.stringify({ grabbableKey: { grabbable: false } });
    
    COLOR_NEUTRAL = { red: 230, green: 230, blue: 230 };
    COLOR_NO_COLLISION = { red: 255, green: 0, blue: 0 };
    COLOR_YES_COLLISION = { red: 0, green: 255, blue: 0 };
    
    var createdPicks = [];
    
    function createTestPick(pickType, properties) {
        createdPicks.push(Picks.createPick(pickType, properties));
    }
    
    function clearTestPicks() {
        for (var i = 0; i < createdPicks.length; i++) {
            Picks.remove(createdPicks[i]);
        }
        createdPicks = [];
    }
    
    autoTester.addStep("Create test box", function () {
        // Create box
        createdEntities.push(Entities.addEntity({
            color: COLOR_NEUTRAL,
            lifetime: ENTITY_LIFETIME,
            userData: ENTITY_USER_DATA,
            type: "Box",
            name: "Box",
            position: getStagePosOriAt(0, -1, 0).pos,
            dimensions: { x: 1, y: 1, z: 1 }
        }));
    });
    
    autoTester.addStep("Create cubic collision picks", function () {
        // Create three picks, one with a gap, one touching, and one definitely inside
        // Box:          [ ]  (y = -1)
        // Pick 1:    [ ]     (gap) (y = +0.5)
        // Pick 2:     [ ]    (touching at border) (y = 0)
        // Pick 3:      [ ]   (overlapping 50%) (y = -0.5)
        for (var i = 0; i <= 2; i++) {
            createTestPick(PickType.Collision, {
                enabled: true,
                filter: Picks.PICK_ENTITIES,
                shape: {
                    shapeType: "box",
                    dimensions: { x: 1, y: 1, z: 1 }
                },
                position: getStagePosOriAt(0, (i-1)*-0.5, 0).pos
            });
        }
    });
    
    autoTester.addStep("Wait for collision picks to get results");
    
    autoTester.addStep("Show pick collision results", function () {
        // Create boxes where the picks are. Color indicates whether the pick registered an intersection
        // Boxes also have y-offset for better visualization
        var pickIntersects = [];
        for (var i = 0; i < createdPicks.length; i++) {
            pickIntersects.push(Picks.getPrevPickResult(createdPicks[i]).intersects);
        }
        
        for (var i = 0; i <= 2; i++) {
            var intersectColor;
            if (pickIntersects[i]) {
                intersectColor = COLOR_YES_COLLISION;
            } else {
                intersectColor = COLOR_NO_COLLISION;
            }
            createdEntities.push(Entities.addEntity({
                color: intersectColor,
                lifetime: ENTITY_LIFETIME,
                userData: ENTITY_USER_DATA,
                type: "Box",
                name: "Box",
                position: getStagePosOriAt(0, (i-1)*-0.5, i).pos,
                dimensions: { x: 1, y: 1, z: 1 }
            }));
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