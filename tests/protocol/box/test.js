if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Box protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');
    setup();
    
    var object;
  
    var entityProperties = {}
    entityProperties.type = "Box";
    entityProperties.name = "Name of entity";
    entityProperties.clientOnly = false;
    entityProperties.owningAvatarID = "{87654321-1234-6666-4444-123412349876}";
    entityProperties.lifetime = 278;  
    entityProperties.locked = true;
    entityProperties.visible = false;
    entityProperties.canCastShadow = false;
    entityProperties.position = { x: 1.2, y: 3.4, z: 5.6 };
    entityProperties.rotation = Quat.fromPitchYawRollDegrees(1.2, 34.0, 154.0);
    entityProperties.dynamic = false;
    entityProperties.registrationPoint = { x: 0.2, y: 0.4, z: 0.0444 };
    entityProperties.velocity = { x: 0, y: 0, z: 0 };
    entityProperties.damping = 0.4329;
    entityProperties.angularVelocity = { x: 0.0, y: 0.0, z: 0.0 };
    entityProperties.angularDamping = 0.3938899;
    entityProperties.gravity = { x: 1.0, y: 2.0, z: 23.0 };
    entityProperties.acceleration = { x: 0.0, y: 0.0, z: 0.0 };
    entityProperties.restitution = 0.4;
    entityProperties.friction = 4.3;
    entityProperties.density = 400;
    entityProperties.collisionless = true;
    entityProperties.ignoreForCollisions = true;
    entityProperties.collisionMask = 7;
    entityProperties.collidesWith = "static,dynamic,kinematic,";
    entityProperties.collisionSoundURL = "collisionSoundURL";
    entityProperties.collisionsWillMove = false;
    entityProperties.href = "";
    entityProperties.description = "description";
    entityProperties.userData = "{ \"latitude\": 47.0, \"longitude\": 122.0, \"year\": 2018, \"month\": 6, \"day\": 13, \"hour\": 20, \"minute\": 0 }";
    entityProperties.script = "scriptURL";
    entityProperties.scriptTimestamp = 7;
    entityProperties.serverScripts = "serverScriptsURL";
    entityProperties.parentJointIndex = 32767;
    
    entityProperties.boundingBox = {
        brn: { x: 1.0663206577, y: 3.33795213699, z: 5.55088996887 },
        tfl: { x:  1.235045075416, y: 3.490031242370, z:  5.69143104553222 },
        center: { x: 1.1506829261779785, y: 3.413991689682, z:  5.6211605072 },
        dimensions: { x: 0.1687244176864624, y: 0.15207910537719727, z:  0.14054107666015625 }
    };

    entityProperties.queryAACube = { x: 1.0616825819015503, y: 3.2616827487945557, z: 5.461682319641113, scale: 0.27663490176200867 };
    entityProperties.cloneable = false;
    entityProperties.cloneLifetime = 200;
    entityProperties.cloneLimit = 1;
    entityProperties.cloneDynamic = true;
    entityProperties.cloneAvatarEntity = false;
    entityProperties.cloneOriginID = "{12345678-4321-5555-7777-123412349876}";
    entityProperties.itemName = "item name";
    entityProperties.itemDescription = "item description";
    entityProperties.itemCategories = "item categories";
    entityProperties.itemArtist = "item artist";
    entityProperties.itemLicense = "item license";
    entityProperties.limitedRun = 123456;
    entityProperties.editionNumber = 876;
    entityProperties.entityInstanceNumber = 345;
    entityProperties.marketplaceID = "market place ID";
    entityProperties.staticCertificateVersion = 2;

    nitpick.addStep("Set up box", function () {
        object = Entities.addEntity(entityProperties);
    });
    
    nitpick.addStep("Test box", function () {
        var getProperties = Entities.getEntityProperties(object);
        showResults(compareObjects(entityProperties, getProperties));
    });
    nitpick.addStepSnapshot("Show result");
    
    nitpick.addStep("Clean up after test", function () {
        teardown();
        Entities.deleteEntity(object);
    });
    
    var result = nitpick.runTest(testType);
});
