if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = 'https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js';
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath('.'));

nitpick.perform('Entity parenting', Script.resolvePath('.'), 'secondary', function(testType) {
    var LIFETIME = 120;
    var zone;
    var parent;
    var child;
    var grandchild;
    
    var position = nitpick.getOriginFrame();

    nitpick.addStep('Create zone and entities', function () {
        var assetsRootPath = nitpick.getAssetsRootPath();
     
        zone = Entities.addEntity({
            lifetime: LIFETIME,
            type: 'Zone',
            name: 'zone',
            position: position,
            
            dimensions: { x: 2000.0, y: 2000.0, z: 2000.0 },

            keyLightMode: 'enabled',
            keyLight:{
                color: { red: 255, green: 255, blue: 255 },
                intensity: 0.8,
                direction: { x: 0.0, y: -0.70710678118, z: -0.70710678118 }
            },

            skyboxMode: 'enabled',
            skybox: {
                color: { red: 255, green: 255, blue: 255 },
                url: assetsRootPath + 'skymaps/YellowCube.jpg'
            },

            ambientLightMode: "disabled",
            hazeMode: "disabled",
            bloomMode: "disabled",
            shapeType: "box"
        });

        parent = Entities.addEntity({
            lifetime: LIFETIME,
            type: 'Box',
            name: 'Parent',
            color: { red: 255, green: 0, blue: 0 },
            dimensions: { x: 0.6, y: 0.2, z: 0.2 },
            position: Vec3.sum(position, {x: 0.0, y: 1.45, z: -1.8 }),   
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),    
            visible: true,
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        });

        child = Entities.addEntity({
            lifetime: LIFETIME,
            type: 'Box',
            name: 'Child',
            color: { red: 0, green: 255, blue: 0 },
            dimensions: { x: 0.6, y: 0.2, z: 0.2 },
            parentID: parent,
            localPosition: {x: 0.0, y: 0.4, z: 0.0 },   
            localRotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),    
            visible: true,
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        });

        grandchild = Entities.addEntity({
            lifetime: LIFETIME,
            type: 'Box',
            name: 'Grandchild',
            color: { red: 0, green: 0, blue: 255 },
            dimensions: { x: 0.6, y: 0.2, z: 0.2 },
            parentID: child,
            localPosition: {x: 0.0, y: 0.4, z: 0.0 },   
            localRotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),    
            visible: true,
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        });
    });
    nitpick.addStepSnapshot('Initial position');

    nitpick.addStep('Rotate parent 45 degrees', function () {
        Entities.editEntity(parent, { rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 45.0) });
    });
    nitpick.addStepSnapshot('All 3 rotated');

    nitpick.addStep('Rotate child 45 degrees back', function () {
        Entities.editEntity(child, { localRotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, -45.0) });
    });
    nitpick.addStepSnapshot('Child and grandchild rotated');

    nitpick.addStep('Rotate grandchild 45 degrees back', function () {
        Entities.editEntity(grandchild, { localRotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 45.0) });
    });
    nitpick.addStepSnapshot('Grandchild rotated');

    nitpick.addStep('Translate parent right', function () {
        Entities.editEntity(parent, { position: Vec3.sum(position, {x: 0.3, y: 1.45, z: -1.8 }) });
    });
    nitpick.addStepSnapshot('All shifted right');

    nitpick.addStep('Translate child left', function () {
        Entities.editEntity(child, { localPosition: {x: -0.4, y: 0.4, z: 0.0 } });
    });
    nitpick.addStepSnapshot('Child and grandchild shifted down and left');

    nitpick.addStep('Translate child left', function () {
        Entities.editEntity(grandchild, { localPosition: {x: 0.4, y: 0.4, z: 0.0 } });
    });
    nitpick.addStepSnapshot('Child and grandchild shifted down and left');
    
    nitpick.addStep('Clean up after test', function () {
        Entities.deleteEntity(zone);
        Entities.deleteEntity(parent);
        Entities.deleteEntity(child);
        Entities.deleteEntity(grandchild);
    });

    nitpick.runTest(testType);
});