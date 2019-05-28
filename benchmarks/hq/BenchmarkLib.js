TEST_ROOT = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/";
DEFAULT_TRACING_RULES = "" +
    "trace.*=true\n" +
    "*.detail=false\n" +
    "";

// Pads a number to the left with 0s
function pad(num, size) {
    var s = num + "";
    while (s.length < size) {
        s = "0" + s;
    }

    return s;
}

// Formats date: YYYYMMDD_HHMM
function formatDate(date) {
    date = date || new Date();
    return date.getFullYear() + pad(date.getMonth() + 1, 2) + pad(date.getDate(), 2) + "_" + pad(date.getHours(), 2) + pad(date.getMinutes(), 2);
}

// Converts from an Euler angle object to a quaternion
function parseOrientation(orientation, defaultValue) {
    if ((orientation.x !== undefined) || (orientation.y !== undefined) || (orientation.z !== undefined) || (orientation.w !== undefined)) {
        return orientation
    } else if ((orientation.yaw !== undefined) || (orientation.pitch !== undefined) || (orientation.roll !== undefined)) {
        var y = 0.0
        var p = 0.0
        var r = 0.0
        if (orientation.pitch !== undefined) {
            p = orientation.pitch
        }
        if (orientation.yaw !== undefined) {
            y = orientation.yaw
        }
        if (orientation.roll !== undefined) {
            r = orientation.roll
        }
        return Quat.fromPitchYawRollDegrees(p, y, r)
    }

    return defaultValue
}

TestScript = function (properties) {
    properties = properties || {};
    this.dateString = formatDate();
    this.tests = [];
    return this;
};

// testStart.url - URL to load domain from
// testStart.waitIdle
// testStart.position - initial position
// testStart.orientation - initial orientation
TestScript.locationLoader = function (testStart) {
    return function () {
        print("QQQ going to URL " + testStart.url);
        Window.location = testStart.url;

        if (!Test.waitForConnection()) {
            return false;
        }

        if (testStart.position) {
            MyAvatar.position = testStart.position;
        }
        if (testStart.orientation) {
            MyAvatar.orientation = testStart.orientation;
        }
        if (testStart.waitIdle) {
            print("QQQ waiting for idle");
            Test.waitIdle();
        }
        return true;
    };
};

TestScript.locationSteps = function(steps) {
    return function () {
        print("TEST locationSteps : " + JSON.stringify(steps))

        for (var i = 0; i < steps.length; i++) {
            var step = steps[i]
            var dt = 0.0
            if (step.dt !== undefined) {
                dt = step.dt
                var nextPos = MyAvatar.position
                if (step.pos !== undefined) {
                    nextPos = step.pos;
                }

                var nextOri = MyAvatar.orientation
                if (step.ori !== undefined) {
                    nextOri = parseOrientation(step.ori, MyAvatar.orientation)
                }

                Test.wait(dt * 1000.0)
                MyAvatar.position = nextPos
                MyAvatar.orientation = nextOri
            }
        }

    }
}

TestScript.prototype = {
    addTest: function (test) {
        this.tests.push(test);
    },
    executeTest: function () {
        print("QQQ executing test " + this.testName);
        var that = this, durationSeconds;
        durationSeconds = this.currentTest.duration || 10;
        this.traceFile = "traces/trace_" + this.testName + "_" + this.dateString + ".json.gz";
        if (!this.loader || !this.loader()) {
            print("QQQ invalid loader");
            this.nextTest();
            return;
        }
        print("QQQ loader complete, beginning trace: " + that.testName);
        Test.startTracing(this.currentTest.tracingRules || DEFAULT_TRACING_RULES);

        // Schedule the end
        if (!this.currentTest.traceActions) {
            Script.setTimeout(function () {
                that.endTest();
            }, durationSeconds * 1000);
        } else {
            print("QQQ Trace started, executing trace actions: " + that.testName);
            this.currentTest.traceActions();
            this.endTest();
        }
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
            if (this.quitWhenDone) {
                print("QQQ no more tests... exiting");
                Test.quit();
                return;
            } else {
                print("QQQ no more tests... keep running");
                return;
            }
        }
        this.currentTest = this.tests.shift();
        this.testName = this.currentTest.name;
        this.loader = this.currentTest.loader;
        this.executeTest();
    },
    runTests: function (doNotQuitAtTheEnd) {
        if (doNotQuitAtTheEnd !== undefined) {
            this.quitWhenDone = !doNotQuitAtTheEnd;
        } else {
            this.quitWhenDone = true;
        }

        this.nextTest();
    }
};
