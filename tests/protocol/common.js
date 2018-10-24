setup = function() {
    const LIFETIME = 120;
    var originPosition = autoTester.getOriginFrame();
    var assetsRootPath = autoTester.getAssetsRootPath();
    
    var backgroundZone;
    var box;
     
    // returns green if value is 0, else red 
    resultsColour = function(value) {
        if (value == 0) {
            return { red:   0, green: 255, blue: 0 };
        } else {
            return { red: 255, green:   0, blue: 0 };
        }
    }
  
    // compares 2 floats with 4 digit accuracy
    fEqual= function(x, y) {
        return (Math.abs(x - y) < 0.0001);
    }
    
    convertResultToLines = function(result) {
        intResult = Math.floor(result); // just to be safe
        var line = "";
        var i = 1;
        while (intResult > 0) {
            if (intResult % 2) {
                if (line !== "") {
                    line = line + ', ';
                }
                line = line + i.toString();
                intResult -= 1;
            }
            
            intResult /= 2;
            i += 1;
        }
        
        return line;
    }

    autoTester.addStep("Create a background zone", function () {
        var zoneProperties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "background",
            position: originPosition,
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0 ),
            
            dimensions: { x: 2000.0, y: 2000.0, z: 2000.0 },

            keyLightMode: "enabled",
            keyLight:{
                color: { "red": 255, "green": 255, "blue": 255 },
                intensity: 0.8,
                direction: {
                    "x": 0.0,
                    "y": -0.70710678118,
                    "z": -0.70710678118
                }
            },

            skyboxMode: "enabled",
            skybox: {
                color: { red: 255, green: 255, blue: 255 },
                url: assetsRootPath + 'skymaps/YellowCube.jpg'
            }
        };
        backgroundZone = Entities.addEntity(zoneProperties);
    });
    
    autoTester.addStep("Prepare result box, green if passed, red if failed", function () {
        var boxProperties = {
            type: "Box",
            name: "box",
            lifetime: LIFETIME,
            color: { red: 255, green: 255, blue: 255 },
            position: Vec3.sum(originPosition, { x: 0.0, y: 1.7, z: -2.0 }),
            dimensions: { x: 1.0, y: 1.0, z: 1.0 },
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        };
        box = Entities.addEntity(boxProperties);
    });
    autoTester.addStepSnapshot("Check that box is white (testing the tester...)");
});

teardown = function() {
    Entities.deleteEntity(backgroundZone);
    Entities.deleteEntity(box);
}