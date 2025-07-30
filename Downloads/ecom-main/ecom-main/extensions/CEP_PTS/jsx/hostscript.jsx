// Host script for Adobe applications
function getApplicationInfo() {
    var app = app.name;
    var version = app.version;
    return {
        name: app,
        version: version
    };
}

function getAction() {
    try {
        var actionSet = app.activeDocument.activeLayer.name;
        return actionSet;
    } catch(e) {
        return "Error: " + e.toString();
    }
}

// Export functions to be used by the extension
$.global.ptsExtension = {
    getApplicationInfo: getApplicationInfo
}; 