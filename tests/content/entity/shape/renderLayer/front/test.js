if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Shape Entity renderLayer front", Script.resolvePath("."), "secondary", function(testType) {

    Script.include(nitpick.getUtilsRootPath() + "test_stage.js");
    var LIFETIME = 200;
    var DIM = { x: 0.5, y: 0.5, z: 0.5};

    var flags = {
        hasAmbientLight: true
    };
    var createdEntities = setupStage(flags, LIFETIME);

    var posOri = getStagePosOriAt(0, 0, 0);

    nitpick.addStep("Create renderLayer front shape entitiess", function () {
        var NUM = 5.0;
        for (var i = 0; i < NUM; i++) {
            createdEntities.push(Entities.addEntity({
                type: "Box",
                position: Vec3.sum(posOri.pos, Vec3.sum(Vec3.multiply(i * DIM.z, Quat.getFront(MyAvatar.orientation)), Vec3.multiply(-1.5 * DIM.x, Quat.getRight(MyAvatar.orientation)))),
                orientation: MyAvatar.orientation,
                visible: true,
                color: { red: 255 * i / NUM, green: 0, blue: 255 * (1 - i / NUM) },
                primitiveMode: "solid",
                alpha: 1,
                renderLayer: "front",
                dimensions: DIM
            }));

            createdEntities.push(Entities.addEntity({
                type: "Box",
                position: Vec3.sum(posOri.pos, Vec3.sum(Vec3.multiply(i * DIM.z, Quat.getFront(MyAvatar.orientation)), Vec3.multiply(-0.5 * DIM.x, Quat.getRight(MyAvatar.orientation)))),
                orientation: MyAvatar.orientation,
                visible: true,
                color: { red: 255 * i / NUM, green: 0, blue: 255 * (1 - i / NUM) },
                primitiveMode: "solid",
                alpha: 0.5,
                renderLayer: "front",
                dimensions: DIM
            }));

            createdEntities.push(Entities.addEntity({
                type: "Box",
                position: Vec3.sum(posOri.pos, Vec3.sum(Vec3.multiply(i * DIM.z, Quat.getFront(MyAvatar.orientation)), Vec3.multiply(0.5 * DIM.x, Quat.getRight(MyAvatar.orientation)))),
                orientation: MyAvatar.orientation,
                visible: true,
                color: { red: 255 * i / NUM, green: 0, blue: 255 * (1 - i / NUM) },
                primitiveMode: "lines",
                alpha: 1,
                renderLayer: "front",
                dimensions: DIM
            }));

            createdEntities.push(Entities.addEntity({
                type: "Box",
                position: Vec3.sum(posOri.pos, Vec3.sum(Vec3.multiply(i * DIM.z, Quat.getFront(MyAvatar.orientation)), Vec3.multiply(1.5 * DIM.x, Quat.getRight(MyAvatar.orientation)))),
                orientation: MyAvatar.orientation,
                visible: true,
                color: { red: 255 * i / NUM, green: 0, blue: 255 * (1 - i / NUM) },
                primitiveMode: "lines",
                alpha: 0.5,
                renderLayer: "front",
                dimensions: DIM
            }));
        }

        createdEntities.push(Entities.addEntity({
                type: "Box",
                position: Vec3.sum(Vec3.sum(MyAvatar.position, Vec3.multiply(2.5, Quat.getFront(MyAvatar.orientation))), Vec3.multiply(0.25, Vec3.UP)),
                visible: true,
                alpha: 1,
                orientation: MyAvatar.orientation,
                dimensions: { x: 2, y: 2, z: 0.2}
        }));
    });

    nitpick.addStepSnapshot("Take snapshot of all the models");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});