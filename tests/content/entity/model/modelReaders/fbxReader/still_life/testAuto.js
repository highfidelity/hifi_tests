if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = 'https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js';
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath('.'));

autoTester.enableAuto();

Script.include('./test.js?raw=true');
