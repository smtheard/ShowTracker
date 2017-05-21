window.npm = {}
window.npm.moment = require("moment");
var BigCalendar = require("react-big-calendar");
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(npm.moment)
);
window.npm.BigCalendar = BigCalendar;
window.npm.Tooltip = require("react-portal-tooltip");
window.React = require("react");
window.ReactDOM = require("react-dom");
