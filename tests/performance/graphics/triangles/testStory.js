if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("1 million triangles test", Script.resolvePath("."), "secondary", function(testType) {
    const LIFETIME = 120;

    // entities
    var zone;
    var model;
    var overlay;
    var box;

    var assetsRootPath = nitpick.getAssetsRootPath();
    var position = nitpick.getOriginFrame();

    var previousAvatarVisibility;
    var previousShowStatistics;
    var previousThrottleFPS;

    nitpick.addStep("Do not throttle FPS if not focus", function () {
        previousThrottleFPS = Menu.isOptionChecked("Throttle FPS If Not Focus");
        Menu.setIsOptionChecked( "Throttle FPS If Not Focus", false);
    });

    nitpick.addStep("Create zone and hide the avatar mesh", function () {
        var zoneProperties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "zone",
            position: position,
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),

            dimensions: { x: 2000.0, y: 2000.0, z: 2000.0 },

            keyLightMode: "enabled",
            keyLight:{
                color: { red: 255, green: 255, blue: 255 },
                intensity: 0.8,
                direction: { x: 0.0, y: -0.70710678118, z: -0.70710678118 }
            },

            skyboxMode: "enabled",
            skybox: {
                color: { red: 255, green: 255, blue: 255 },
                url: assetsRootPath + 'skymaps/YellowCube.jpg'
            },

            ambientLightMode: "disabled",
            hazeMode: "disabled",
            bloomMode: "disabled",
            shapeType: "box"
        };
        zone = Entities.addEntity(zoneProperties);

        // Hide the avatar
        previousAvatarVisibility = MyAvatar.getEnableMeshVisible();
        MyAvatar.setEnableMeshVisible(false);

        // Set orientation to 0
        MyAvatar.orientation = Quat.fromVec3Degrees({x: 0.0, y: 0.0, z: 0.0 });
        validationCamera_setRotation(0.0, 0.0, 0.0);

        // Show statistics (needed to activate call to `Stats::updateStats()`)
        previousShowStatistics = Menu.isOptionChecked("Show Statistics");
        Menu.setIsOptionChecked("Show Statistics", true);
    });

    nitpick.addStep("Add model with 1,000,000 triangles (appears in BOTH cameras)", function () {
        // Note that the secondary camera doubles the number of triangles
        var modelProperties = {
            type: "Model",
            modelURL: assetsRootPath + 'models/obj_models/triangles_1048576plus2.obj',
            name: model,
            position: Vec3.sum(position, {x: 0.0, y: 1.8, z: -13.0 }),
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),    
            dimensions: { x: 10.0, y: 10.0, z: 0.01 },
            lifetime: LIFETIME
        };
        model = Entities.addEntity(modelProperties);
    });

    nitpick.addDelay(16);


    var gameTimes;
    var renderTimes;
    var presentTimes;

    var gameRateAverage;
    var renderRateAverage;
    var presentRateAverage;

    const GAME_RATE_LIMIT    = 30;
    const RENDER_RATE_LIMIT  = 30;
    const PRESENT_RATE_LIMIT = 30;

    nitpick.addStep("Start measuring rates", function() {
        Stats.update();
        gameTimes    = Stats.gameLoopRate;
        renderTimes  = Stats.renderrate;
        presentTimes = Stats.presentrate;
    });

    nitpick.addStep("Measure after step", function() {
        Stats.update();
        gameTimes    += Stats.gameLoopRate;
        renderTimes  += Stats.renderrate;
        presentTimes += Stats.presentrate;
    });

    nitpick.addStep("Measure after step", function() {
        Stats.update();
        gameTimes    += Stats.gameLoopRate;
        renderTimes  += Stats.renderrate;
        presentTimes += Stats.presentrate;
    });

    nitpick.addStep("Measure after step", function() {
        Stats.update();
        gameTimes    += Stats.gameLoopRate;
        renderTimes  += Stats.renderrate;
        presentTimes += Stats.presentrate;
    });
    
    nitpick.addStep("Measure after step", function() {
        Stats.update();
        gameTimes    += Stats.gameLoopRate;
        renderTimes  += Stats.renderrate;
        presentTimes += Stats.presentrate;
    });
            
    nitpick.addStep("Average results", function() {
        gameRateAverage    = gameTimes    / 5;
        renderRateAverage  = renderTimes  / 5;
        presentRateAverage = presentTimes / 5;
    });

    nitpick.addStep("Show overlay with results", function() {
        overlay = Overlays.addOverlay("text3d", {
            position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, { x: 0.0, y: 0.8, z: -6.7 })),
            rotation: MyAvatar.orientation,
            dimensions: { x: 8, y: 0.8, z: 0.1 },
            text: "GR = " + String(gameRateAverage).substring(0,5) + ", " +
                  "RR = " + String(renderRateAverage).substring(0,5) + ", " +
                  "PR = " + String(presentRateAverage).substring(0,5),
                  
            lineHeight: 0.5
        });
    });

    nitpick.addStep("Take snapshot of results overlay, and also save as a text file", function () {
        Window.takeSnapshot(false, false, 0, "triangles_test_results.jpg");
        
        if (typeof Test !== 'undefined') {
            var results = {
                gameRateAverage:    gameRateAverage,
                renderRateAverage:  renderRateAverage,
                presentRateAverage: presentRateAverage
            }
            
            Test.saveObject(results, "triangles_test_results.txt");
        }
        
        Entities.deleteEntity(model);
    });

    nitpick.addStep("Prepare result box, green if passed, red if failed", function () {
        Overlays.deleteOverlay(overlay);
        var colour;
        if (gameRateAverage > GAME_RATE_LIMIT && renderRateAverage > RENDER_RATE_LIMIT && presentRateAverage > PRESENT_RATE_LIMIT) {
            colour = { red:   0, green: 255, blue: 0 };
        } else {
            colour = { red: 255, green: 0,   blue: 0 };
        }

        var boxProperties = {
            type: "Box",
            name: "box",
            lifetime: LIFETIME,
            color: colour,
            position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, { x: 0.0, y: 0.8, z: -2.0 })),
            dimensions: { x: 1.0, y: 1.0, z: 1.0 },
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        };
        box = Entities.addEntity(boxProperties);
    });

    nitpick.addStepSnapshot("Take snapshot of results");    

    nitpick.addStep("Clean up after test", function () {
        Entities.deleteEntity(zone);
        Entities.deleteEntity(box);

        MyAvatar.setEnableMeshVisible(previousAvatarVisibility);

        Menu.setIsOptionChecked( "Throttle FPS If Not Focus", previousThrottleFPS);
        Menu.setIsOptionChecked("Show Statistics", previousShowStatistics);
    });

    nitpick.runTest(testType);
});