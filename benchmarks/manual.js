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

Script.include("./BenchmarkLib.js");
Resources.overrideUrlPrefix(TEST_ROOT, Script.resolvePath(".."));

var TRACE_TOOLBAR = "com.highfidelity.interface.toolbar.trace";
var TRACE_ICON = Script.resolvePath("../assets/traceButton.png"); 
var TRACE_NAME = "trace-{DATE}_{TIME}";
var TRACE_DURATION = 20;

var traceActive = false;
var button = Toolbars.getToolbar(TRACE_TOOLBAR).addButton({
    objectName: "toggleTrace",
    imageURL: TRACE_ICON,
    alpha: 0.9,
    visible: true
});

function stopTrace() {
    if (!traceActive) {
        return;
    }
    traceActive = false;
    button.writeProperty("buttonState", 0);
    // Test.stopTracing(TRACE_NAME);
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
    button.writeProperty("buttonState", 1);
    print("QQQ starting trace " + TRACE_NAME + " for " + TRACE_DURATION + " seconds");
    Test.startTracing(DEFAULT_TRACING_RULES);
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

button.clicked.connect(function () {
    Script.setTimeout(traceToggle, 100);
});

print("QQQ trace script! done init");
