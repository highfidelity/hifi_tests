//
// Created by Bradley Austin Davis on 2016/12/12
// Copyright 2013-2016 High Fidelity, Inc.
//
// Distributed under the Apache License, Version 2.0.
// See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

TEST_ROOT = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/";
TEST_BINARY_ROOT = "https://hifi-public.s3.amazonaws.com/test_scene_data/" 
TEST_SCRIPTS_ROOT = TEST_ROOT + "scripts/"
TEST_SCENES_ROOT = TEST_ROOT + "scenes/"
TEST_SCENES = [ "welcome" ];
LOGGING_RULES =  
    "trace.*=false\n" +
    "trace.render.debug=true\n" +
    "trace.app.debug=true\n" +
    "";

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function formatDate(date) {
    date = date || new Date();
    return date.getFullYear() + pad(date.getMonth()+1, 2) + pad(date.getDate(), 2) + "_" + pad(date.getHours(), 2) + pad(date.getMinutes(), 2);
}

TestScript = function(properties) {
    properties = properties || {};
    this.dateString = formatDate();
    return this;
}

TestScript.prototype = {
    startLocationTest: function(url) {
        this.sceneTests = [];
        this.locationTests = [];
        this.testName = url;
        this.loader = function() {
            Window.location = url;
            return true;
        }
        this.executeTest();
    },

    startSceneTest: function(scene) {
        this.testName = scene;
        this.loader = function() {
            Test.setClientTree(false);
            Resources.overrideUrlPrefix("atp:/", TEST_BINARY_ROOT + scene + ".atp/");
            if (!Clipboard.importEntities(TEST_SCENES_ROOT + scene + ".json")) {
                return false;
            }
            var position = { x: 0, y: 0, z: 0 };
            var pastedEntityIDs = Clipboard.pasteEntities(position);
            for (var id in pastedEntityIDs) {
                print("QQQ ID imported " + id);
            }
            return true;
        }
        this.executeTest();
    },
    
    executeTest: function(durationSeconds) {
        print("QQQ executing test " + this.testName);
        var re = /[\/.:]/gi;
        this.traceFile = "traces/trace_" + this.testName.replace(re, '') + "_" + this.dateString + ".json.gz";
        print("QQQ trace file " + this.traceFile);
        durationSeconds = durationSeconds || 10;
        if (!this.loader || !this.loader()) {
            this.nextTest();
            return;
        } 
        Test.waitIdle();
        Test.startTracing(LOGGING_RULES);

        var that = this;
        Script.setTimeout(function() {
            print("QQQ ending test " + that.currentScene);
            that.endTest();
        }, duration * 1000);
    },
    
    endTest: function() {
        print("QQQ ending scene " + this.currentScene);
        Test.stopTracing(this.traceFile);
        this.nextTest();
    },
    
    nextTest: function() {
        print("QQQ next test");
        Test.quit();
    }
};

Resources.overrideUrlPrefix(TEST_ROOT, "file:///C:/Users/bdavis/Git/hifi_tests/");
testScript = new TestScript();
testScript.startLocationTest("dev-chris.highfidelity.io");

//Script.setTimeout(function() {
//    Test.quit();
//}, 4 * 1000);
