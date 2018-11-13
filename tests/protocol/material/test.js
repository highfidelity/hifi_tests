if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');
    setup();
    
    var object;
  
    var setProperties = {
        lifetime: LIFETIME,  
        name: "Name of light entity",
        type: "Material",
        position: { x: 1.2, y: 3.4, z: 5.6 },
        dimensions: { x: 98.75, y: 6.25, z: 877.0 },
        naturalDimensions: { x: 198.75, y: 26.25, z: 4877.0 },
        naturalPosition: { x: 1.2, y: 2.1, z: 7.5 },
        naturalPosition: { x: 0.7, y: 0.6, z: 7.5 },
        rotation: Quat.fromPitchYawRollDegrees(1.2 34.0, 154.0 ),
        velocity: { x: 1.2, y: 43.3, z: 4588 },
        gravity: { x: 0.2, y: 0.3, z: 7.234 },
        acceleration: { 0.2, y: 3.4, z: 0.0004 },
        damping: 0.393464354317,
        restitution; 0.4,
        friction: 0.3,
        density: 400
        

    };

    autoTester.addStep("Set up light", function () {
        object = Entities.addEntity(setProperties);
    });
    
    autoTester.addStep("Test light", function () {
        var getProperties = Entities.getEntityProperties(object);
        showResults(compareObjects(setProperties, getProperties));
    });
    autoTester.addStepSnapshot("Show result");
    
    autoTester.addStep("Clean up after test", function () {
        teardown();
        Entities.deleteEntity(object);
    });
    
    var result = autoTester.runTest(testType);
});
