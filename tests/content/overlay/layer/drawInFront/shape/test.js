if (typeof user === 'undefined') user = "highfidelity/";
if (typeof repository === 'undefined') repository = "hifi_tests/";
if (typeof branch === 'undefined') branch = "master/";

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Shape Overlay Draw in Front", Script.resolvePath("."), "secondary", function(testType) {

    Script.include("../../../../../utils/test_stage.js?raw=true");
    var LIFETIME = 200;
    var DIM = { x: 0.5, y: 0.5, z: 0.5};

    var flags = {
        hasAmbientLight: true
    };
    var createdEntities = setupStage(flags, LIFETIME);
    var createdOverlays = [];

    var posOri = getStagePosOriAt(0, 0, 0);

    autoTester.addStep("Create drawInFront shape overlays", function () {
        var NUM = 5.0;
        for (var i = 0; i < NUM; i++) {
            createdOverlays.push(Overlays.addOverlay("cube", {
                position: Vec3.sum(posOri.pos, Vec3.sum(Vec3.multiply(i * DIM.z, Quat.getFront(MyAvatar.orientation)), Vec3.multiply(-1.5 * DIM.x, Quat.getRight(MyAvatar.orientation)))),
                orientation: MyAvatar.orientation,
                visible: true,
                color: { red: 255 * i / NUM, green: 0, blue: 255 * (1 - i / NUM) },
                isSolid: true,
                alpha: 1,
                drawInFront: true,
                dimensions: DIM,
                isVisibleInSecondaryCamera: true
            }));

            createdOverlays.push(Overlays.addOverlay("cube", {
                position: Vec3.sum(posOri.pos, Vec3.sum(Vec3.multiply(i * DIM.z, Quat.getFront(MyAvatar.orientation)), Vec3.multiply(-0.5 * DIM.x, Quat.getRight(MyAvatar.orientation)))),
                orientation: MyAvatar.orientation,
                visible: true,
                color: { red: 255 * i / NUM, green: 0, blue: 255 * (1 - i / NUM) },
                isSolid: true,
                alpha: 0.5,
                drawInFront: true,
                dimensions: DIM,
                isVisibleInSecondaryCamera: true
            }));

            createdOverlays.push(Overlays.addOverlay("cube", {
                position: Vec3.sum(posOri.pos, Vec3.sum(Vec3.multiply(i * DIM.z, Quat.getFront(MyAvatar.orientation)), Vec3.multiply(0.5 * DIM.x, Quat.getRight(MyAvatar.orientation)))),
                orientation: MyAvatar.orientation,
                visible: true,
                color: { red: 255 * i / NUM, green: 0, blue: 255 * (1 - i / NUM) },
                isSolid: false,
                alpha: 1,
                drawInFront: true,
                dimensions: DIM,
                isVisibleInSecondaryCamera: true
            }));

            createdOverlays.push(Overlays.addOverlay("cube", {
                position: Vec3.sum(posOri.pos, Vec3.sum(Vec3.multiply(i * DIM.z, Quat.getFront(MyAvatar.orientation)), Vec3.multiply(1.5 * DIM.x, Quat.getRight(MyAvatar.orientation)))),
                orientation: MyAvatar.orientation,
                visible: true,
                color: { red: 255 * i / NUM, green: 0, blue: 255 * (1 - i / NUM) },
                isSolid: false,
                alpha: 0.5,
                drawInFront: true,
                dimensions: DIM,
                isVisibleInSecondaryCamera: true
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

    autoTester.addStepSnapshot("Take snapshot of all the models");

    autoTester.addStep("Clean up after test", function () {
        for (var i in createdEntities) {
            Entities.deleteEntity(createdEntities[i]);
        }
        for (var i in createdOverlays) {
            Overlays.deleteOverlay(createdOverlays[i]);
        }
    });

    var result = autoTester.runTest(testType);
});