if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Shadow control", Script.resolvePath("."), "secondary", function(testType) {
    var LIFETIME = 120;
    var zone;
    var terrain;
    var sphere;
	
    var renderShadowsFlag;
    
    nitpick.addStep("Create zone and add objects", function () {
        var assetsRootPath = nitpick.getAssetsRootPath();
        zone = Entities.addEntity({
            lifetime: LIFETIME,
            type: "Zone",
            name: "zone",
            position: nitpick.getOriginFrame(),
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
        });
        
        terrain = Entities.addEntity({
            lifetime: LIFETIME,
            type: "Box",
            name: "terrain",
            position: Vec3.sum(nitpick.getOriginFrame(), { x: 0.0, y: 0.0, z: -4.0 }),
            dimensions: { x: 12.0, y: 0.1, z: 40.0 },
            color: { red: 200, green: 200 , blue: 200 },
            visible: true,
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        });
        
        sphere = Entities.addEntity({
            lifetime: LIFETIME,
            type: "Sphere",
            name: "sphere",
            position: Vec3.sum(nitpick.getOriginFrame(), { x: 0.0, y: 2.2, z: -10.0 }),
            dimensions: { x: 5.0, y: 1.6, z: 16.0 },
            color: { red: 255, green: 0 , blue: 0 },
            visible: true,
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        });
            
        // Make sure renderer has shadows enabled
        renderShadowsFlag = Menu.isOptionChecked("Shadows");
        Menu.setIsOptionChecked("Shadows", true);
    });
    nitpick.addStepSnapshot("No shadows");
    

    nitpick.addStep("Let zone show shadows", function () {
        Entities.editEntity(zone, { keyLight: { castShadows: true }});  
    });
    nitpick.addStepSnapshot("Shadow is visible");

    nitpick.addStep("Disable casting of shadow by sphere", function () {
        Entities.editEntity(sphere, { canCastShadow: false });  
    });
    nitpick.addStepSnapshot("Shadow is not visible");

    nitpick.addStep("Disable casting of shadows by renderer", function () {
        Entities.editEntity(sphere, { canCastShadow: true });
        Menu.setIsOptionChecked("Shadows", false);
    });
    nitpick.addStepSnapshot("Shadow is not visible");

    nitpick.addStep("Re-enable casting of shadows by renderer", function () {
        Menu.setIsOptionChecked("Shadows", true);
    });
    nitpick.addStepSnapshot("Shadow is visible");
    
    nitpick.addStep("Clean up after test", function () {
        Menu.setIsOptionChecked("Shadows", renderShadowsFlag);

        Entities.deleteEntity(sphere);
        Entities.deleteEntity(terrain);
        Entities.deleteEntity(zone);
    });

    nitpick.runTest(testType);
});