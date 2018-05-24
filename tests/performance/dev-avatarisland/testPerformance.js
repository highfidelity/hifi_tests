var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Scene load performance", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest();

    autoTester.addStep("Clear cache", function () {
        Test.clearCaches();
    });
    
    autoTester.addStep("Wait till idle", function () {
        Test.waitIdle();
    });
    
    autoTester.addStep("Run test", function () {
        Window.location = "hifi://dev-AvatarIsland.highfidelity.io/20.3,-8.1,-9.8/";
        MyAvatar.orientation = Quat.fromPitchYawRollDegrees(0, 79.8, 0);
        
        // Don't start timing till connection established
        Test.waitForConnection();

        var date = new Date();
        var startTime_ms = date.getTime();
        
        Test.waitIdle();
        
        var date = new Date();
        var stopTime_ms = date.getTime();
        
        var elapsedTime_sec = (stopTime_ms - startTime_ms) / 1000.0;
        var results = {
            elapsedTime: elapsedTime_sec
        }
        
        // We need to replace both colons, so the filename will be legal
        // We also remove
        var date = new Date();
        Test.saveObject(results, ("results - " + date.toString().replace(":", "_").replace(":", "_")).substring(0, 34)+ ".txt");
    });

    var result = autoTester.runTest(testType);
});