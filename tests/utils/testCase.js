var PROFILE_PROPERTIES = {
    tier: ["low", "mid", "high"],
    os: ["windows", "mac", "linux", "android"],
    gpu: ["amd", "nvidia", "intel"]
};

var PROPERTY_TO_PROFILE_CATEGORY = function(){
    var toReturn = {};
    
    var categories = Object.keys(PROFILE_PROPERTIES);
    for (var i = 0; i < categories.length; i++) {
        var category = categories[i];
        var properties = PROFILE_PROPERTIES[category];
        for (var j = 0; j < properties.length; j++) {
            var property = properties[j];
            toReturn[property] = category;
        }
    }
    
    return toReturn;
}();

function logAndNotify(message) {
    console.log(message);
    Window.displayAnnouncement(message);
}

RunFilter = function (allowedPerProperty, propertiesToDisplay) {
    this.allowedPerProperty = RunFilter.getAllowedPerPropertySorted(allowedPerProperty);
    this.propertiesToDisplay = propertiesToDisplay;
}

RunFilter.GLOBAL_BLACKLIST_PER_PROPERTY = {"os":[]};

// Sorts the allowed options to be in the order they appear in PROFILE_PROPERTIES
RunFilter.getAllowedPerPropertySorted = function(allowedPerProperty) {
    var allowedPerPropertySorted = {};
    var properties = Object.keys(allowedPerProperty);
    for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        var allowed = allowedPerProperty[property];
        
        var allowedSorted = [];
        var allValues = PROFILE_PROPERTIES[property];
        for (var j = 0; j < allValues.length; j++) {
            var value = allValues[j];
            if (allowed.indexOf(value) != -1) {
                allowedSorted.push(value);
            }
        }
        
        allowedPerPropertySorted[property] = allowedSorted;
    }
    return allowedPerPropertySorted;
}

RunFilter.parseWhitelistString = function(testCaseName, whitelistString) {
    var allowedPerProperty = {};
    var whitelistPerProperty = whitelistString.split(".");
    for (var j = 0; j < whitelistPerProperty.length; j++) {
        var propertyWhitelistString = whitelistPerProperty[j];
        if (propertyWhitelistString === "") {
            continue;
        }
        
        var whitelistedOptionsPerProperty = propertyWhitelistString.split(",");
        var validWhitelistedOptionsPerProperty = [];
        var profileCategory = undefined;
        var previousProfileCategory = undefined;
        // Check all properties. Complain if one is not correct.
        for (var k = 0; k < whitelistedOptionsPerProperty.length; k++) {
            var whitelistedPropertyOption = whitelistedOptionsPerProperty[k];
            if (whitelistedPropertyOption === "") {
                continue;
            }
            
            profileCategory = PROPERTY_TO_PROFILE_CATEGORY[whitelistedPropertyOption];
            if (profileCategory === undefined) {
                logAndNotify("Unrecognized test profile property '" + whitelistedPropertyOption + "' when creating test '" + testCaseName + "'");
                return RunFilter.GLOBAL_BLACKLIST_PER_PROPERTY;
            }
            if (previousProfileCategory !== undefined && profileCategory !== previousProfileCategory) {
                logAndNotify("Inconsistent test profile property options '" + whitelistedOptionsPerProperty[k-1] + "' and '" + whitelistedPropertyOption + "' when creating test '" + testCaseName + "'. The former is of type '" + previousProfileCategory + "' and the latter is of type '" + profileCategory + "'");
                return RunFilter.GLOBAL_BLACKLIST_PER_PROPERTY;
            }
            previousProfileCategory = profileCategory;
            validWhitelistedOptionsPerProperty.push(whitelistedPropertyOption);
        }
        // All properties are valid!
        if (profileCategory !== undefined) {
            allowedPerProperty[profileCategory] = validWhitelistedOptionsPerProperty;
        }
    }
    
    return allowedPerProperty;
}

