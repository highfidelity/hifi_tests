Script.include("../BenchmarkLib.js");

var TRACING_RULES = "" +
    "trace.*=true\n" +
    "*.detail=true\n" +
    "";

Resources.overrideUrlPrefix(TEST_ROOT, Script.resolvePath(".."));
var testScript = new TestScript();
testScript.addTest({
    name: "measureTimingHifiqa-master",
    loader: TestScript.locationLoader("hifi://www", true),
    tracingRules: TRACING_RULES,
    traceActions: TestScript.measureTimingSteps([
        { time: 5, step: 0.1, keepActive: true, pos: { x:   29.2, y: -8.3, z: -26.2 }, ori:{ yaw:  127.1 } }, // landing point
        { time: 5, step: 0.1, keepActive: true, pos: { x:   20.4, y: -9.3, z:   1.4 }, ori:{ yaw:   90.9 } }, // looking at quad
        { time: 5, step: 0.1, keepActive: true, pos: { x:  -29.8, y: -9.0, z:  15.0 }, ori:{ yaw: -125.2 } }, // engine pod
        { time: 5, step: 0.1, keepActive: true, pos: { x:  -22.1, y: -4.9, z: -47.3 }, ori:{ yaw:  173.6 } }, // near a chatterbox
        { time: 5, step: 0.1, keepActive: true, pos: { x: -196.8, y: -7.8, z:  82.1 }, ori:{ yaw:   40.7 } }, // capitol
    ]),
    duration: 30
});

testScript.runTests();