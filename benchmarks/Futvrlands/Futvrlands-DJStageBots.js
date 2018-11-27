//
// Futvrelands-DJStageBots.js
//
//  Created by Sam Gateau building on many others (November 2018).
//  Copyright 2018 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

randFloat = function(low, high) {
    return low + Math.random() * (high - low);
}


var RECORDINGS_ARRAY = [
  "eventer1.hfr",
  // "cop1.hfr", // Bad Model
  // "cop2.hfr", // Bad Model
  "waiting1.hfr",
  "waiting2.hfr",
  // "waiting3.hfr", // Bad Model
  "waiting4.hfr",
  // "waiting5.hfr", // Moves downward
  "waiting6.hfr",
  // "waiting7.hfr", // Bad Model
  "waiting8.hfr",
  "waiting9.hfr",
  "waiting10.hfr",
  "bot1.hfr",
  "bot2.hfr",
  "bot3.hfr",
  "bot4.hfr",
  "check_12.hfr",
  "peanuts.hfr",
  "claude.hfr",
  "usher1.hfr",
  "usher2.hfr",
  "usher3.hfr",
  "jim.hfr"
];

var RECORDING_URL = "http://hifi-content.s3.amazonaws.com/DomainContent/Event%20/NPC%27s/" + RECORDINGS_ARRAY[Math.floor(Math.random() * RECORDINGS_ARRAY.length)];
print("RANDOM RECORDING SELECTED:" + RECORDING_URL);

var LOCATIONS_ARRAY = [{ min_x: 20, max_x: 21, y: 0.5, min_z: 20, max_z: 21}];

var LOCATION_PARAMS = LOCATIONS_ARRAY[Math.floor(Math.random() * LOCATIONS_ARRAY.length)];

var LOCATION = { x: randFloat(LOCATION_PARAMS.min_x, LOCATION_PARAMS.max_x) - 72.0, y: LOCATION_PARAMS.y - 22.0, z: randFloat(LOCATION_PARAMS.min_z, LOCATION_PARAMS.max_z) + 74.0 };


var LOCATION_ORIGIN = {x:-80.5, y:-22.0, z:83.5};
var LOCATION_POLAR = { min_yaw: 60, max_yaw: 200, min_radius: 6.0, max_radius: 13.0 }


randFloat = function(low, high) {
    return low + Math.random() * (high - low);
}

clamp = function(x, lower, upper) {
    return Math.max(lower, Math.min(upper, x));
}

