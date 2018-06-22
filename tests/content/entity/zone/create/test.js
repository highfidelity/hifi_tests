Script.include("https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js");
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Zone create", Script.resolvePath("."), "primary", function(testType) {
    // Enabled draw zone bounding box and stack to visualize the stack of zone components
    Render.getConfig("RenderMainView.DrawZoneStack").enabled = true;
    Render.getConfig("RenderMainView.DrawZones").enabled = true;

    // Create the zone centered at the avatar position
    var pos = MyAvatar.position;

    // As a 5 meters cube box
    var dim = { x: 5.0, y: 5.0, z: 5.0 };

    //Add test steps, These may be called via the timing mechanism for auto-testing,
    // or stepped through with the space bar
    var zone;
    autoTester.addStep("Set up test case", function () {
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
    
    autoTester.addStepSnapshot("Verify zone with blue skybox is visible");

    autoTester.addStep("Clean up after test", function () {
        Entities.deleteEntity(zone);
        Render.getConfig("RenderMainView.DrawZoneStack").enabled = false;
        Render.getConfig("RenderMainView.DrawZones").enabled = false;
    });
    
    var result = autoTester.runTest(testType);
});