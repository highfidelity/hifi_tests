// This is an automatically generated file, created by nitpick
PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);

if (typeof nitpick === 'undefined') var nitpick = createNitpick(Script.resolvePath("."));
if (typeof testsRootPath === 'undefined') var testsRootPath = nitpick.getTestsRootPath();

nitpick.enableRecursive();
nitpick.enableAuto();

Script.include(testsRootPath + "content/entity/model/renderLayer/testRecursive.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/testRecursive.js");
Script.include(testsRootPath + "content/entity/model/modelBaking/testRecursive.js");

nitpick.runRecursive();
