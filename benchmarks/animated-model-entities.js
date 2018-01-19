/* global TestScript, DEFAULT_TRACING_RULES, Test */

// This test connects to the localhost domain, and runs two benchmarks in sequence.
// 1) it spawns 100 total animated model entities in front of the camera for 10 seconds.
// 2) it spawns 1000 total animated model entities in front of the camera for 10 seconds.
// Each model and animation is currently uploaded to the hifi public AWS server.
// But there are local copies in the tests/content/entity/model folder.

Script.include("./BenchmarkLib.js");

var spawnPoint = Vec3.sum(Vec3.sum(MyAvatar.position, Vec3.multiply(1.0, Quat.getFront(MyAvatar.orientation))), {x: 0, y: 0.5, z: 0});

var entityProps = [
    {
        position: Vec3.sum(spawnPoint, Vec3.multiply(0.5, Quat.getRight(MyAvatar.orientation))),
        rotation: MyAvatar.orientation,
        dimensions: {x: 1.5601, y: 1.8097, z: 0.6777},
        modelURL: "https://hifi-public.s3.amazonaws.com/cozza13/apartment/claire/Claire.fbx",
        name: "Claire",
        type: "Model",
        animation: {
            url: "https://hifi-public.s3.amazonaws.com/cozza13/apartment/claire/Claire@t-pose_47.fbx",
            running: true,
            fps: 30,
            firstFrame: 0,
            lastFrame: 100000,
            loop: true
        }
    },
    {
        position: Vec3.sum(spawnPoint, Vec3.multiply(-0.5, Quat.getRight(MyAvatar.orientation))),
        rotation: MyAvatar.orientation,
        dimensions: {x: 1.9245, y: 2.0101, z: 0.7254},
        modelURL: "https://hifi-public.s3.amazonaws.com/cozza13/apartment/kaya/Kaya.fbx",
        name: "Kaya",
        type: "Model",
        animation: {
            url: "https://hifi-public.s3.amazonaws.com/cozza13/apartment/kaya/Kaya%40t-pose_46.fbx",
            running: true,
            fps: 30,
            firstFrame: 0,
            lastFrame: 100000,
            loop: true
        }
    }
];



var entities = [];
function spawnAnimatedModelEntities(count) {
    for (var i = 0; i < count / 2; i++) {
        var offset = Vec3.multiply(0.5, Quat.getFront(MyAvatar.orientation));
        entities = entities.concat(entityProps.map(function (prop) {
            prop.position = Vec3.sum(prop.position, offset);
            return Entities.addEntity(prop);
        }));
    }
}

function destroyAnimatedModelEntities() {
    entities.forEach(function (entity) {
        Entities.deleteEntity(entity);
    });
    entities = [];
    // reset positions
    entityProps[0].position = Vec3.sum(spawnPoint, Vec3.multiply(0.5, Quat.getRight(MyAvatar.orientation)));
    entityProps[1].position = Vec3.sum(spawnPoint, Vec3.multiply(-0.5, Quat.getRight(MyAvatar.orientation)));
}

var testScript = new TestScript();

testScript.addTest({
    name: "100 animated models",
    loader: TestScript.locationLoader("localhost",
                            true,
                            { x: 0, y: 0, z: 0 },
                            { x: 0, y: 0, z: 0, w: 1 }),
    tracingRules: DEFAULT_TRACING_RULES,
    traceActions: function () {
        Test.startTraceEvent("spawningEntities");
        spawnAnimatedModelEntities(100);
    },
    traceCompletion: function () {
        destroyAnimatedModelEntities();
    },
    duration: 10
});

testScript.addTest({
    name: "1000 animated models",
    loader: TestScript.locationLoader("localhost",
                            true,
                            { x: 0, y: 0, z: 0 },
                            { x: 0, y: 0, z: 0, w: 1 }),
    tracingRules: DEFAULT_TRACING_RULES,
    traceActions: function () {
        Test.startTraceEvent("spawningEntities");
        spawnAnimatedModelEntities(1000);
    },
    traceCompletion: function () {
        destroyAnimatedModelEntities();
    },
    duration: 10
});
testScript.runTests();

