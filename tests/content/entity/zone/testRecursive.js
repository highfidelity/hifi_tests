var autoTester = Script.require("../../../utils/autoTester.js" );
autoTester.enableRecursive();

Script.include("ambientLightInheritance/test.js?raw=true");
Script.include("create/test.js?raw=true");

autoTester.runRecursive();
