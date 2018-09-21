if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Apply Material Entities to Model Overlays", Script.resolvePath("."), "secondary", function(testType) {
    var createdEntities = [];
    var createdOverlays = [];

    var posOri = Vec3.sum(autoTester.getOriginFrame(), { x: 0.0, y: 1.3, z: -3.3 } );

    var NUM_ROWS = 2;
    var LIFETIME = 120;

    var DIM = {x: 0.7, y: 0.8, z: 0.14};

    function getPos(col, row) {
        var center = posOri;
        return Vec3.sum(Vec3.sum(center, Vec3.multiply(Quat.getRight(MyAvatar.orientation), col * DIM.x)), Vec3.multiply(Quat.getUp(MyAvatar.orientation), -(row - NUM_ROWS) * DIM.y));
    }

    for (var i = 0; i <= NUM_ROWS; i++) {
        for (var j = 0; j <= NUM_ROWS; j++) {
            var pos = getPos(j - NUM_ROWS/2, i + 0.5);
            var model = Overlays.addOverlay("model", {
                          position: pos,
                          lifetime: LIFETIME,
                          url: "http://mpassets.highfidelity.com/0dce3426-55c8-4641-8dd5-d76eb575b64a-v1/Anime_F_Outfit.fst",
                          dimensions: DIM,
                          orientation: MyAvatar.orientation,
                          isVisibleInSecondaryCamera: true
            });
            createdOverlays.push(model);
            if (i != 0 || j != 0) {
                var props = {
                              type: "Material",
                              materialURL: "materialData",
                              position: pos,
                              materialData: JSON.stringify({ "materials": {
                                "albedo": [i / NUM_ROWS, 0, j / NUM_ROWS ]
                              }}),
                              lifetime: LIFETIME,
                              priority: 1,
                              parentID: model
                }
                if (i == 1) {
                    props.parentMaterialName = j;
                } else if (i == 2) {
                    props.parentMaterialName = "mat::" + "StingrayPBS" + (j + 1);
                }
                createdEntities.push(Entities.addEntity(props));
            }
        }
    }

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

    // Wait 6 seconds for models to load
    autoTester.add2secondDelays(3);

    autoTester.addStepSnapshot("Display materials on multiple model overlays");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
        for (var i = 0; i < createdOverlays.length; i++) {
            Overlays.deleteOverlay(createdOverlays[i]);
        }
    });

    var result = autoTester.runTest(testType);
});