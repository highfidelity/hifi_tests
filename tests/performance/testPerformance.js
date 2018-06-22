if (typeof user === 'undefined') user = "highfidelity/";
if (typeof repository === 'undefined') repository = "hifi_tests/";

Script.include("https://github.com/highfidelity/hifi_tests/blob/RC69/tests/utils/branchUtils.js?raw=true");
if (typeof branch === 'undefined') branch = getBranch(Script.resolvePath("."), repository) +"/";

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
        
        Test.saveObject(results, "results.txt");
    });

    var result = autoTester.runTest(testType);
});