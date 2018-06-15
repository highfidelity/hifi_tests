if (typeof user === 'undefined') user = "highfidelity/";
if (typeof repository === 'undefined') repository = "hifi_tests/";

Script.include("https://github.com/highfidelity/hifi_tests/blob/RC69/tests/utils/branchUtils.js?raw=true");
if (typeof branch === 'undefined') branch = getBranch(Script.resolvePath("."), repository) +"/";

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.enableAuto(10000);

Script.include("./test.js?raw=true");
