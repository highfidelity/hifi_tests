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

var LOCATION_ORIGIN = {"x":-72.,"y":-21.,"z":74.};
var LOCATION = { x: LOCATION_ORIGIN.x + randFloat(LOCATION_PARAMS.min_x, LOCATION_PARAMS.max_x), y: LOCATION_ORIGIN.y + LOCATION_PARAMS.y, z: LOCATION_ORIGIN.z + randFloat(LOCATION_PARAMS.min_z, LOCATION_PARAMS.max_z) };

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

var CHANCE_OF_SOUND = 0.05;

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

count = 300; // Randomly wait some period of time before starting the recording
function update(event) {
    if (count > 0) {
        count--;
        return;
    }
    if (count == 0) {
        Recording.setPlayFromCurrentLocation(true);
        Recording.setPlayerLoop(true);
        Recording.startPlaying();
        Vec3.print("Playing from ", Avatar.position);
        count--;
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
