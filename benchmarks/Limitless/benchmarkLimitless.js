//
// Created by Nissim Hadar on 2018/4/24
// Copyright 2013-2016 High Fidelity, Inc.
//
// Distributed under the Apache License, Version 2.0.
// See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

'use strict';

Script.include("./BenchmarkLib.js");
Resources.overrideUrlPrefix(TEST_ROOT, Script.resolvePath(".."));

var AVATAR_TRACING_RULES = "" + 
    "trace.*=true\n" +
    "*.detail=true\n" +
    "";

var testScript = new TestScript();

var testStart = { 
    clearCaches: true,
    url: "hifi://Limitless.highfidelity.io/-11.3,-10.1,-10.1/0,1.0,0.0,0.0" 
};

testScript.addTest({
    name: "benchmarkLimited",
    
    loader: TestScript.locationLoader(testStart),
    
    tracingRules: AVATAR_TRACING_RULES,
    
    traceActions: TestScript.locationSteps([
        { dt: 6, pos: { x: -2.8, y: -10.2, z: -14.5 }, ori: { yaw: -94.8 }},
        { dt: 6, pos: { x: -23.8, y: -10.1, z: -20.4 }, ori: { yaw: 104.6 }},
        { dt: 6, pos: { x: -11.9, y: -10.1, z: -25.7 }, ori: { yaw: 12.5 }},
        { dt: 6, pos: { x: -37.4, y: -10.1, z: -3.6 }, ori: { yaw: 82.8 }},
        { dt: 6, pos: { x: -42.9, y: -10.1, z: -2.3 }, ori: { yaw: -86.6 }},
        { dt: 6, pos: { x: -37.3, y: -10.1, z: 17.8 }, ori: { yaw: -96.9 }}        
   ]),
    duration: 36
});

testScript.runTests();
