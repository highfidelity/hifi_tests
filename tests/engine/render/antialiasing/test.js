if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Anti-aliasing test", Script.resolvePath("."), "secondary", function(testType) {
    // Test material matrix
    Script.include("../material/matrix.js?raw=true")

    // List here all the entries of the Material Matrix tested in this test
    var TEST_CASES = [
        { name: "hifi_normalM_albedoV_ao",  a: 0, b: -0.5, c: -0.5 },
        { name: "hifi_normalM_metallicV_albedoV_ao",  a: 0, b: -0.5, c: 0.5 }
    ];

    var TEST_OVERLAYS = [
        { name: "sphere",  a: 0, b: 0.5, c: -0.5, infront: false },
        { name: "sphereInFront",  a: 0, b: 0.5, c: 0.5, infront: true }
    ];

    // Add the test Cases
    var createdEntities = [];
    var createdOverlays = [];

    autoTester.addStep("Set up test case", function () {
        createdEntities = addCases(TEST_CASES, true, autoTester.getOriginFrame());
        createdOverlays = addOverlayCases(TEST_OVERLAYS, autoTester.getOriginFrame());

        var offset = { x: 0.0, y: -0.4, z: 0.45 };
        MyAvatar.position = Vec3.sum(MyAvatar.position, offset);
        validationCamera_translate(offset);
    });

    autoTester.addStepSnapshot("Show anti-aliasing effects");

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