RunFilter.parsePropertyDisplayString = function(testCaseName, allowedPerProperty, propertyDisplayString) {
    var propertiesToDisplay = [];
    
    if (propertyDisplayString !== "") {
        var knownProperties = Object.keys(PROFILE_PROPERTIES);
        propertiesToDisplay = propertyDisplayString.split(".");
        // Validate propertiesToDisplay
        // Check for invalid and empty properties
        // Enforce property ordering (tier.os.gpu is allowed; os.tier.gpu is not)
        var lastPropertyIndex = -1;
        for (var i = 0; i < propertiesToDisplay.length; i++) {
            var propertyToDisplay = propertiesToDisplay[i];
            var propertyIndex = knownProperties.indexOf(propertyToDisplay);
            if (propertyIndex == -1) {
                logAndNotify("Unrecognized test profile image label '" + propertyToDisplay + "' when creating test '" + testCaseName + "'");
                return [];
            } else if (propertyIndex === lastPropertyIndex) {
                logAndNotify("Wrong ordering of test profile image label: '" + knownProperties[propertyIndex] + "' appeared twice in a row");
            } else if (propertyIndex < lastPropertyIndex) {
                logAndNotify("Wrong ordering of test profile image label: '" + knownProperties[propertyIndex] + "' appeared after '" + knownProperties[lastPropertyIndex] + "'");
            }
            lastPropertyIndex = propertyIndex;
        }
    }
    
    return propertiesToDisplay;
}

// Returns undefined if there is an unrecognized property
RunFilter.createRunFilter = function(testCaseName, runFilterArgs) {
    // An empty whitelistString is allowed and acts as a global wildcard (allowedPerProperty is an empty object in that case)
    // This is useful when you want a test to always run, but still want image naming based on what profile properties matter to a test
    var whitelistString = runFilterArgs[0];
    var allowedPerProperty = RunFilter.parseWhitelistString(testCaseName, whitelistString);
    
    var propertiesToDisplay = [];
    if (runFilterArgs.length >= 2) {
        var propertyDisplayString = runFilterArgs[1];
        propertiesToDisplay = RunFilter.parsePropertyDisplayString(testCaseName, allowedPerProperty, propertyDisplayString);
    }
    
    return new RunFilter(allowedPerProperty, propertiesToDisplay);
}

RunFilter.prototype.matches = function(profile) {
    // This is a "lazy" profile whitelist. If a list of allowed values isn't defined for a given profile property, all values are assumed allowed for that property.
    var profileKeys = Object.keys(profile);
    for (var i = 0; i < profileKeys.length; i++) {
        var profilePropertyName = profileKeys[i];
        var profileValue = profile[profilePropertyName];
        var allowedValues = this.allowedPerProperty[profilePropertyName];
        if (allowedValues !== undefined) {
            var matched = false;
            for (var j = 0; j < allowedValues.length; j++) {
                if (allowedValues[j] === profileValue) {
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                return false;
            }
        }
    }
    return true;
}

RunFilter.prototype.getImageProfileDescriptor = function(profile) {
    var components = [];
    
    for (var i = 0; i < this.propertiesToDisplay.length; i++) {
        var propertyToDisplay = this.propertiesToDisplay[i];
        var allValues = PROFILE_PROPERTIES[propertyToDisplay];
        // Already sorted to match the order the property options appear in PROFILE_PROPERTIES
        var allowedValues = this.allowedPerProperty[propertyToDisplay];
        if (allowedValues !== undefined) {
            // Assume the profile matches this filter
            components.push(allowedValues.join("-"));
        } else {
            components.push(profile[propertyToDisplay]);
        }
    }
    
    return components.join("_");
}

TestCase = function (name, path, func, usePrimaryCamera, runFiltersRaw) {
    this.name = name;
    this.path = path;
    this.aborted = false;
    this.func = func;
    this.usePrimaryCamera = usePrimaryCamera;
    
    this.runFilters = [];
    if (runFiltersRaw !== undefined) {
        for (var i = 0; i < runFiltersRaw.length; i++) {
            var runFilterArgs = runFiltersRaw[i];
            var runFilter = RunFilter.createRunFilter(name, runFilterArgs);
            if (runFilter !== undefined) {
                this.runFilters.push(runFilter);
            }
        }
    }
}

TestCase.prototype.shouldRun = function(testProfile) {
    if (this.runFilters.length === 0) {
        return true;
    }
    
    for (var i = 0; i < this.runFilters.length; i++) {
        var runFilter = this.runFilters[i];
        if (runFilter.matches(testProfile)) {
            return true;
        }
    }
    return false;
}

TestCase.prototype.getImageProfileDescriptor = function(testProfile) {
    if (this.runFilters.length === 0) {
        return "";
    }
    
    for (var i = 0; i < this.runFilters.length; i++) {
        var runFilter = this.runFilters[i];
        if (runFilter.matches(testProfile)) {
            return runFilter.getImageProfileDescriptor(testProfile);
        }
    }
    return "";
}

module.exports = {
    TestCase: TestCase
};
