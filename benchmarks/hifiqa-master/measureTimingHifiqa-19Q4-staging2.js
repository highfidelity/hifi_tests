Script.include("../BenchmarkLib.js");

var TRACING_RULES = "" +
    "trace.*=true\n" +
    "*.detail=true\n" +
    "";

Resources.overrideUrlPrefix(TEST_ROOT, Script.resolvePath(".."));
var testScript = new TestScript();
testScript.addTest({
    name: "measureTimingHifiqa-19Q4-staging1",
    loader: TestScript.locationLoader("hifi://staging1", true),
    tracingRules: TRACING_RULES,
    traceActions: TestScript.measureTimingSteps([
        { time: 5, step: 0.1, keepActive: true, pos: { x:   81.5, y: -97.2, z: -312.8 }, ori:{ yaw:  -45.6 } }, 
        { time: 5, step: 0.1, keepActive: true, pos: { x:   154.8, y: -97.7, z: -395.6 }, ori:{ yaw:   167.5 } }, 
        { time: 5, step: 0.1, keepActive: true, pos: { x:  159.6, y: -96.8, z:  -325.6 }, ori:{ yaw: 32.5 } }, 
        { time: 5, step: 0.1, keepActive: true, pos: { x:  127.3, y: -91.8, z: -336.2 }, ori:{ yaw:  15.7 } }, 
        { time: 5, step: 0.1, keepActive: true, pos: { x: 119.0, y: -93.9, z:  -401.8 }, ori:{ yaw:   131.5 } }, 
    ]),
    duration: 30
});

testScript.runTests();
