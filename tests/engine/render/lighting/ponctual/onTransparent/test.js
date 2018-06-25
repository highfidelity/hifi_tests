if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Lighting on Transparent Object", Script.resolvePath("."), "secondary", function(testType) {
    // Test material matrix
    Script.include(autoTester.getUtilsRootPath() + "test_stage.js");

    // Add the test Cases
    var initData = {
        flags : { 
            hasKeyLight: false,
            hasAmbientLight: false
        },
        originFrame: autoTester.getOriginFrame()
    };
    var createdEntities = setupStage(initData);
    
    var posOri = getStagePosOriAt(4.0, -2, 0.0);

    {
        var lightOri = Quat.multiply(Quat.fromPitchYawRollDegrees(-90, 0, 0), posOri.ori);

        // Define zone properties
        var properties = {
        lifetime: 120,  
        name: "test create spot light",
        position: {
            x: 0 + posOri.pos.x,
            y: 0.060773372650146484 + posOri.pos.y,
            z: 0.240234375 + posOri.pos.z
        },
        rotation: {
            w: 0.8566262722015381,
            x: -4.57763671875e-05,
            y: -0.5159533023834229,
            z: -1.52587890625e-05
        },

        type: "Light",
        isSpotlight: true,
        color: { red: 255, green: 220, blue: 20 },
        intensity: 3.0,
        falloffRadius: 2.0,
        exponent: 0.009999999776482582,
        cutoff: 30,
        dimensions: {
            x: 3.0334904193878174,
            y: 3.0334904193878174,
            z: 6.066980838775635
        }
        };

        // Add the sphere and check its properties
        var light = Entities.addEntity(properties);
        createdEntities.push(light);
    }
    {
        var lightOri = Quat.multiply(Quat.fromPitchYawRollDegrees(-90, 0, 0), posOri.ori);

        // Define zone properties
        var properties = {
        lifetime: 120,  
        name: "test create point light",
        position: {
            x: 2.8589553833007812 + posOri.pos.x,
            y: 0 + posOri.pos.y,
            z: 0.689361572265625 + posOri.pos.z
        },
        rotation: {
            w: 0.7973296642303467,
            x: -1.52587890625e-05,
            y: 0.6035095453262329,
            z: -4.57763671875e-05
        },

        type: "Light",
        isSpotlight: false,
        color: { red: 255, green: 48, blue: 79 },
        intensity: 2.0,
        falloffRadius: 1.0,
        dimensions: {
            x: 4.0,
            y: 4.0,
            z: 4.0
        }
        };

        // Add the sphere and check its properties
        var light = Entities.addEntity(properties);
        createdEntities.push(light);
    }    
    {
        // Define model properties
        var properties = {
            lifetime: 120,  
            type: "Model",  
            name: "test create balloon",
            position: {
                x: 1.9481277465820312 + posOri.pos.x,
                y: 0.07783651351928711 + posOri.pos.y,
                z: 0 + posOri.pos.z},
            rotation: {
                w: 0.9856870174407959,
                x: -1.52587890625e-05,
                y: 0.16847491264343262,
                z: -1.52587890625e-05
            },
            modelURL: "http://mpassets.highfidelity.com/79427463-6c2f-4cb9-8282-7b6098915366-v1/redBalloon.fbx",
            dimensions: {
                x: 0.4643515646457672,
                y: 0.6182222962379456,
                z: 0.46376752853393555
            }, 
        };

        // Add the sphere and check its properties
        var model = Entities.addEntity(properties);

        properties = Entities.getEntityProperties(model);
        print("Model added :" + model);
        print(JSON.stringify(properties));

        createdEntities.push(model);
    }

    //Add test steps, These may be called via the timing mechanism for auto-testing,
    // or stepped through with the space bar
    autoTester.addStepSnapshot("Take snapshot of the effects");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = autoTester.runTest(testType);
});

