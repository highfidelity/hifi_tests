// This is an automatically generated file, created by nitpick
PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);

if (typeof nitpick === 'undefined') nitpick = createNitpick(Script.resolvePath("."));
if (typeof testsRootPath === 'undefined') testsRootPath = nitpick.getTestsRootPath();

nitpick.enableRecursive();
nitpick.enableAuto();

Script.include(testsRootPath + "content/entity/text/topMargin/test.js");
Script.include(testsRootPath + "content/entity/text/textColor/test.js");
Script.include(testsRootPath + "content/entity/text/textAlpha/test.js");
Script.include(testsRootPath + "content/entity/text/rightMargin/test.js");
Script.include(testsRootPath + "content/entity/text/lineHeight/test.js");
Script.include(testsRootPath + "content/entity/text/leftMargin/test.js");
Script.include(testsRootPath + "content/entity/text/bottomMargin/test.js");
Script.include(testsRootPath + "content/entity/text/billboardMode/test.js");
Script.include(testsRootPath + "content/entity/text/backgroundColor/test.js");
Script.include(testsRootPath + "content/entity/text/backgroundAlpha/test.js");

nitpick.runRecursive();
