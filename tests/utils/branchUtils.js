// Find the GitHub branch we are running from
getBranch = function (path, repository) {
    // The branch is the word after the repository name, and before the word "tests"
    // Assumes that the branch exists in the path
    var words = path.split("/");
    for (var i = 0; i < words.length - 2; ++i) {
        if (words[i] === repository && words[i + 2] === "tests") {
            return words[i + 1];
        }
    }
    
    return "branch not found";
}