smoothstep = function(edge0, edge1, x) {
    var t = clamp( (x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3.0 - 2.0 * t);
} 

function genLocation(seed) {
    var sign = (seed >= 0.5 ? 1.0 : -1.0);
    var absSeed = 2.0 * Math.abs((seed - 0.5));
    //var param = smoothstep(1.0, 0.0, absSeed);
    var param = (1.0 - absSeed) * (1.0 - absSeed);
    var yawCoord = 0.5 + sign * 0.5 * param
    var yaw = LOCATION_POLAR.min_yaw + yawCoord * (LOCATION_POLAR.max_yaw - LOCATION_POLAR.min_yaw);

    var radiusCoord = (1.0 - Math.abs(2 * yawCoord - 1.0) * Math.abs(2 * yawCoord - 1.0))
   // var radiusCoord = Math.cos(Math.abs(2 * yawCoord - 1.0))
    var radiusNoise = Math.random()
    //var radiusNoise = 1.0
    radiusCoord = radiusCoord * radiusNoise;

    var radius = LOCATION_POLAR.min_radius + (LOCATION_POLAR.max_radius - LOCATION_POLAR.min_radius) *  radiusCoord;

    var polar = { x: 0, y: yaw * Math.PI / 180, z: radius };
    var p = Vec3.fromPolar(polar);

    var pos = Vec3.sum(LOCATION_ORIGIN, p);
    print(JSON.stringify(pos))
    return pos;
}
LOCATION = genLocation(Math.random());

Vec3.print("RANDOM LOCATION SELECTED:", LOCATION);

// Disable the privacy bubble
Users.disableIgnoreRadius();

// Set position here if playFromCurrentLocation is true
Avatar.position = LOCATION;
Avatar.orientation = Quat.fromPitchYawRollDegrees(0, randFloat(0, 360), 0);
Avatar.scale = 1.0;
Agent.isAvatar = true;

// make the agent "listen" to the audio stream to cause additional audio-mixer load, technically this isn't needed when you're playing a recording
// but if you switch to a non-recording bot, you will need this, so we can leave this.
Agent.isListeningToAudioStream = true;

Recording.loadRecording(RECORDING_URL, function(success) {
    if (success) {
        Script.update.connect(update);
    } else {
        print("Failed to load recording from " + RECORDING_URL);
    }
});

var CHANCE_OF_SOUND = 0.0;

var sounds = [];
loadSounds();

function loadSounds() {
  var sound_filenames = ["AB1.wav", "Anchorman2.wav", "B1.wav", "B1.wav", "Bale1.wav", "Bandcamp.wav",
    "Big1.wav", "Big2.wav", "Brian1.wav", "Buster1.wav", "CES1.wav", "CES2.wav", "CES3.wav", "CES4.wav",
    "Carrie1.wav", "Carrie3.wav", "Charlotte1.wav", "EN1.wav", "EN2.wav", "EN3.wav", "Eugene1.wav", "Francesco1.wav",
    "Italian1.wav", "Japanese1.wav", "Leigh1.wav", "Lucille1.wav", "Lucille2.wav", "MeanGirls.wav", "Murray2.wav",
    "Nigel1.wav", "PennyLane.wav", "Pitt1.wav", "Ricardo.wav", "SN.wav", "Sake1.wav", "Samantha1.wav", "Samantha2.wav",
    "Spicoli1.wav", "Supernatural.wav", "Swearengen1.wav", "TheDude.wav", "Tony.wav", "Triumph1.wav", "Uma1.wav",
    "Walken1.wav", "Walken2.wav", "Z1.wav", "Z2.wav"
  ];

  var SOUND_BASE_URL = "https://s3.amazonaws.com/hifi-public/sounds/cocktail-party/";

  for (var i = 0; i < sound_filenames.length; i++) {
      sounds.push(SoundCache.getSound(SOUND_BASE_URL + sound_filenames[i]));
  }
}

//  Play a random sound from a list of conversational audio clips
function playRandomSound() {
  if (!Agent.isPlayingAvatarSound) {
    var whichSound = Math.floor((Math.random() * sounds.length) % sounds.length);
    Agent.playAvatarSound(sounds[whichSound]);
  }
}

var entityJSON = {
    "properties": {
      "acceleration": { "x": 0, "y": 0, "z": 0 },
      "actionData": "",
      "age": 8,
      "ageAsText": "0 hours 0 minutes 8 seconds",
      "angularDamping": 0.39,
      "angularVelocity": { "x": 0, "y": 0, "z": 0 },
      "animation": {
        "allowTranslation": true,
        "currentFrame": 0,
        "firstFrame": 0,
        "fps": 30,
        "hold": false,
        "lastFrame": 100000,
        "loop": true,
        "running": false,
        "url": ""
      },
      "boundingBox": {
        "brn": { "x": -0.1, "y": 0.9, "z": -1.1},
        "center": { "x": 0, "y": 1, "z": -1 },
        "dimensions": { "x": 0.2, "y": 0.2, "z": 0.2},
        "tfl": { "x": 0.1, "y": 1.1, "z": -0.9}
      },
      "canCastShadow": true,
      "certificateID": "",
      "clientOnly": true,
      "cloneAvatarEntity": false,
      "cloneDynamic": false,
      "cloneLifetime": 300,
      "cloneLimit": 0,
      "cloneOriginID": "{00000000-0000-0000-0000-000000000000}",
      "cloneable": false,
      "collidesWith": "static,dynamic,kinematic,myAvatar,otherAvatar,",
      "collisionMask": 31,
      "collisionSoundURL": "",
      "collisionless": false,
      "collisionsWillMove": false,
      "compoundShapeURL": "",
      "created": "2018-07-26T21:58:48Z",
      "damping": 0.39,
      "density": 1000,
      "description": "",
      "dimensions": { "x": 0.2, "y": 0.2, "z": 0.2 },
      "dynamic": false,
      "editionNumber": 0,
      "entityInstanceNumber": 0,
      "friction": 0.5,
      "gravity": { "x": 0, "y": 0, "z": 0 },
      "href": "",
      "id": "{05162d5d-5e65-4837-ad50-57041c8be427}",
      "ignoreForCollisions": false,
      "itemArtist": "",
      "itemCategories": "",
      "itemDescription": "",
      "itemLicense": "",
      "itemName": "",
      "lifetime": 3600,
      "limitedRun": 4294967295,
      "localPosition": { "x": 0, "y": 1, "z": -1 },
      "localRotation": { "w": 1, "x": 0, "y": 0, "z": 0 },
      "locked": false,
      "marketplaceID": "",
      "modelURL": "http://www.capondesign.com/EXternal/models/ironman/TonyV2.fst",
      "name": "FloofEntity",
      "naturalDimensions": { "x": 1.94, "y": 1.812, "z": 0.375 },
      "naturalPosition": { "x": 0, "y": 0.9, "z": 0.02 },
      "originalTextures": "{\n    \"Tony_Stark_Beard_Diffuse\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Beard_Diffuse.png\",\n    \"Tony_Stark_Beard_Gloss\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Beard_Gloss.png\",\n    \"Tony_Stark_Beard_Normal\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Beard_Normal.png\",\n    \"Tony_Stark_Beard_Specular\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Beard_Specular.png\",\n    \"Tony_Stark_Body_Diffuse\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Body_Diffuse.png\",\n    \"Tony_Stark_Body_Gloss\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Body_Gloss.png\",\n    \"Tony_Stark_Body_Normal\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Body_Normal.png\",\n    \"Tony_Stark_Body_Specular\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Body_Specular.png\",\n    \"Tony_Stark_Bottom_Diffuse\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Bottom_Diffuse.png\",\n    \"Tony_Stark_Bottom_Gloss\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Bottom_Gloss.png\",\n    \"Tony_Stark_Bottom_Normal\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Bottom_Normal.png\",\n    \"Tony_Stark_Bottom_Specular\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Bottom_Specular.png\",\n    \"Tony_Stark_Eyewear_Diffuse\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Eyewear_Diffuse.png\",\n    \"Tony_Stark_Eyewear_Gloss\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Eyewear_Gloss.png\",\n    \"Tony_Stark_Eyewear_Normal\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Eyewear_Normal.png\",\n    \"Tony_Stark_Eyewear_Specular\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Eyewear_Specular.png\",\n    \"Tony_Stark_Hair_Diffuse\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Hair_Diffuse.png\",\n    \"Tony_Stark_Hair_Gloss\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Hair_Gloss.png\",\n    \"Tony_Stark_Hair_Normal\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Hair_Normal.png\",\n    \"Tony_Stark_Hair_Specular\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Hair_Specular.png\",\n    \"Tony_Stark_Moustache_Diffuse\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Moustache_Diffuse.png\",\n    \"Tony_Stark_Moustache_Gloss\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Moustache_Gloss.png\",\n    \"Tony_Stark_Moustache_Normal\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Moustache_Normal.png\",\n    \"Tony_Stark_Moustache_Specular\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Moustache_Specular.png\",\n    \"Tony_Stark_Shoes_Diffuse\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Shoes_Diffuse.png\",\n    \"Tony_Stark_Shoes_Gloss\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Shoes_Gloss.png\",\n    \"Tony_Stark_Shoes_Normal\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Shoes_Normal.png\",\n    \"Tony_Stark_Shoes_Specular\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Shoes_Specular.png\",\n    \"Tony_Stark_Top_Diffuse\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Top_Diffuse.png\",\n    \"Tony_Stark_Top_Gloss\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Top_Gloss.png\",\n    \"Tony_Stark_Top_Normal\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Top_Normal.png\",\n    \"Tony_Stark_Top_Specular\": \"http://www.capondesign.com/EXternal/models/ironman/TonyV2/textures/Tony_Stark_Top_Specular.png\"\n}\n",
      "owningAvatarID": "{b5229825-2c0b-4ef5-bcfc-913858ebe7b3}",
      "parentID": "{b5229825-2c0b-4ef5-bcfc-913858ebe7b3}",
      "parentJointIndex": 65535,
      "position": { "x": 0, "y": 1, "z": -1 },
      "queryAACube": { "scale": 1.04, "x": 8.59, "y": 0.94, "z": -29.11 },
      "registrationPoint": { "x": 0.5, "y": 0.5, "z": 0.5 },
      "relayParentJoints": true,
      "renderInfo": {
        "drawCalls": 9,
        "hasTransparent": false,
        "texturesCount": 27,
        "texturesSize": 27525120,
        "verticesCount": 25745
      },
      "restitution": 0.5,
      "rotation": { "w": 1, "x": 0, "y": 0, "z": 0 },
      "script": "",
      "scriptTimestamp": 0,
      "serverScripts": "",
      "shapeType": "none",
      "staticCertificateVersion": 0,
      "textures": "",
      "type": "Model",
      "userData": "",
      "velocity": { "x": 0, "y": 0, "z": 0 },
      "visible": true
    }
  };

var count = 0;
var playCount = 300;
function update(event) {
    count++;
    if (count < playCount) {
        return;
    }
    if (count == playCount) {
        Recording.setPlayFromCurrentLocation(true);
        Recording.setPlayerLoop(true);
        Recording.startPlaying();
        Vec3.print("Playing from ", Avatar.position);
    }

    if (0 == (count % 2)) {
        // send a bogus change to an imaginary AvatarEntity
        entityJSON["name"] = randFloat(LOCATION_PARAMS.min_x, LOCATION_PARAMS.max_x);
        Avatar.setAvatarEntityData({ "ff898dea-cb9a-4952-9639-3cb7dfe884df" : entityJSON });
    }

    EntityViewer.setPosition(Avatar.position);
    EntityViewer.setOrientation(Avatar.orientation);
    EntityViewer.queryOctree();

    if (Math.random() < CHANCE_OF_SOUND) {
        playRandomSound();
    }

    if (!Recording.isPlaying()) {
        Script.update.disconnect(update);
    }

    // Avatar.displayName = "Bot_RAND" + randFloat(LOCATION_PARAMS.min_x, LOCATION_PARAMS.max_x);
}
