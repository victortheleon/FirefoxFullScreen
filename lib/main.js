var prefs = require('sdk/simple-prefs');
var { setInterval, clearInterval } = require("sdk/timers");
const { getMostRecentBrowserWindow } = require('sdk/window/utils');
var repeatInterval = 60;
var intervalId = setInterval(function () {
  if(!getMostRecentBrowserWindow().fullScreen)
    getMostRecentBrowserWindow().BrowserFullScreen();
}, repeatInterval * 1000);

function onPrefChange(prefName) {
    repeatInterval = prefs.prefs['repeatInterval'];
    if (repeatInterval >= 30) {
        clearInterval(intervalId);
        intervalId = setInterval(function () {
          if(!getMostRecentBrowserWindow().fullScreen)
            getMostRecentBrowserWindow().BrowserFullScreen();
        }, repeatInterval * 1000);
    }
}
require("sdk/simple-prefs").on("somePreference", onPrefChange);
require("sdk/simple-prefs").on("someOtherPreference", onPrefChange);

// `""` listens to all changes in the extension's branch
require("sdk/simple-prefs").on("", onPrefChange);
