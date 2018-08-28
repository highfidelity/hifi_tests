if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));
Script.include(autoTester.getUtilsRootPath() + "test_stage.js");
// Shared script code for collision pick tests
Script.include(Script.resolvePath(autoTester.getTestsRootPath() + "/engine/interaction/pick/collision/shared.js"));

// A test model with joints
var jointModelPath = Script.resolvePath(autoTester.getAssetsRootPath() + "/models/geometry/avatars/claire/Claire.fbx");
var testModelJointName = "LeftToeBase";

autoTester.perform("Test pick parenting on server", Script.resolvePath("."), "secondary", function(testType) {
    var createdEntities = [];
    var createdPicks = [];
    var createdOverlays = [];
    var scriptIntervals = [];
    // These overlays are created specifically to visualize entity/avatar intersections
    var collisionPointOverlays = [];
    
    // Needed because the pick is centered around its y coordinate, while our overlays and avatar have their dimensions start at some y coordinate and go upward
    function getOffsetToPickPos(capsuleHeight) {
        return { x : 0, y : capsuleHeight*0.5, z: 0 };
    }
    function getOffsetFromPickPos(capsuleHeight) {
        return Vec3.subtract({x:0,y:0,z:0}, getOffsetToPickPos(capsuleHeight));
    }
    
    function visualizeMouseCapsulePick(showCollisionPoints, createdPicks, createdOverlays, scriptIntervals) {
        var capsuleHeight = 0.04;
        var capsuleRadius = 0.005;
        var capsuleCollisionPointSize = 0.0005;
        var cylinderHeight = capsuleHeight - (capsuleRadius*2.0);
        
        // Platform overlay at the very bottom which serves as the parent of the other overlays
        // Its position will be updated to match the previous pick result
        var baseOverlay = createOverlay(createdOverlays, "shape", {
            shape: "Quad",
            alpha: 0.2,
            dimensions: { x: capsuleRadius*2.0, y: capsuleRadius*0.1, z: capsuleRadius*2.0 },
            position: { x:0, y:0, z:0 }
        });
        // These overlays will have their color updated to match the previous pick result
        var lowerSphere = createOverlay(createdOverlays, "shape", {
            parentID: baseOverlay,
            shape: "Sphere",
            dimensions: { x: capsuleRadius, y: capsuleRadius, z: capsuleRadius },
            localPosition: {x:0, y:capsuleRadius, z:0}
        });
        var cylinder = createOverlay(createdOverlays, "shape", {
            parentID: baseOverlay,
            shape: "Cylinder",
            dimensions: { x: capsuleRadius*2.0, y: cylinderHeight, z: capsuleRadius*2.0 },
            localPosition: {x:0, y:capsuleRadius+(cylinderHeight*0.5), z:0}
        });
        var upperSphere = createOverlay(createdOverlays, "shape", {
            parentID: baseOverlay,
            shape: "Sphere",
            dimensions: { x: capsuleRadius, y: capsuleRadius, z: capsuleRadius },
            localPosition: {x:0, y:capsuleRadius + cylinderHeight, z:0}
        });
        var pickVisualizationOverlays = [lowerSphere, cylinder, upperSphere]
        
        var capsuleTestPick = createTestPick(createdPicks, PickType.Collision, {
            enabled: true,
            filter: Picks.PICK_ENTITIES + Picks.PICK_AVATARS,
            shape: {
                shapeType: "capsule-y",
                dimensions: { x: capsuleRadius*2.0, y: capsuleHeight-(capsuleRadius*2.0), z: capsuleRadius*2.0 }
            },
            position: {x:0, y:1.01*capsuleHeight*0.5, z:0},
            joint: "Mouse"
        });
        Picks.setIgnoreItems(capsuleTestPick, [MyAvatar.sessionUUID]);
        
        addScriptInterval(scriptIntervals, 20, function() {
            // Get result from previous pick, whose location should automatically update to match its parent
            var result = Picks.getPrevPickResult(capsuleTestPick);
            
            // Use overlay to visualize previous pick result
            // When there is not enough time to get the result, the result may be empty, so we need to check for that
            if (result.collisionRegion != undefined) {
                updatePickVisualization(baseOverlay, pickVisualizationOverlays, result, getOffsetFromPickPos(capsuleHeight));
                
                if (showCollisionPoints) {
                    visualizeCollisionPoints(collisionPointOverlays, result.intersectingObjects, capsuleCollisionPointSize, -1);
                }
            }
        });
    }
    
    function visualizeHandBoxPick(showCollisionPoints, createdPicks, createdOverlays, scriptIntervals) {
        var handBoxWidth = 0.2;
        var handBoxCollisionPointSize = handBoxWidth*0.05;
        
        // Platform overlay at the very bottom which serves as the parent of the other overlays
        // Its position will be updated to match the previous pick result
        var baseOverlay = createOverlay(createdOverlays, "shape", {
            shape: "Quad",
            alpha: 0.2,
            dimensions: { x: handBoxWidth, y: handBoxWidth*0.1, z: handBoxWidth },
            position: { x:0, y:0, z:0 }
        });
        // This overlay will have its color updated to match the previous pick result
        var handBox = createOverlay(createdOverlays, "shape", {
            parentID: baseOverlay,
            shape: "Quad",
            alpha: 0.3,
            isSolid: true,
            dimensions: { x: handBoxWidth, y: handBoxWidth, z: handBoxWidth },
            localPosition: {x:0, y:0, z:0}
        });
        var pickVisualizationOverlays = [handBox]
        
        var handBoxTestPick = createTestPick(createdPicks, PickType.Collision, {
            enabled: true,
            filter: Picks.PICK_ENTITIES + Picks.PICK_AVATARS,
            shape: {
                shapeType: "box",
                dimensions: { x: handBoxWidth, y: handBoxWidth, z: handBoxWidth }
            },
            position: {x:0, y:handBoxWidth, z:0},
            joint: "_CAMERA_RELATIVE_CONTROLLER_RIGHTHAND".replace("RIGHT", MyAvatar.getDominantHand().toUpperCase())
        });
        Picks.setIgnoreItems(handBoxTestPick, [MyAvatar.sessionUUID]);
        
        addScriptInterval(scriptIntervals, 20, function() {
            // Get result from previous pick, whose location should automatically update to match its parent
            var result = Picks.getPrevPickResult(handBoxTestPick);
            
            // Use overlay to visualize previous pick result
            // When there is not enough time to get the result, the result may be empty, so we need to check for that
            if (result.collisionRegion != undefined) {
                updatePickVisualization(baseOverlay, pickVisualizationOverlays, result, Vec3.ZERO);
                
                if (showCollisionPoints) {
                    visualizeCollisionPoints(collisionPointOverlays, result.intersectingObjects, handBoxCollisionPointSize, -1);
                }
            }
        });
    }
    
    function visualizeModelJointPick(showCollisionPoints, createdPicks, createdOverlays, scriptIntervals) {
        // TODO: Figure out why the pick is just attaching to the center of the model rather than the specified joint. I suspect it's an issue with the model file used, since the collision detection is otherwise correct
        var cylinderLength = 0.3;
        var cylinderRadius = cylinderLength * 0.25;
        var cylinderCollisionPointSize = cylinderLength*0.05;
        
        var testModel = createEntity(createdEntities, {
            type: "Model",
            modelURL: jointModelPath,
            lifetime: 5*60,
            position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, Vec3.UP))
        });
        
        // Platform overlay at the very bottom which serves as the parent of the other overlays
        // Its position will be updated to match the previous pick result
        var baseOverlay = createOverlay(createdOverlays, "shape", {
            shape: "Quad",
            alpha: 0.2,
            dimensions: { x: cylinderRadius*2.0, y: cylinderLength*0.1, z: cylinderRadius*2.0 },
            position: { x:0, y:0, z:0 },
            orientation: Quat.normalize({ x:0, y:0, z:1, w:1})
        });
        // This overlay will have its color updated to match the previous pick result
        var handBox = createOverlay(createdOverlays, "shape", {
            parentID: baseOverlay,
            shape: "Cylinder",
            dimensions: { x: cylinderRadius*2.0, y: cylinderLength, z: cylinderRadius*2.0 },
            localPosition: {x:0, y:0, z:0}
        });
        var pickVisualizationOverlays = [handBox]
        
        var jointCylinderTestPick = createTestPick(createdPicks, PickType.Collision, {
            enabled: true,
            filter: Picks.PICK_ENTITIES + Picks.PICK_AVATARS,
            shape: {
                shapeType: "cylinder-x",
                dimensions: { x: cylinderLength, y: cylinderRadius*2.0, z: cylinderRadius*2.0 }
            },
            position: {x:0, y:0, z:0},
            parentID: testModel,
            parentJointIndex: Entities.getJointIndex(testModel, testModelJointName)
        });
        Picks.setIgnoreItems(jointCylinderTestPick, [testModel]);
        
        addScriptInterval(scriptIntervals, 20, function() {
            // Get result from previous pick, whose location should automatically update to match its parent
            var result = Picks.getPrevPickResult(jointCylinderTestPick);
            
            // Use overlay to visualize previous pick result
            // When there is not enough time to get the result, the result may be empty, so we need to check for that
            if (result.collisionRegion != undefined) {
                updatePickVisualization(baseOverlay, pickVisualizationOverlays, result, Vec3.ZERO);
                
                if (showCollisionPoints) {
                    visualizeCollisionPoints(collisionPointOverlays, result.intersectingObjects, cylinderCollisionPointSize, -1);
                }
            }
        });
    }
    
    function visualizeRayParentedPick(showCollisionPoints, createdPicks, createdOverlays, scriptIntervals) {
        var capsuleHeight = 2.0;
        var capsuleRadius = 0.25;
        var capsuleCollisionPointSize = 0.1;
        var cylinderHeight = capsuleHeight - (capsuleRadius*2.0);
        var pickHeightOffset = 0.01;
        
        // Platform overlay at the very bottom which serves as the parent of the other overlays
        // Its position will be updated to match the previous pick result
        var baseOverlay = createOverlay(createdOverlays, "shape", {
            shape: "Quad",
            alpha: 0.2,
            dimensions: { x: capsuleRadius*2.0, y: capsuleRadius*0.1, z: capsuleRadius*2.0 },
            position: { x:0, y:0, z:0 }
        });
        // These overlays will have their color updated to match the previous pick result
        var lowerSphere = createOverlay(createdOverlays, "shape", {
            parentID: baseOverlay,
            shape: "Sphere",
            dimensions: { x: capsuleRadius, y: capsuleRadius, z: capsuleRadius },
            localPosition: {x:0, y:capsuleRadius, z:0}
        });
        var cylinder = createOverlay(createdOverlays, "shape", {
            parentID: baseOverlay,
            shape: "Cylinder",
            dimensions: { x: capsuleRadius*2.0, y: cylinderHeight, z: capsuleRadius*2.0 },
            localPosition: {x:0, y:capsuleRadius+(cylinderHeight*0.5), z:0}
        });
        var upperSphere = createOverlay(createdOverlays, "shape", {
            parentID: baseOverlay,
            shape: "Sphere",
            dimensions: { x: capsuleRadius, y: capsuleRadius, z: capsuleRadius },
            localPosition: {x:0, y:capsuleRadius + cylinderHeight, z:0}
        });
        var pickVisualizationOverlays = [lowerSphere, cylinder, upperSphere];
        
        var parentRayPick = createTestPick(createdPicks, PickType.Ray, {
            enabled: true,
            filter: Picks.PICK_ENTITIES + Picks.PICK_AVATARS,
            joint: "_CAMERA_RELATIVE_CONTROLLER_RIGHTHAND".replace("RIGHT", MyAvatar.getDominantHand().toUpperCase())
        });
        
        var capsuleTestPick = createTestPick(createdPicks, PickType.Collision, {
            enabled: true,
            filter: Picks.PICK_ENTITIES + Picks.PICK_AVATARS,
            shape: {
                shapeType: "capsule-y",
                dimensions: { x: capsuleRadius*2.0, y: capsuleHeight-(capsuleRadius*2.0), z: capsuleRadius*2.0 }
            },
            position: { x:0, y:pickHeightOffset+(capsuleHeight*0.5), z:0 },
            parentID: parentRayPick,
            threshold: 0.05
        });
        
        Picks.setIgnoreItems(parentRayPick, [MyAvatar.sessionUUID]);
        Picks.setIgnoreItems(capsuleTestPick, [MyAvatar.sessionUUID]);
        
        addScriptInterval(scriptIntervals, 20, function() {
            // Get result from previous pick, whose location should automatically update to match its parent
            var result = Picks.getPrevPickResult(capsuleTestPick);
            
            // Use overlay to visualize previous pick result
            // When there is not enough time to get the result, the result may be empty, so we need to check for that
            if (result.collisionRegion != undefined) {
                updatePickVisualization(baseOverlay, pickVisualizationOverlays, result, getOffsetFromPickPos(capsuleHeight));
                
                if (showCollisionPoints) {
                    visualizeCollisionPoints(collisionPointOverlays, result.intersectingObjects, capsuleCollisionPointSize, -1);
                }
            }
        });
    }
    
    function cleanup() {
        clearScriptIntervals(scriptIntervals);
        clearEntities(createdEntities);
        clearTestPicks(createdPicks);
        clearOverlays(createdOverlays);
        clearOverlays(collisionPointOverlays);
    }
    
    Script.scriptEnding.connect(cleanup);
    
    autoTester.addStep("Please use Desktop", function () {
        cleanup();
    });
    
    autoTester.addStep("Visualize capsule pick parented to the mouse (with contact points)", function () {
        cleanup();
        visualizeMouseCapsulePick(true, createdPicks, createdOverlays, scriptIntervals);
    });
    
    autoTester.addStep("Please use HMD", function () {
        cleanup();
    });
    
    autoTester.addStep("Visualize box pick parented to the dominant hand (with contact points)", function () {
        cleanup();
        visualizeHandBoxPick(true, createdPicks, createdOverlays, scriptIntervals);
    });
    
    autoTester.addStep("Desktop mode recommended", function () {
        cleanup();
    });
    
    autoTester.addStep("Visualize cylinder pick parented to model joint (with contact points)", function () {
        cleanup();
        visualizeModelJointPick(true, createdPicks, createdOverlays, scriptIntervals);
    });
    
    autoTester.addStep("Please use HMD", function () {
        cleanup();
    });
    
    autoTester.addStep("Visualize capsule pick parented to joint ray pick (with contact points)", function () {
        cleanup();
        visualizeRayParentedPick(true, createdPicks, createdOverlays, scriptIntervals);
    });
    
    autoTester.addStep("Clean up after test", function () {
        cleanup();
    });
    
    var result = autoTester.runTest(testType);
});