if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Shape Overlay Draw in Front", Script.resolvePath("."), "secondary", function(testType) {
    var LIFETIME = 200;
    var DIM = { x: 0.5, y: 0.5, z: 0.5};
    var createdEntities = [];
    var createdOverlays = [];

    var posOri = autoTester.getOriginFrame();

    var fxaaWasOn;

    autoTester.addStep("Turn off TAA for this test", function () {
        fxaaWasOn = Render.getConfig("RenderMainView.Antialiasing").fxaaOnOff;
        Render.getConfig("RenderMainView.JitterCam").none();
        Render.getConfig("RenderMainView.Antialiasing").fxaaOnOff = true;
    });

    autoTester.addStep("Create a zone", function () {
        var assetsRootPath = autoTester.getAssetsRootPath();
        var zoneProperties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "zone",
            position: posOri,
            rotation: Quat.fromPitchYawRollDegrees(90.0, 0.0, 0.0 ),
            
            dimensions: { x: 2000.0, y: 2000.0, z: 2000.0 },

            keyLightMode: "enabled",
            keyLight:{
                color: { "red": 255, "green": 255, "blue": 255 },
                intensity: 0.8,
                direction: {
                    "x": 0.0,
                    "y": -0.70710678118,
                    "z": -0.70710678118
                }
            },

            skyboxMode: "enabled",
            skybox: {
                color: { "red": 255,"green": 255,"blue": 255 },
                url: assetsRootPath + 'skymaps/ColourBoxWithSun.jpg'
            },

            ambientLightMode: "enabled",
            ambientLight: {
                ambientURL: assetsRootPath + "skymaps/Sky_Day-Sun-Mid-photo.texmeta.json",
            },

            hazeMode: "disabled"
        };
        createdEntities.push(Entities.addEntity(zoneProperties));
    });

    autoTester.addStep("Create drawInFront shape overlays", function () {
        var NUM = 5.0;
        var overlayPos = Vec3.sum(posOri.pos, { x: 0.0, y: 0.7, z: -3.5 });
        for (var i = 0; i < NUM; i++) {
            createdOverlays.push(Overlays.addOverlay("cube", {
                position: Vec3.sum(overlayPos, Vec3.sum(Vec3.multiply(i * DIM.z, Quat.getFront(MyAvatar.orientation)), Vec3.multiply(-1.5 * DIM.x, Quat.getRight(MyAvatar.orientation)))),
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
                position: Vec3.sum(overlayPos, Vec3.sum(Vec3.multiply(i * DIM.z, Quat.getFront(MyAvatar.orientation)), Vec3.multiply(-0.5 * DIM.x, Quat.getRight(MyAvatar.orientation)))),
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
                position: Vec3.sum(overlayPos, Vec3.sum(Vec3.multiply(i * DIM.z, Quat.getFront(MyAvatar.orientation)), Vec3.multiply(0.5 * DIM.x, Quat.getRight(MyAvatar.orientation)))),
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
                position: Vec3.sum(overlayPos, Vec3.sum(Vec3.multiply(i * DIM.z, Quat.getFront(MyAvatar.orientation)), Vec3.multiply(1.5 * DIM.x, Quat.getRight(MyAvatar.orientation)))),
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

        var boxPos = Vec3.sum(posOri.pos, { x: 0.0, y: 0.2, z: 0.5 });
        createdEntities.push(Entities.addEntity({
                type: "Box",
                position: Vec3.sum(Vec3.sum(posOri.pos, Vec3.multiply(2.5, Quat.getFront(MyAvatar.orientation))), Vec3.multiply(1.25, Vec3.UP)),
                visible: true,
                alpha: 1,
                orientation: MyAvatar.orientation,
                dimensions: { x: 2, y: 2, z: 0.2}
        }));
    });

    autoTester.addStepSnapshot("Take snapshot of all the models");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
        
        for (var i = 0; i < createdOverlays.length; i++) {
            Overlays.deleteOverlay(createdOverlays[i]);
        }

        if (!fxaaWasOn) {
            Render.getConfig("RenderMainView.JitterCam").play();
            Render.getConfig("RenderMainView.Antialiasing").fxaaOnOff = false;
        }
    });

    var result = autoTester.runTest(testType);
});