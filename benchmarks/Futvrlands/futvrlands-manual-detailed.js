//
// Created by Bradley Austin Davis on 2016/12/12
// Copyright 2013-2016 High Fidelity, Inc.
//
// Distributed under the Apache License, Version 2.0.
// See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//
/*global print, Resources, Test, MyAvatar, Entities, AnimationCache, SoundCache, Scene, Camera, Overlays, Audio, HMD, AvatarList, AvatarManager, Controller, UndoStack, Window, Account, GlobalServices, Script, ScriptDiscoveryService, LODManager, Menu, Vec3, Quat, AudioDevice, Paths, Clipboard, Settings, XMLHttpRequest, randFloat, randInt */
/*global ColorIndicator */

'use strict';

Script.include("../BenchmarkLib.js");
Resources.overrideUrlPrefix(TEST_ROOT, Script.resolvePath(".."));

SPOT500_TRACING_RULES = "" +
    "trace.*=true\n" +
    "*.detail=true\n" +
    "";

var TRACE_TOOLBAR = "com.highfidelity.interface.toolbar.trace";
var TRACE_ICON = Script.resolvePath("../assets/traceButton.png"); 
var TRACE_NAME = "trace-{DATE}_{TIME}";
var TRACE_DURATION = 20;

var traceActive = false;
var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var button = tablet.addButton({
    icon: TRACE_ICON,
    activeIcon: TRACE_ICON,
    text: "toggleTrace",
    sortOrder: 1
});

function stopTrace() {
    if (!traceActive) {
        return;
    }
    traceActive = false;
    button.editProperties({isActive: traceActive});
    Test.stopTracing("traces/" + TRACE_NAME + ".json.gz");
}

function startTrace() {
    if (traceActive) {
        return;
    }
    var newTraceName = Window.prompt("Name of trace file", TRACE_NAME);
    if (!newTraceName) {
        return;
    }
    TRACE_NAME = newTraceName;

    var newTraceDuration = Window.prompt("Trace duration in seconds (0 for manual shutdown)", TRACE_DURATION);
    if (newTraceDuration == "") {
        return;
    }
    newTraceDuration = Number(newTraceDuration);
    if (isNaN(newTraceDuration)) {
        return;
    }
    
    if (newTraceDuration > 60) {
        Window.alert("Max trace time is 60 seconds");
        return;
    }

    TRACE_DURATION = newTraceDuration; 
    traceActive = true;
    button.editProperties({isActive: traceActive});
    print("QQQ starting trace " + TRACE_NAME + " for " + TRACE_DURATION + " seconds");
    Test.startTracing(SPOT500_TRACING_RULES);
    if (TRACE_DURATION > 0) {
        Script.setTimeout(function(){
            stopTrace();
        }, TRACE_DURATION * 1000);
    }
}

function traceToggle() {
    if (traceActive) {
        stopTrace();
    } else {
        startTrace();
    }
}

function onClicked() {
    traceToggle();
}

button.clicked.connect(onClicked);


print("QQQ trace script! done init");

TestScript.locationLoader("engine-dev.highfidelity.io",
							true,
							{ x: -19, y: -10, z: 7 },
							{ "x":0,"y":0.9652830362319946,"z":0,"w":-0.2612062096595764 })()