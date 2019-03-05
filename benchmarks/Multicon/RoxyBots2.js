//
// BetterClientSimulationBotFromRecording.js
//  examples
//
//  Created by Brad Hefta-Gaub on 2/6/17.
//  Copyright 2017 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//


var WANT_DEBUGGING = false;

randFloat = function(low, high) {
    return low + Math.random() * (high - low);
}

var AVATAR = 
        "https://s3-us-west-1.amazonaws.com/xaotica/XaosFresnelDress/XaosFresnelDress-33.fst";

var AVATAR_WEARABLE =
    "http://mpassets.highfidelity.com/d503c1d4-a4f7-41d5-a558-66df60a6b229-v1/futvrelandHeadband.fbx";
var WEARABLE_CHANGE_PROB = 50; // %

var AVATAR_URL = AVATAR;

var RECORDINGS_ARRAY = [
        "http://hifi-content.s3.amazonaws.com/simon/XaosFlowAvatar1.hfr"
    ];

var RECORDING_URL = RECORDINGS_ARRAY[0];
//print("RANDOM RECORDING SELECTED:" + RECORDING_URL);

// not quite what I want...
// For the 'OpenWorld' content:
var LOCATIONS_ARRAY = [
  { min_x: 13.2, max_x: -4.7, y:-10.9, min_z: -59.4, max_z: -69.0   }
];

var LOCATION_PARAMS = LOCATIONS_ARRAY[Math.floor(Math.random() * LOCATIONS_ARRAY.length)];

var LOCATION = { x: randFloat(LOCATION_PARAMS.min_x, LOCATION_PARAMS.max_x), y: LOCATION_PARAMS.y, z: randFloat(LOCATION_PARAMS.min_z, LOCATION_PARAMS.max_z) };

var playFromCurrentLocation = true;
var loop = true;
var wearableRotation = 0;

// Disable the privacy bubble
Users.disableIgnoreRadius();

// Set position here if playFromCurrentLocation is true
Avatar.position = LOCATION;
Avatar.orientation = Quat.fromPitchYawRollDegrees(1, 0, 0);
Avatar.scale = 1.0;
Agent.isAvatar = true;


var entityJSON = {
  "canCastShadow": true,
  "clientOnly": true,
  "dimensions":{"x":0.6481595039367676,"y":0.3168869614601135,"z":0.04202471300959587},
  "dynamic": false,

  "lifetime": 3600,
  "locked": false,
  "modelURL": AVATAR_WEARABLE,
  "name": "FloofEntity",
  "owningAvatarID": Agent.sessionUUID,
  "parentID": Agent.sessionUUID,
  "parentJointIndex": 164,
  "localPosition":{"x":0,"y":0.5100000023841858,"z":0.019999999552965164},
  "queryAACube":{"scale":2.168097734451294,"x":-1.2640780210494995,"y":-1.1782119274139404,"z":-0.9400527477264404},
  "localRotation":{"w":0.9999970197677612,"x":-9.329596650786698e-8,"y":-1.4711986295878887e-8,"z":4.540197551250458e-9},
  "type": "Model",
  "visible": true
};


// make the agent "listen" to the audio stream to cause additional audio-mixer load, technically this isn't needed when you're playing a recording
// but if you switch to a non-recording bot, you will need this, so we can leave this.
Agent.isListeningToAudioStream = true;
Avatar.skeletonModelURL = AVATAR_URL; // FIXME - currently setting an avatar while playing a recording doesn't work it will be ignored

var entityId = Entities.addEntity(entityJSON, true);
print("FLOO" + "FY:" + entityId);
Avatar.setAvatarEntityData({ entityId : entityJSON });

Recording.loadRecording(RECORDING_URL, function(success) {
    if (success) {
        Script.update.connect(update);
    } else {
        print("Failed to load recording from " + RECORDING_URL);
    }
});



count = 300; // This is necessary to wait for the audio mixer to connect
function update(event) {
    if (count > 0) {
        count--;
        return;
    }
    if (count == 0) {
        Recording.setPlayFromCurrentLocation(playFromCurrentLocation);
        Recording.setPlayerLoop(loop);
        Recording.setPlayerUseDisplayName(true);
        //Recording.setPlayerUseAttachments(true);
        Recording.setPlayerUseHeadModel(false);
        Recording.setPlayerUseSkeletonModel(false); // FIXME - this would allow you to override the recording avatar, but that's not currently working
        Recording.startPlaying();
        Vec3.print("Playing from ", Avatar.position);
        count--;
    } else if (WANT_DEBUGGING) {
        count = 100;
        Vec3.print("Avatar at: ", Avatar.position);
        Quat.print("Avatar head orientation: ", Avatar.headOrientation);
        print("outbound:"
            +" GP: " + Avatar.getDataRate("globalPositionOutbound").toFixed(2) + "\n"
            +" LP: " + Avatar.getDataRate("localPositionOutbound").toFixed(2) + "\n"
            +" BB: " + Avatar.getDataRate("avatarBoundingBoxOutbound").toFixed(2) + "\n"
            +" AO: " + Avatar.getDataRate("avatarOrientationOutbound").toFixed(2) + "\n"
            +" AS: " + Avatar.getDataRate("avatarScaleOutbound").toFixed(2) + "\n"
            +" LA: " + Avatar.getDataRate("lookAtPositionOutbound").toFixed(2) + "\n"
            +" AL: " + Avatar.getDataRate("audioLoudnessOutbound").toFixed(2) + "\n"
            +" SW: " + Avatar.getDataRate("sensorToWorkMatrixOutbound").toFixed(2) + "\n"
            +" AF: " + Avatar.getDataRate("additionalFlagsOutbound").toFixed(2) + "\n"
            +" PI: " + Avatar.getDataRate("parentInfoOutbound").toFixed(2) + "\n"
            +" FT: " + Avatar.getDataRate("faceTrackerOutbound").toFixed(2) + "\n"
            +" JD: " + Avatar.getDataRate("jointDataOutbound").toFixed(2));
    }

    updateJSON = {};
    updateJSON["rotation"] = Quat.fromPitchYawRollDegrees(0, wearableRotation, 0);
    updateJSON["localRotation"] = Quat.fromPitchYawRollDegrees(0, wearableRotation, 0);
    Avatar.setAvatarEntityData({ entityId : updateJSON});
    wearableRotation = (wearableRotation + 1);

    
    if (!Recording.isPlaying()) {
        Script.update.disconnect(update);
    }
}