window.moment = require("moment-timezone");
var BigCalendar = require("react-big-calendar");
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);
window.BigCalendar = BigCalendar;
window.React = require("react");
window.ReactDOM = require("react-dom");
