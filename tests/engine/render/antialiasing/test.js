var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Anti-aliasing test", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest(true); // Use main camera, as overlays are not displayed in secondary
    spectatorCameraConfig.position = { x: MyAvatar.position.x, y: MyAvatar.position.y, z: MyAvatar.position.z - 0.2 };

    // Test material matrix
    Script.include("../material/matrix.js?raw=true")

    // List here all the entries of the Material Matrix tested in this test
    var TEST_CASES = [
        {name:"hifi_normalM_albedoV_ao",  a:0, b:-0.5, c:-0.5},
        {name:"hifi_normalM_metallicV_albedoV_ao",  a:0, b:-0.5, c:0.5},  
    ];
    
    var TEST_OVERLAYS = [
        {name:"sphere",  a:0, b:0.5, c:-0.5, infront: false},
        {name:"sphereInFront",  a:0, b:0.5, c:0.5, infront: true},  
    ];

    // Add the test Cases
    var createdEntities = [];
    var createdOverlays = [];

    autoTester.addStep("Set up test case", function () {
        createdEntities = addCases(TEST_CASES, true)
        createdOverlays = addOverlayCases(TEST_OVERLAYS)
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
