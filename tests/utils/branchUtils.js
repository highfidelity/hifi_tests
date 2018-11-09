// Locate the "repository" folder ,returns the path up to, but not including, "tests"
// Note that the result includes the final '/'
getRepositoryPath = function (executionPath) {
    var words = executionPath.split("/");

    var repositoryPath = "";
    for (var i = 0; i < words.length; ++i) {
        if (words[i] === "tests") {
            break;
        }
        repositoryPath += words[i] + "/";
    }

    return repositoryPath;
}

// Returns the `nitpick.js` version on the branch we are executing from
createNitpick = function (executionPath) {
    // Default values
    var user = "NissimHadar";;
    var branch = "MAC";
    
    // The format of the execution path is either as follows (assuming the test is in the "tests' folder hierarchy)
    //      "https://raw.githubusercontent.com/<user>/<repository>/<branch>/tests/..."
    // or
    //      "https://github.com/<user>/blob/<repository>/<branch>/tests/..."
    //
    // If the first word is not "https" then the script is probably running from a local file
    var words = executionPath.split("/");

    var rawExecutionPath = executionPath;
    if (words[0] === "https:") {
        // The execution path is first converted into the first format, as this is needed down the line
        if (words[2] !== "raw.githubusercontent.com") {
            rawExecutionPath = rawExecutionPath.replace("github.com", "raw.githubusercontent.com");
            rawExecutionPath = rawExecutionPath.replace("/blob/", "/");
        }
            
        // Note that words[1] is null
        user = words[3];
        
        // The second format has the 'blob' token
        if (words[2] === "raw.githubusercontent.com") {
            branch = words[5];
        } else {
            branch = words[6];
        }
    }

    var repositoryPath = getRepositoryPath(rawExecutionPath);

    var nitpick =  Script.require(repositoryPath + "tests/utils/nitpick.js");
    nitpick.setRepositoryInfo(repositoryPath);

    return nitpick;
}
