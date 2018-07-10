PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Scene load performance", Script.resolvePath("."), "secondary", function(testType) {
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