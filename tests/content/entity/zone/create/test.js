var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Zone create", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest(true);

    // Enabled draw zone bounding box and stack to visualize the stack of zone components
    Render.getConfig("RenderMainView.DrawZoneStack").enabled = true;
    Render.getConfig("RenderMainView.DrawZones").enabled = true;

    // Create the zone centered at the avatar position
    var pos = MyAvatar.position;

    // As a 5 meters cube box
    var dim = { x: 5.0, y: 5.0, z: 5.0 };

    // Configure the camera
    spectatorCameraConfig.position = {x: pos.x, y: pos.y + 0.6, z: pos.z};

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
    var zone = Entities.addEntity(properties);

    //Add test steps, These may be called via the timing mechanism for auto-testing,
    // or stepped through with the space bar
    
    autoTester.addStepSnapshot("Take snapshot");

    autoTester.addStep("Clean up after test", function () {
        Entities.deleteEntity(zone);
        Render.getConfig("RenderMainView.DrawZoneStack").enabled = false;
        Render.getConfig("RenderMainView.DrawZones").enabled = false;
    });
    
    var result = autoTester.runTest(testType);
});