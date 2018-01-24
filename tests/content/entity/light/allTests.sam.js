// This is an automatically generated file, created by auto-tester

var autoTester = Script.require("../../../utils/autoTester.js" );
//autoTester.enableAuto();

Script.include("./point/create/test.js?raw=true");
//Script.include("./spot/create/test.js?raw=true");
/*
var test1 = Script.require("../point/create/test.js");
var test2 = Script.require("../spot/create/test.js");

var test1HasNotStarted = true;
var test2HasNotStarted = true;

// Check every second if the current test is complete and the next test can be run
var testTimer = Script.setInterval(
    function() {
        if (test1HasNotStarted) {
            test1HasNotStarted = false;
            test1.test("auto");
            print("******started test 1******");
        }

        if (test1.complete && test2HasNotStarted) {
            test2HasNotStarted = false;
            test2.test("auto");
            print("******started test 2******");
        }

        if (test2.complete) {
            print("******stopping******");
            Script.stop();
        }

    },

    1000
);

// Stop the timer and clear the module cache
Script.scriptEnding.connect(
    function() {
        Script.clearInterval(testTimer);
        Script.require.cache = {};
    }
);
*/