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
        "http://mpassets.highfidelity.com/0c2c264b-2fd2-46a4-bf80-de681881f66b-v1/F_MotRac.fst",
        "http://mpassets.highfidelity.com/bd80a6d7-7173-489e-87c6-f7ee56e65530-v1/M_RetFut.fst",
        "http://mpassets.highfidelity.com/47c8d706-d486-4c2d-afcc-70d4e1e25117-v1/M_RetSpaSuit.fst",
        "http://mpassets.highfidelity.com/548d0792-0bac-4933-bbfc-57d71912d77e-v1/M_OutMer.fst",
        "http://mpassets.highfidelity.com/13277c09-892f-4a5e-b9a5-8994a37d68bf-v1/F_WasWar.fst",
        "http://mpassets.highfidelity.com/2d384111-0f0e-42e2-b800-66bfcab4aefb-v1/F_VooQue.fst",
        "http://mpassets.highfidelity.com/57e4d1cd-9f52-4c95-9051-326f9bb114ea-v1/F_SteAvi.fst",
        "http://mpassets.highfidelity.com/da2ad4cd-47d4-41da-b764-41f39ff77e30-v1/F_JerGir.fst",
        "http://mpassets.highfidelity.com/96c747ab-f71b-44ee-8eb9-d19fc9593dda-v1/F_CatBur.fst",
        "http://mpassets.highfidelity.com/ede82c38-c66e-4f67-9e0b-0bb0782db18f-v1/M_WesOut.fst",
        "http://mpassets.highfidelity.com/8872ae86-a763-4db3-8373-d27514c1481e-v1/M_VinAvi.fst",
        "http://mpassets.highfidelity.com/faf505f1-4fd1-4ed2-8909-816af246c48f-v1/M_VicGen.fst",
        "http://mpassets.highfidelity.com/d807a7d2-5122-4436-a6f9-3173c94d1c49-v1/M_SuaGen.fst",
        "http://mpassets.highfidelity.com/1dd41735-06f4-45a3-9ec0-d05215ace77b-v1/M_MarSen.fst",
        "http://mpassets.highfidelity.com/2cad3894-8ab3-4ba5-a723-0234f93fbd6a-v1/M_BowBea.fst",
        "http://mpassets.highfidelity.com/cf0eb1be-9ec7-4756-8eaf-ac8f3ec09eba-v1/F_ClaDef.fst",
        "http://mpassets.highfidelity.com/0cedeca3-c1a4-4be9-9fd5-dad716afcc7e-v1/F_Cyria.fst",
        "http://mpassets.highfidelity.com/dc55803b-9215-47dd-9408-eb835dac4082-v1/F_ParGir.fst",
        "http://mpassets.highfidelity.com/775a8fb3-cfe7-494d-b603-a0a2d6910e55-v1/F_VinCov.fst",
        "http://mpassets.highfidelity.com/eba0d8f8-aa72-4a6b-ab64-4d3fd4695b20-v1/F_VogHei.fst"

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
  { min_x: -20, max_x: -7, y: -10.5, min_z: 15, max_z: 22}

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
