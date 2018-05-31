// Run tests from comand line:
//      interface --testScript <full path to test script>
// 
// The Test scripting interface provides the following methods (see TestScriptingInterface.h):
//      quit()                              Exits the application
//      waitForTextureIdle()                Waits for all texture transfers to be complete
//      waitForDownloadIdle();              Waits for all pending downloads to be complete
//      waitForProcessingIdle()             Waits for all file parsing operations to be complete
//      waitIdle()                          Waits for all pending downloads, parsing and texture transfers to be complete
//      loadTestScene(QString scene)
//      startTracing(QString logrules = "") Start recording Chrome compatible tracing events, logRules can be used to specify
//                                          a set of logging category rules to limit what gets captured
//
//      stopTracing(QString filename)       Stop recording Chrome compatible tracing events and serialize recorded events to a file,
//                                          Using a filename with a .gz extension will automatically compress the output file
//
//      clear()
//      waitForConnection(qint64 maxWaitMs = 10000)
//      wait(int milliseconds)
//      waitForCondition(qint64 maxWaitMs, std::function<bool()> condition)
//      startTraceEvent(QString name)
//      endTraceEvent(QString name)
//      savePhysicsSimulationStats(QString filename)    Write detailed timing stats of next physics stepSimulation() to filename
//      profileRange(const QString& name, QScriptValue function)

TEST_ROOT = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/";
TEST_BINARY_ROOT = "https://hifi-public.s3.amazonaws.com/test_scene_data/";
TEST_SCRIPTS_ROOT = TEST_ROOT + "scripts/";
TEST_SCENES_ROOT = TEST_ROOT + "scenes/";
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
        
////        if (testStart.clearCaches) {
////            Test.clearCaches();
////        }
        
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

TestScript.sceneLoader = function (scene, waitIdle, position, orientation) {
    return function () {
        if (!Test.loadTestScene(scene)) {
            return false;
        }
        Test.wait(3 * 1000);
        if (position) {
            MyAvatar.position = position;
        }
        if (orientation) {
            MyAvatar.orientation = orientation;
        }
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
        if (!this.loader || !this.loader()) {
            print("QQQ invalid loader");
            this.nextTest();
            return;
        }
        print("QQQ loader complete, beginning trace: " + that.testName);
        Test.startTracing(this.currentTest.tracingRules || DEFAULT_TRACING_RULES);
        
        // Schedule the end
        Script.setTimeout(function () {
            that.endTest();
        }, durationSeconds * 1000);

        if (this.currentTest.traceActions) {
            print("QQQ Trace started, executing trace actions: " + that.testName);
            this.currentTest.traceActions();
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
