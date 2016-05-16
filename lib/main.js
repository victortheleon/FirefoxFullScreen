var prefs = require('sdk/simple-prefs');
var { setInterval, clearInterval } = require("sdk/timers");
var { Hotkey } = require("sdk/hotkeys");
var {Cu} = require("chrome");
const { CustomizableUI } = Cu.import('resource:///modules/CustomizableUI.jsm', {});
const { getMostRecentBrowserWindow } = require('sdk/window/utils');
var repeatInterval = 60;
var intervalId = setInterval(function () {
  if(!getMostRecentBrowserWindow().fullScreen)
    getMostRecentBrowserWindow().BrowserFullScreen();
  CustomizableUI.setToolbarVisibility("nav-bar", false);
}, repeatInterval * 1000);

function onPrefChange(prefName) {
    repeatInterval = prefs.prefs['repeatInterval'];
    if (repeatInterval >= 30) {
        clearInterval(intervalId);
        intervalId = setInterval(function () {
          if(!getMostRecentBrowserWindow().fullScreen)
            getMostRecentBrowserWindow().BrowserFullScreen();
            CustomizableUI.setToolbarVisibility("nav-bar", false);
        }, repeatInterval * 1000);
    }
}
require("sdk/simple-prefs").on("somePreference", onPrefChange);
require("sdk/simple-prefs").on("someOtherPreference", onPrefChange);

// `""` listens to all changes in the extension's branch
require("sdk/simple-prefs").on("", onPrefChange);

var showHotKey = Hotkey({
  combo: "alt-shift-s",
  onPress: function() {
    CustomizableUI.setToolbarVisibility("nav-bar", true);
  }
});
