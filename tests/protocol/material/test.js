if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');
    setup();
    
    var object;
  
    var setProperties = {
        lifetime: 432,  
        name: "Name of material entity",
        type: "Material",
        position: { x: 1.2, y: 3.4, z: 5.6 },
        dimensions: { x: 0.1, y: 0.1, z: 0.1 },
        naturalDimensions: { x: 1, y: 1, z: 1 },
        naturalPosition: { x: 0, y: 0, z: 0 },
        rotation: Quat.fromPitchYawRollDegrees(1.2, 34.0, 154.0),
        velocity: { x: 0.0, y: 0.0, z: 0.0 },
        gravity: { x: 0.0, y: 0.0, z: 0.0 },
        acceleration: { x: 0.0, y: 0.0, z: 0.0 },
        damping: 0.393464354317,
        restitution: 0.4,
        friction: 0.3,
        density: 400,
        script: "scriptURL",
        scriptTimestamp: 7,
        serverScripts: "serverScriptsURL",
        registrationPoint: { x: 0.2, y: 0.4, z: 0.0444 },
        angularVelocity: { x: 0.0, y: 0.0, z: 0.0 },
        angularDamping: 0.3934699,
        visible: true,
        canCastShadow: false,
        collisionless: false,
        ignoreForCollisions: false,
        collisionMask: 7,
        collidesWith: "static,dynamic,kinematic,",
        dynamic: false,
        collisionsWillMove: false,
        href: false,
        description: "description",
        locked: false,
        userData: JSON.stringify({ grabbableKey: { grabbable: false } }),
        itemName: "item name",
        itemDescription: "item description",
        itemCategories: "item categories",
        itemArtist: "item artist",
        itemLicense: "item license",
        limitedRun: 123456,
        marketplaceID: "market place ID",
        editionNumber: 876,
        entityInstanceNumber: 345,
        staticCertificateVersion: 2,
        collisionSoundURL: "collisionSoundURL",
        materialURL: "materialURL",
        materialMappingMode: "uv",
        priority: 3,
        parentMaterialName: "parent",
        materialMappingPos: { x: 0.4, y: 0.7 },
        materialMappingScale: { x: 0.7, y: 0.3 },
        materialMappingRot: 0.02,
        materialData: JSON.stringify({ 
            "materials": { 
                "albedo": [0.5, 0.1, 0.2], 
                "roughness": 0.2 
            }
        }),
        boundingBox: {
            brn: { x: -0.4, y: 0.9, z: -0.3 },
            tfl: { x:  0.4, y: 1.1, z:   0.3 },
            center: { x: -0.001, y: 0.9, z:  0.02 },
            dimensions: { x: 0.8, y: 0.2, z:  0.6 }
        },
        originalTextures: {},
        parentID: "{12345678-4321-5555-7777-123412349876}",
        parentJointIndex: 32767,
        queryAACube: { x: 2.3, y: 7.92, z: 4.13, scale: 0.234},
        localPosition: { x: 0.2, y: 0.3, z: 0.4},
        localRotation: { x: 0.5, y: 0.4, z: 0.3},
        localVelocity: { x: 0.2, y: 0.1, z: 0.002},
        localDimensions: { x: 0.1, y: 0.2, z: 0.3},
        clientOnly: true,
        owningAvatarID: "{87654321-1234-6666-4444-123412349876}",
        cloneable: false,
        cloneLifetime: 200,
        cloneLimit: 1,
        cloneDynamic: true,
        cloneAvatarEntity: false,
        cloneOriginID: "{12345678-4321-5555-7777-123412349876}"
    };

    autoTester.addStep("Set up material", function () {
        object = Entities.addEntity(setProperties);
    });
    
    autoTester.addStep("Test material", function () {
        var getProperties = Entities.getEntityProperties(object);
        showResults(compareObjects(setProperties, getProperties));
    });
    autoTester.addStepSnapshot("Show result");
    
    autoTester.addStep("Clean up after test", function () {
        teardown();
        Entities.deleteEntity(object);
    });
    
    var result = autoTester.runTest(testType);
});
