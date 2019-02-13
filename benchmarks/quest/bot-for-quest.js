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

var AVATARS_ARRAY = [
    "https://highfidelity.com/api/v1/commerce/entity_edition/c5b680a0-7351-4dff-a966-8b1a1fda5976.fst?certificate_id=MEYCIQDfnnjxEeo08lZZPh2OqQ5XBDCBzze8485eW20sXkAPbwIhAN2Zkzg9TMWxDxZ8lewMl0HAyRH8iZlM7OlLNqn27jEq",
    "https://highfidelity.com/api/v1/commerce/entity_edition/0e84da75-2a59-4389-9356-a07d67482fb8.fst?certificate_id=MEUCIQD%2F4oJ%2FT7KEeTkOsZy2BJiRlXQ5aludVjgs%2FyXR9OwRHwIgFMTasXXRjz5bK7mh74LMQwJ8%2BfjkGj6ikGMBdh%2BNSUU%3D",
    "https://highfidelity.com/api/v1/commerce/entity_edition/e8de625c-8566-40c0-a93a-9e759f2c3df0.fst?certificate_id=MEUCIDR4op6lrc5hQPM1A%2FNVD8HEp9Nf0gz03cbZg4%2BouL%2B2AiEA2bDgwVfMmD2p6EgMt3F17rnnpKauRZG6AeCr%2BM77iww%3D" 
 ];


var AVATAR_URL = AVATARS_ARRAY[Math.floor(Math.random() * AVATARS_ARRAY.length)];
print("RANDOM AVATAR SELECTED:" + AVATAR_URL);

var RECORDINGS_ARRAY = [
        "http://hifi-content.s3.amazonaws.com/DomainContent/Event%20/NPC%27s/waiting6.hfr",
        //"http://hifi-content.s3.amazonaws.com/DomainContent/Event%20/NPC%27s/waiting7.hfr",
        "http://hifi-content.s3.amazonaws.com/DomainContent/Event%20/NPC%27s/waiting10.hfr",
        "http://hifi-content.s3.amazonaws.com/DomainContent/Event%20/NPC%27s/bot1.hfr",
        "http://hifi-content.s3.amazonaws.com/DomainContent/Event%20/NPC%27s/bot2.hfr",
        "http://hifi-content.s3.amazonaws.com/DomainContent/Event%20/NPC%27s/bot3.hfr",
        "http://hifi-content.s3.amazonaws.com/DomainContent/Event%20/NPC%27s/bot4.hfr"
    ];

var RECORDING_URL = RECORDINGS_ARRAY[Math.floor(Math.random() * RECORDINGS_ARRAY.length)];
print("RANDOM RECORDING SELECTED:" + RECORDING_URL);

// not quite what I want...
var LOCATIONS_ARRAY = [
  { min_x: -30, max_x: -10.1, y: 0.5, min_z: 10, max_z: 30}

];

var LOCATION_PARAMS = LOCATIONS_ARRAY[Math.floor(Math.random() * LOCATIONS_ARRAY.length)];

var LOCATION = { x: randFloat(LOCATION_PARAMS.min_x, LOCATION_PARAMS.max_x), y: LOCATION_PARAMS.y, z: randFloat(LOCATION_PARAMS.min_z, LOCATION_PARAMS.max_z) };

Vec3.print("RANDOM LOCATION SELECTED:", LOCATION);

var playFromCurrentLocation = true;
var loop = true;

// Disable the privacy bubble
Users.disableIgnoreRadius();

// Set position here if playFromCurrentLocation is true
Avatar.position = LOCATION;
Avatar.orientation = Quat.fromPitchYawRollDegrees(0, 0, 0);
Avatar.scale = 1.0;
Agent.isAvatar = true;

// make the agent "listen" to the audio stream to cause additional audio-mixer load, technically this isn't needed when you're playing a recording
// but if you switch to a non-recording bot, you will need this, so we can leave this.
Agent.isListeningToAudioStream = true;
Avatar.skeletonModelURL = AVATAR_URL; // FIXME - currently setting an avatar while playing a recording doesn't work it will be ignored

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
        Recording.setPlayerUseAttachments(true);
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

    if (!Recording.isPlaying()) {
        Script.update.disconnect(update);
    }

    // Avatar.displayName = "Bot_RAND" + randFloat(LOCATION_PARAMS.min_x, LOCATION_PARAMS.max_x);
}
