if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Grid Entity minorGridEvery/majorGridEvery", Script.resolvePath("."), "secondary", function(testType) {
    Script.include(nitpick.getUtilsRootPath() + "test_stage.js");
    var LIFETIME = 200;

    // Add the test Cases
    var createdEntities = [];

    MyAvatar.orientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);

    createdEntities.push(Entities.addEntity({
        lifetime: LIFETIME,
        type: "Zone",
        position: nitpick.getOriginFrame(),

        dimensions: { x: 2000.0, y: 2000.0, z: 2000.0 },

        keyLightMode: "enabled",
        keyLight:{
            color: { red: 255, green: 255, blue: 255 },
            intensity: 0.8,
            direction: { x: 0.0, y: -0.70710678118, z: -0.70710678118 }
        },

        skyboxMode: "disabled"
    }));

    function getPos(col, row) {
        var center = MyAvatar.position;
        return Vec3.sum(Vec3.sum(center, Vec3.multiply(Quat.getRight(MyAvatar.orientation), col)),
                                         Vec3.multiply(Quat.getUp(MyAvatar.orientation), row));
    }

    createdEntities.push(Entities.addEntity({
        type: "Grid",
        position: Vec3.sum(getPos(0, 0), Vec3.multiply(Quat.getFront(MyAvatar.orientation), 15)),
        dimensions: 10.0,
        followCamera: false,
        lifetime: LIFETIME
    }));

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("Set minorGridEvery", function () {
        Entities.editEntity(createdEntities[createdEntities.length - 1], { minorGridEvery: 0.5 });
    });

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("Set majorGridEvery", function () {
        Entities.editEntity(createdEntities[createdEntities.length - 1], { majorGridEvery: 10 });
    });

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});