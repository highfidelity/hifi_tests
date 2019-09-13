Script.include("../BenchmarkLib.js");

var TRACING_RULES = "" +
    "trace.*=true\n" +
    "*.detail=true\n" +
    "";

Resources.overrideUrlPrefix(TEST_ROOT, Script.resolvePath(".."));
var testScript = new TestScript();
testScript.addTest({
    name: "measureTimingHifiqa-19Q4-staging2",
    loader: TestScript.locationLoader("hifi://staging2", true),
    tracingRules: TRACING_RULES,
    traceActions: TestScript.measureTimingSteps([
        { time: 5, step: 0.1, keepActive: true, pos: { x:   81.5, y: -97.2, z: -312.8 }, ori:{ yaw:  127.1 } }, // landing point
        { time: 5, step: 0.1, keepActive: true, pos: { x:   154.8, y: -97.7, z: -395.6 }, ori:{ yaw:   90.9 } }, // looking at quad
        { time: 5, step: 0.1, keepActive: true, pos: { x:  159.6, y: -96.8, z:  -325.6 }, ori:{ yaw: -125.2 } }, // engine pod
        { time: 5, step: 0.1, keepActive: true, pos: { x:  127.3, y: -91.8, z: -336.2 }, ori:{ yaw:  173.6 } }, // near a chatterbox
        { time: 5, step: 0.1, keepActive: true, pos: { x: 119.0, y: -93.9, z:  -401.8 }, ori:{ yaw:   40.7 } }, // capitol
    ]),
    duration: 30
});

testScript.runTests();
