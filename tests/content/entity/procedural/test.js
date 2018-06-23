Script.include("https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js");
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Procedural create", Script.resolvePath("."), "secondary", function(testType) {
    var entityIds = [];

    var LIFETIME = 60; // 1 min

    MyAvatar.orientation = { x: 0, y: 1, z: 0, w: 0 };

    var assetsRepo = "https://raw.githubusercontent.com/highfidelity/hifi_tests/" + autoTester.getBranch() + "/";

    entityIds.push(Entities.addEntity({
        type: "Shape",
        shape: "Cube",
        name: "Procedural Cube Position",
        position: Vec3.sum(MyAvatar.position, Vec3.sum(Vec3.multiply(4, Quat.getFront(MyAvatar.orientation)), Vec3.multiply(-1, Quat.getRight(MyAvatar.orientation)))),
        dimensions: { x: 0.5, y: 0.5, z: 0.5 },
        lifetime: LIFETIME,
        userData: JSON.stringify({
            "ProceduralEntity": {
                "shaderUrl": assetsRepo + "assets/shaders/proceduralShapeTestPosition.fs",
                "version": 2
            }
        })
    }));

    entityIds.push(Entities.addEntity({
        type: "Shape",
        shape: "Cube",
        name: "Procedural Cube TexCoords",
        position: Vec3.sum(MyAvatar.position, Vec3.multiply(4, Quat.getFront(MyAvatar.orientation))),
        dimensions: { x: 0.5, y: 0.5, z: 0.5 },
        lifetime: LIFETIME,
        userData: JSON.stringify({
            "ProceduralEntity": {
                "shaderUrl": assetsRepo + "assets/shaders/proceduralShapeTestTexCoord.fs",
                "version": 2
            }
        })
    }));

    entityIds.push(Entities.addEntity({
        type: "Shape",
        shape: "Sphere",
        name: "Procedural Sphere Normal",
        position: Vec3.sum(MyAvatar.position, Vec3.sum(Vec3.multiply(4, Quat.getFront(MyAvatar.orientation)), Vec3.multiply(1, Quat.getRight(MyAvatar.orientation)))),
        dimensions: { x: 0.5, y: 0.5, z: 0.5 },
        lifetime: LIFETIME,
        userData: JSON.stringify({
            "ProceduralEntity": {
                "shaderUrl": assetsRepo + "assets/shaders/proceduralShapeTestNormal.fs",
                "version": 2
            }
        })
    }));

    entityIds.push(Entities.addEntity({
        type: "Zone",
        name: "Procedural Zone",
        position: MyAvatar.position,
        dimensions: { x: 5, y: 5, z: 5},
        keyLightMode: "enabled",
        keyLight:{
            "color": {"red":255,"green":255,"blue":255},
            "direction": {
                "x": 1.0,
                "y": -1.0,
                "z": 1.0
            },
            "intensity": 1.0
        },        skyboxMode: "enabled",
        lifetime: LIFETIME,
        userData: JSON.stringify({
            "ProceduralEntity": {
                "shaderUrl": assetsRepo + "assets/shaders/proceduralZoneTest.fs",
                "version": 2
            }
        })
    }));

    autoTester.addStep("Rotate secondary camera", function () {
        validationCamera_setRotation({ x: 0.0, y: 180.0, z: 0.0 });
    });
    
    autoTester.addStepSnapshot("Take snapshot of the procedural shape and zone entities");

    autoTester.addStep("Clean up after test", function () {
        for (var i in entityIds) {
            Entities.deleteEntity(entityIds[i]);
        }
    });

    var result = autoTester.runTest(testType);
});