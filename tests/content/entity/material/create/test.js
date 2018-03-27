var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://raw.githubusercontent.com/" + user + repository + branch + "tests/utils/autoTester.js");

autoTester.enableAuto(10000);

autoTester.perform("Material Entities", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest(true);

    Script.include("../../../../utils/test_stage.js?raw=true");
    var LIFETIME = 200;

    // Add the test Cases
    var createdEntities = setupStage(true, false, false, 200);

    var posOri = getStagePosOriAt(0, 0, 0);

    var NUM_ROWS = 7;

    function getPos(col, row) {
        var center = posOri.pos;
        return Vec3.sum(Vec3.sum(center, Vec3.multiply(Quat.getRight(MyAvatar.orientation), col * 0.2)), Vec3.multiply(Quat.getUp(MyAvatar.orientation), -(row - NUM_ROWS) * 0.2));
    }

    var debugDeferredBuffer = Render.getConfig("RenderMainView").getConfig("DebugDeferredBuffer")

    function setDebugMode(mode) {
        debugDeferredBuffer.enabled = (mode != 0);
        debugDeferredBuffer.mode = mode;
    }

    setDebugMode(0);

    for (var i = 0; i <= NUM_ROWS; i++) {
        createdEntities.push(Entities.addEntity({
                      type: "Material",
                      materialURL: "userData",
                      position: getPos(-4, i),
                      userData: JSON.stringify({ "materials": {
                        "albedo": [0.5, 0, 0],
                        "roughness": i / NUM_ROWS
                      }}),
                      lifetime: LIFETIME
        }));
    }
    for (var i = 0; i <= NUM_ROWS; i++) {
        createdEntities.push(Entities.addEntity({
                      type: "Material",
                      materialURL: "userData",
                      position: getPos(-3, i),
                      userData: JSON.stringify({ "materials": {
                        "albedo": [0, 0.5, 0],
                        "opacity": i / NUM_ROWS
                      }}),
                      lifetime: LIFETIME
        }));
    }
    for (var i = 0; i <= NUM_ROWS; i++) {
        createdEntities.push(Entities.addEntity({
                      type: "Material",
                      materialURL: "userData",
                      position: getPos(-2, i),
                      userData: JSON.stringify({ "materials": {
                        "albedo": [0, 0, 0.5],
                        "metallic": i / NUM_ROWS
                      }}),
                      lifetime: LIFETIME
        }));
    }
    for (var i = 0; i <= NUM_ROWS; i++) {
        createdEntities.push(Entities.addEntity({
                      type: "Material",
                      materialURL: "userData",
                      position: getPos(-1, i),
                      userData: JSON.stringify({ "materials": {
                        "albedo": [0.5, 0.5, 0],
                        "scattering": i / NUM_ROWS
                      }}),
                      lifetime: LIFETIME
        }));
    }
    for (var i = 0; i <= NUM_ROWS; i++) {
        var secondHalf = i > NUM_ROWS / 2.0;
        createdEntities.push(Entities.addEntity({
                      type: "Material",
                      materialURL: "userData",
                      position: getPos(0, i),
                      userData: JSON.stringify({ "materials": {
                        "emissive": secondHalf ? [0, 0, 0] : [i / NUM_ROWS, 0, 1 - i / NUM_ROWS],
                        "albedo": secondHalf ? [i / NUM_ROWS, 0, 1 - i / NUM_ROWS] : [0.5, 0.5, 0.5],
                        "unlit": secondHalf
                      }}),
                      lifetime: LIFETIME
        }));
    }
    var mapStrings = ["emissiveMap", "albedoMap", "opacityMap", "metallicMap", "roughnessMap", "normalMap", "occlusionMap", "scatteringMap"];
    var mapLinks = ["http://cdn1-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg",
                    "http://cdn1-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg",
                    "https://supermariorun.com/assets/img/stage/mario03.png",
                    "https://www.filterforge.com/filters/14196-metallic.jpg",
                    "https://artisaverb.info/Cerberus/Cerberus_R.jpg",
                    "http://jsoverson.github.io/texture.js/demo/images/brickwork-normal.jpg",
                    "https://www.filterforge.com/filters/10500-ambientocclusion.jpg",
                    "https://www.filterforge.com/filters/10500-ambientocclusion.jpg",
                    "https://hifi-public.s3.amazonaws.com/sam/models/skinRenderingTest/priscilla/skin_map.jpg"];
    for (var i = 0; i <= NUM_ROWS; i++) {
        var mapString = "\"" + mapStrings[i] + "\": \"" + mapLinks[i] + "\"";
        var albedoString = "\"albedo\": [0.5, 0.5, 0.5],";
        var albedoMapString = "\"albedoMap\": \"" + mapLinks[2] + "\",";
        var scatteringMapString = "\"normalMap\": \"" + mapLinks[5] + "\",";
        createdEntities.push(Entities.addEntity({
                      type: "Material",
                      materialURL: "userData",
                      position: getPos(1, i),
                      userData: "{\"materials\": {" + albedoString + (i != 2 ? "" : albedoMapString) + (i != NUM_ROWS ? "" : scatteringMapString) + mapString + "}}",
                      lifetime: LIFETIME
        }));
    }

    var texMap = "http://www.tapper-ware.net/data/images/illustration//neutral-752517.png"
    for (var i = 0; i <= NUM_ROWS; i++) {
        createdEntities.push(Entities.addEntity({
                      type: "Material",
                      materialURL: "userData",
                      position: getPos(2, i),
                      materialMappingPos: {x: i / NUM_ROWS, y: i / NUM_ROWS},
                      userData: JSON.stringify({ "materials": {
                        "albedoMap": texMap
                      }}),
                      lifetime: LIFETIME
        }));
    }
    for (var i = 0; i <= NUM_ROWS; i++) {
        createdEntities.push(Entities.addEntity({
                      type: "Material",
                      materialURL: "userData",
                      position: getPos(3, i),
                      materialMappingScale: {x: 10.0 * (i / NUM_ROWS + 0.1), y: 10.0 * (i / NUM_ROWS + 0.1)},
                      userData: JSON.stringify({ "materials": {
                        "albedoMap": texMap
                      }}),
                      lifetime: LIFETIME
        }));
    }
    for (var i = 0; i <= NUM_ROWS; i++) {
        createdEntities.push(Entities.addEntity({
                      type: "Material",
                      materialURL: "userData",
                      position: getPos(4, i),
                      materialMappingRot: 360.0 * i / NUM_ROWS,
                      userData: JSON.stringify({ "materials": {
                        "albedoMap": texMap
                      }}),
                      lifetime: LIFETIME
        }));
    }

    //Add test steps, These may be called via the timing mechanism for auto-testing,
    // or stepped through with the space bar
    autoTester.addStepSnapshot("Take snapshot");

    autoTester.addStep("Debug Emissive", function () {
        setDebugMode(6);
    });

    autoTester.addStepSnapshot("Take snapshot");

    autoTester.addStep("Debug Albedo", function () {
        setDebugMode(2);
    });

    autoTester.addStepSnapshot("Take snapshot");

    autoTester.addStep("Debug Metallic", function () {
        setDebugMode(5);
    });

    autoTester.addStepSnapshot("Take snapshot");

    autoTester.addStep("Debug Roughness", function () {
        setDebugMode(4);
    });

    autoTester.addStepSnapshot("Take snapshot");

    autoTester.addStep("Debug Normal", function () {
        setDebugMode(3);
    });

    autoTester.addStepSnapshot("Take snapshot");

    autoTester.addStep("Debug Occlusion", function () {
        setDebugMode(8);
    });

    autoTester.addStepSnapshot("Take snapshot");

    autoTester.addStep("Debug Scattering", function () {
        setDebugMode(10);
    });

    autoTester.addStepSnapshot("Take snapshot");

    autoTester.addStep("Clean up after test", function () {
        setDebugMode(0);
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
    
    var result = autoTester.runTest(testType);
});