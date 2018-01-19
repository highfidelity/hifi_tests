module.exports.complete = false;

module.exports.test = function (testType) {
    var autoTester = Script.require("https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/autoTester.js" );
    var spectatorCameraConfig = autoTester.setupTests(Script.resolvePath("."));

    // Create the zone centered at the avatar position
    var pos = MyAvatar.position;

    // As a 5 meters cube box
    var dim = { x: 5.0, y: 5.0, z: 5.0};

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

    // An array of tests is created.  These may be called via the timing mechanism for auto-testing,
    // or stepped through with the space bar
    var steps = [
        function () {
            spectatorCameraConfig.position = {x: pos.x, y: pos.y + 0.6, z: pos.z};
        },
        
        // Take snapshot
        function () {
        },
        
        // Clean up after test
        function () {
            Entities.deleteEntity(zone);
            module.exports.complete = true;
        }
    ]
    
    var result = autoTester.runTests(testType, steps);
};
