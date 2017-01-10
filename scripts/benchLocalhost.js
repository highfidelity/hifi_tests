//
// Created by Sam Gateau on 2017/01/9
// Copyright 2013-2017 High Fidelity, Inc.
//
// Distributed under the Apache License, Version 2.0.
// See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//



Window.location = "localhost"

 Script.setTimeout(function() {
    MyAvatar.orientation = { x: 0, y: -0.793851, z: 0, w: 0.608112 };
     
 }, 5 * 1000);

Script.setTimeout(function() {
       
     var loggingRules = "" +
        "trace.*=false\n" +
        "trace.render=false\n" +
        "trace.render.gpu*=true\n" +
        "trace.app.debug=false\n" +
        "trace.simulation.*=true\n" +
        "";
    Test.startTracing(loggingRules);
}, 10 * 1000);


Script.setTimeout(function() {
    Test.stopTracing("traces/testScriptTrace_{DATE}_{TIME}.json.gz");
    Test.quit();
}, 20 * 1000);


