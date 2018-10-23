if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Protocol sanity", Script.resolvePath("."), "secondary", function(testType) {
    const LIFETIME = 120;
    
    var box;
    var light;
    
    autoTester.addStep("Prepare result box, green if passed, red if failed", function () {
        var boxProperties = {
            type: "Box",
            name: "box",
            lifetime: LIFETIME,
            color: { red: 255, green: 255, blue: 255 },
            position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, { x: 0.0, y: 0.8, z: -2.0 })),
            dimensions: { x: 1.0, y: 1.0, z: 1.0 },
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        };
        box = Entities.addEntity(boxProperties);
    });
    autoTester.addStepSnapshot("Check that box is white (testing the tester...");
    
    autoTester.addStep("Set up spotlight", function () {
        var properties = {
            lifetime: LIFETIME,  
            name: "ABCDEFGHIJ1234",
            type: "Light",
            isSpotlight: true,
            color: { red: 11, green: 33, blue: 55 },
            intensity: 2.0,
            falloffRadius: 6.0,
            exponent: 0.25,
            cutoff: 45.0
        };
        light = Entities.addEntity(properties);
    });
    
    autoTester.addStep("Test spotlight", function () {
        var properties = Entities.getEntityProperties(light);
        var ok = true;
        ok &= properties.lifetime == LIFETIME;
        ok &= properties.name == "ABCDEFGHIJ1234";
        ok &= properties.type == "Light";
        ok &= properties.isSpotlight == true;
        ok &= properties.color.red == 11;
        ok &= properties.color.green == 33;
        ok &= properties.color.blue == 55;
        ok &= properties.intensity == 2.0;
        ok &= properties.falloffRadius == 6.0;
        ok &= properties.exponent == 0.25;
        ok &= properties.cutoff == 45.0;
    
        var colour;
        if (ok) {
            colour = { red:   0, green: 255, blue: 0 };
        } else {
            colour = { red: 255, green:   0, blue: 0 };
        }
        
        Entities.editEntity(box, { color: colour });
    });
    
    autoTester.addStepSnapshot("Show result");
    
    autoTester.addStep("Clean up after test", function () {
        Entities.deleteEntity(box);
        Entities.deleteEntity(light);
    });
    
    var result = autoTester.runTest(testType);
});
