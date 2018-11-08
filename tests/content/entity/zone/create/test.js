if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Zone create", Script.resolvePath("."), "secondary", function(testType) {
    // Create the zone centered at the avatar position
    var pos = MyAvatar.position;

    // As a 5 meters cube box
    var dim = { x: 5.0, y: 5.0, z: 5.0 };

    //Add test steps, These may be called via the timing mechanism for auto-testing,
    // or stepped through with the space bar
    var zone;
    nitpick.addStep("Set up test case", function () {
        // Define zone properties
        var properties = {
            lifetime: 60,  
            type: "Zone",  
            name: "test create zone",
            position: pos,
            dimensions: dim,
            keyLight:{"color": {"red":0,"green":255,"blue":0}},
            
            skyboxMode: "enabled",
            skybox:{"color":{"red":0,"green":0,"blue":255}}
        };
        zone = Entities.addEntity(properties);
    });
    
    nitpick.addStepSnapshot("Verify zone with blue skybox is visible");

    nitpick.addStep("Clean up after test", function () {
        Entities.deleteEntity(zone);
    });
    
    var result = nitpick.runTest(testType);
});