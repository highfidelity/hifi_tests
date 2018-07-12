if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Overlays with alpha", Script.resolvePath("."), "secondary", function(testType) {
    var createdOverlays = [];
    var createdEntities = [];

    var MODEL_SCALE = 0.75;
    var DIM = { x: 0.5, y: 0.5, z: 0.5};

    var sphereColor = { red: 0, green: 0, blue: 255 };
    var cubeColor = { red: 255, green: 255, blue: 0 };
    var p = autoTester.getOriginFrame();
    
    autoTester.addStep("Set up test case", function () {
        createdOverlays[0] = Overlays.addOverlay("sphere", {
            position: { x: p.x - 3.0, y: p.y + 1.0, z: p.z - 9.0 },
            size: MODEL_SCALE,
            color: sphereColor,
            alpha: 0.25,
            solid: true,
            drawInFront: true,
            isVisibleInSecondaryCamera: true
        });
        createdEntities[0] = Entities.addEntity({
            type: "Box",
            position: { x: p.x - 2.0, y: p.y + 1.0, z: p.z - 6.0 },
            color: cubeColor,
            dimensions: DIM
        });

        createdOverlays[1] = Overlays.addOverlay("sphere", {
            position: { x: p.x - 1.0, y: p.y + 1.0, z: p.z - 9.0 },
            size: MODEL_SCALE,
            color: sphereColor,
            alpha: 0.50,
            solid: true,
            drawInFront: true,
            isVisibleInSecondaryCamera: true
        });
        createdEntities[1] = Entities.addEntity({
            type: "Box",
            position: { x: p.x - 0.7, y: p.y + 1.0, z: p.z - 6.0 },
            color: cubeColor,
            dimensions: DIM
        });

        createdOverlays[2] = Overlays.addOverlay("sphere", {
            position: { x: p.x + 1.0, y: p.y + 1.0, z: p.z - 9.0 },
            size: MODEL_SCALE,
            color: sphereColor,
            alpha: 0.75,
            solid: true,
            drawInFront: true,
            isVisibleInSecondaryCamera: true
        });
        createdEntities[2] = Entities.addEntity({
            type: "Box",
            position: { x: p.x + 0.7, y: p.y + 1.0, z: p.z - 6.0 },
            color: cubeColor,
            dimensions: DIM
        });

        createdOverlays[3] = Overlays.addOverlay("sphere", {
            position: { x: p.x + 3.0, y: p.y + 1.0, z: p.z - 9.0 },
            size: MODEL_SCALE,
            color: sphereColor,
            alpha: 1.00,
            solid: true,
            drawInFront: true,
            isVisibleInSecondaryCamera: true
        });
        createdEntities[3] = Entities.addEntity({
            type: "Box",
            position: { x: p.x + 2.0, y: p.y + 1.0, z: p.z - 6.0 },
            color: cubeColor,
            dimensions: DIM
        });
    });

    autoTester.addStepSnapshot("Show overlays with different alphas (all should be in front of cubes)");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
        
        for (var i = 0; i < createdOverlays.length; i++) {
            Overlays.deleteOverlay(createdOverlays[i]);
        }
    });

    var result = autoTester.runTest(testType);
});
