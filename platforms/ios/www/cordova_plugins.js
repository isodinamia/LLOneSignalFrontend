cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "onesignal-cordova-plugin.OneSignal",
        "file": "plugins/onesignal-cordova-plugin/www/OneSignal.js",
        "pluginId": "onesignal-cordova-plugin",
        "clobbers": [
            "OneSignal"
        ]
    },
    {
        "id": "cordova-plugin-console.console",
        "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "console"
        ]
    },
    {
        "id": "cordova-plugin-console.logger",
        "file": "plugins/cordova-plugin-console/www/logger.js",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "cordova.logger"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.1",
    "onesignal-cordova-plugin": "2.0.10",
    "cordova-plugin-console": "1.0.5"
};
// BOTTOM OF METADATA
});