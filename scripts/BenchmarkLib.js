
TEST_ROOT = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/";
TEST_BINARY_ROOT = "https://hifi-public.s3.amazonaws.com/test_scene_data/";
TEST_SCRIPTS_ROOT = TEST_ROOT + "scripts/";
TEST_SCENES_ROOT = TEST_ROOT + "scenes/";
DEFAULT_TRACING_RULES = "" +
    "trace.*=true\n" +
    "*.detail=false\n" +
    "";

function pad(num, size) {
    var s = num + "";
    while (s.length < size) { s = "0" + s; }
    return s;
}

function formatDate(date) {
    date = date || new Date();
    return date.getFullYear() + pad(date.getMonth() + 1, 2) + pad(date.getDate(), 2) + "_" + pad(date.getHours(), 2) + pad(date.getMinutes(), 2);
}

TestScript = function (properties) {
    properties = properties || {};
    this.dateString = formatDate();
    this.tests = [];
    return this;
};

TestScript.locationLoader = function (url, waitIdle, position, orientation) {
    return function () {
        print("QQQ going to URL " + url);
        Window.location = url;
        Test.wait(1 * 1000);
        if (!Test.waitForConnection()) {
            return false;
        }
        if (position) {
            MyAvatar.position = position;
        }
        if (orientation) {
            MyAvatar.orientation = orientation;
        }
        print("QQQ waitIdle is " + waitIdle);
        if (waitIdle) {
            print("QQQ waiting for idle");
            Test.waitIdle();
        }
        return true;
    };
};

TestScript.sceneLoader = function (scene, waitIdle, position, orientation) {
    return function () {
        if (!Test.loadTestScene(scene)) {
            return false;
        }
        Test.wait(1 * 1000);
        if (position) {
            MyAvatar.position = position;
        }
        if (orientation) {
            MyAvatar.orientation = orientation;
        }
        print("QQQ waitIdle is " + waitIdle);
        if (waitIdle) {
            print("QQQ waiting for idle");
            Test.waitIdle();
        }
        return true;
    };
};

TestScript.prototype = {
    addTest: function (test) {
        this.tests.push(test);
    },
    executeTest: function () {
        print("QQQ executing test " + this.testName);
        var that = this, durationSeconds;
        durationSeconds = this.currentTest.duration || 10;
        this.traceFile = "traces/trace_" + this.testName + "_" + this.dateString + ".json.gz";
        if (!this.loader) {
            print("QQQ invalid loader");
            this.nextTest();
            return;
        }
        print("QQQ running loader ");
        if (!this.loader()) {
            print("QQQ invalid loader");
            this.nextTest();
            return;
        }
        print("QQQ loader complete, beginning trace: " + that.testName);
        Test.startTracing(this.currentTest.tracingRules || DEFAULT_TRACING_RULES);
        if (this.currentTest.traceActions) {
            print("QQQ Trace started, executing trace actions: " + that.testName);
            this.currentTest.traceActions();
        }
        Script.setTimeout(function () {
            that.endTest();
        }, durationSeconds * 1000);
    },
    endTest: function () {
        print("QQQ ending test " + this.testName);
        if (this.currentTest.traceCompletion) {
            print("QQQ Trace finishing, executing trace completion : " + this.testName);
            this.currentTest.traceCompletion()
        }
        Test.stopTracing(this.traceFile);
        this.nextTest();
    },
    nextTest: function () {
        print("QQQ next test");
        if (0 === this.tests.length) {
            print("QQQ no more tests... exiting");
            Test.quit();
        }
        this.currentTest = this.tests.shift();
        this.testName = this.currentTest.name;
        this.loader = this.currentTest.loader;
        this.executeTest();
    },
    runTests: function () {
        this.nextTest();
    }
};

print("QQQ bar");
