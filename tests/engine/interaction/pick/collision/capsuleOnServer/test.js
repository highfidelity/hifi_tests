if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));
Script.include(autoTester.getUtilsRootPath() + "test_stage.js");
// Shared script code for collision pick tests
Script.include(Script.resolvePath(autoTester.getTestsRootPath() + "/engine/interaction/pick/collision/shared.js"));

autoTester.perform("Test capsule CollisionPick on server", Script.resolvePath("."), "secondary", function(testType) {
    var createdEntities = [];
    var createdPicks = [];
    var createdOverlays = [];
    var scriptIntervals = [];
    // These overlays are created specifically to visualize entity/avatar intersections
    var collisionPointOverlays = [];
    
    function createOverlay(createdOverlays, overlayType, overlayData) {
        var overlay = Overlays.addOverlay(overlayType, overlayData);
        createdOverlays.push(overlay);
        return overlay;
    }
    
    function clearOverlays(createdOverlays) {
        for (var i = 0; i < createdOverlays.length; i++) {
            Overlays.deleteOverlay(createdOverlays[i]);
        }
        createdOverlays.length = 0;
    }
    
    // Needed because the pick is centered around its y coordinate, while our overlays and avatar have their dimensions start at some y coordinate and go upward
    function getOffsetToPickPos(capsuleHeight) {
        return { x : 0, y : capsuleHeight*0.5, z: 0 };
    }
    function getOffsetFromPickPos(capsuleHeight) {
        return Vec3.subtract({x:0,y:0,z:0}, getOffsetToPickPos(capsuleHeight));
    }
    
    var bodyJointIndex = MyAvatar.getJointIndex("body");
    var mouseJointPick = 0;
    var rightHandJointPick = 0;
    
    // Get the position to be used by the test capsule pick
    function getTestCapsulePickPos(capsuleHeight) {
        var pickToUse;
        if (!HMD.active) {
            if (mouseJointPick == 0) {
                mouseJointPick = createTestPick(createdPicks, PickType.Ray, {
                    enabled: true,
                    filter: Picks.PICK_AVATARS | Picks.PICK_ENTITIES,
                    joint: "Mouse"
                });
                Picks.setIgnoreItems(mouseJointPick, [MyAvatar.sessionUUID]);
            }
            pickToUse = mouseJointPick;
        } else {
            if (rightHandJointPick == 0) {
                rightHandJointPick = createTestPick(createdPicks, PickType.Ray, {
                    enabled: true,
                    filter: Picks.PICK_AVATARS | Picks.PICK_ENTITIES,
                    joint: "_CAMERA_RELATIVE_CONTROLLER_RIGHTHAND".replace("RIGHT", MyAvatar.getDominantHand().toUpperCase())
                });
                Picks.setIgnoreItems(rightHandJointPick, [MyAvatar.sessionUUID]);
            }
            pickToUse = rightHandJointPick;
        }
        var result = Picks.getPrevPickResult(pickToUse);
        var pointingAt = result.intersection;
        // Pick result location + capsule half-height offset + small y increase to prevent colliding with a flat ground
        return Vec3.sum(Vec3.sum(pointingAt, getOffsetToPickPos(capsuleHeight)), { x:0, y:0.01, z:0 });
    }
    
    function createTestCapsulePickAtPos(createdPicks, capsuleRadius, capsuleHeight, pos) {
        var capsuleTestPick = createTestPick(createdPicks, PickType.Collision, {
            enabled: true,
            filter: Picks.PICK_ENTITIES + Picks.PICK_AVATARS,
            shape: {
                shapeType: "capsule-y",
                dimensions: { x: capsuleRadius*2.0, y: capsuleHeight-(capsuleRadius*2.0), z: capsuleRadius*2.0 }
            },
            position: pos
        });
        Picks.setIgnoreItems(capsuleTestPick, [MyAvatar.sessionUUID]);
        
        return capsuleTestPick;
    }
    
    function setOverlayProperties(overlays, properties) {
        for (var i = 0; i < overlays.length; i++) {
            var overlay = overlays[i];
            Overlays.editOverlay(overlay, properties);
        }
    }
    
    function addScriptInterval(scriptIntervals, intervalLength, func) {
        var interval = Script.setInterval(func, intervalLength);
        scriptIntervals.push(interval);
        return interval;
    }
    
    function clearScriptIntervals(scriptIntervals) {
        for (var i = 0; i < scriptIntervals.length; i++) {
            var interval = scriptIntervals[i];
            Script.clearInterval(interval);
        }
        scriptIntervals.length = 0;
    }
    
    function createCollisionPointOverlay(collisionPointOverlays) {
        var overlay = createOverlay(collisionPointOverlays, "shape", {
            shape: "Sphere",
            dimensions: { x: 0.1, y: 0.1, z: 0.1 },
            isSolid: true,
            drawInFront: true
        });
        return overlay;
    }
    
    function visualizeCollisionPoints(collisionPointOverlays, intersectingObjects) {
        // Allocate overlays since I don't know how expensive it is to add an overlay
        // Flattened list of collision point pairs. Odd is pick (self) and even is object (other)
        var collisionPoints = [];
        for (var i = 0; i < intersectingObjects.length; i++) {
            var intersectingObject = intersectingObjects[i];
            for (var j = 0; j < intersectingObject.collisionPointPairs.length; j++) {
                collisionPoints.push(intersectingObject.collisionPointPairs[j].pick);
                collisionPoints.push(intersectingObject.collisionPointPairs[j].object);
            }
        }
        if (collisionPointOverlays.length < collisionPoints.length) {
            var toAdd = collisionPoints.length - collisionPointOverlays.length;
            for (var i = 0; i < toAdd; i++) {
                createCollisionPointOverlay(collisionPointOverlays);
            }
        }
        
        // Set positions and colors of overlays to match points
        var odd = true;
        for (var i = 0; i < collisionPoints.length; i++) {
            var collisionColor;
            if (odd) {
                collisionColor = COLOR_COLLISION_SELF;
            } else {
                collisionColor = COLOR_COLLISION_OTHER;
            }
            
            Overlays.editOverlay(collisionPointOverlays[i], {
                visible: true,
                color: collisionColor,
                position: collisionPoints[i]
            });
            
            odd = !odd;
        }
        
        // Make the rest of the overlays invisible
        for (var i = collisionPoints.length; i < collisionPointOverlays.length; i++) {
            Overlays.editOverlay(collisionPointOverlays[i], {
                visible: false
            });
        }
    }
    
    var capsuleHeight = 2.0;
    var capsuleRadius = 0.25;
    var cylinderHeight = capsuleHeight - (capsuleRadius*2.0);
    
    function visualizeCapsulePick(showCollisionPoints) {
        // Platform overlay at the very bottom which serves as the parent of the other overlays
        var baseOverlay = createOverlay(createdOverlays, "shape", {
            shape: "Quad",
            alpha: 0.2,
            dimensions: { x: capsuleRadius*2.0, y: 0.1, z: capsuleRadius*2.0 },
            position: getTestCapsulePickPos(capsuleHeight)
        });
        // These overlays will have their position and color updated to match the previous pick result
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
        
        var capsuleTestPick = createTestCapsulePickAtPos(createdPicks, capsuleRadius, capsuleHeight, getTestCapsulePickPos(capsuleHeight));
        
        addScriptInterval(scriptIntervals, 20, function() {
            // Get result from previous pick and destroy/replace with a new pick since parenting isn't implemented yet
            var result = Picks.getPrevPickResult(capsuleTestPick);
            var index = 0;
            for (; index < createdPicks.length; index++) {
                if (createdPicks[index] == capsuleTestPick) {
                    createdPicks.splice(index, 1);
                    break;
                }
            }
            Picks.removePick(capsuleTestPick);
            capsuleTestPick = createTestCapsulePickAtPos(createdPicks, capsuleRadius, capsuleHeight, getTestCapsulePickPos(capsuleHeight));
            
            // Use overlay to visualize previous pick result
            // When there is not enough time to get the result, the result may be empty, so we need to check for that
            if (result.collisionRegion != undefined) {
                Overlays.editOverlay(baseOverlay, {
                    position: Vec3.sum(result.collisionRegion.position, getOffsetFromPickPos(capsuleHeight))
                });
                var collisionColor;
                if (result.intersects) {
                    collisionColor = COLOR_YES_COLLISION;
                } else {
                    collisionColor = COLOR_NO_COLLISION;
                }
                setOverlayProperties(pickVisualizationOverlays, { color: collisionColor });
                
                if (showCollisionPoints) {
                    visualizeCollisionPoints(collisionPointOverlays, result.intersectingObjects);
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
        mouseJointPick = 0;
        rightHandJointPick = 0;
    }
    
    autoTester.addStep("Visualize pick without collision points", function () {
        visualizeCapsulePick(false);
    });
    
    autoTester.addStep("Visualize pick with collision points", function () {
        cleanup();
        visualizeCapsulePick(true);
    });
    
    autoTester.addStep("Clean up after test", function () {
        cleanup();
    });
    
    var result = autoTester.runTest(testType);
});