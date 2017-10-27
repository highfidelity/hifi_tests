function findCurrentZone() {
    var foundEntitiesArray = Entities.findEntities(MyAvatar.position, 2.0);
    //print(foundEntitiesArray.length);
    var zone = null;

    foundEntitiesArray.forEach(function(foundID){
        var properties = Entities.getEntityProperties(foundID);
        if (properties.type == "Zone") {
            zone = foundID;
        } 
    });
    return zone;
}


var step = 0;
var zoneId = findCurrentZone();
var zoneProperties = Entities.getEntityProperties(zoneId);
var initialZoneProperties = {
    "visible": zoneProperties.visible,
    "locked": zoneProperties.locked,
    "keyLight": zoneProperties.keyLight
}

var steps = [
    // Step 2
    function() {
        zoneProperties = {
            "locked": false,
        };
        Entities.editEntity(zoneId, zoneProperties);
        zoneProperties = {
            "visible": false
        };
        Entities.editEntity(zoneId, zoneProperties);
    },
    // Step 3
    function() {
        zoneProperties = {
            "visible": true,
            "keyLight": {
                "intensity": 1,
                "direction": Vec3.fromPolar(10*Math.PI/180.0, 30*Math.PI/180.0),
            }
        };
        Entities.editEntity(zoneId, zoneProperties);
    },
    // Step 4
    function() {
        Entities.editEntity(zoneId, initialZoneProperties)
        MyAvatar.goToLocation(
            {x:4.91982, y:0.271947, z:-54.7686},
            true,
            Quat.angleAxis(180, {x: 0, y: 1, z: 0}),
            true
        );
    },
    // End
    function () {
    }
];

function reset() {
    MyAvatar.goToLocation(
        {x:4.91982, y:0.271947, z:-54.7686},
        true,
        Quat.angleAxis(0, {x: 0, y: 1, z: 0}),
        true
    );
}

print("Running Shadows Test - press <SPACE> to go to next steps");
reset();

Controller.keyPressEvent.connect(function(event){
    steps[step]();
    if (step<steps.length-1) {
        print("Playing Shadows Test - step "+(step+2));
        step++;
        step = Math.min(step, steps.length-1);
    } else {
        print("Playing Shadows Test - finished");
    }
 });
 