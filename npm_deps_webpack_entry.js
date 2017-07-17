window.npm = {}
window.React = require("react");
window.ReactDOM = require("react-dom");
window.npm.moment = require("moment");
import BigCalendar from "react-big-calendar";
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(npm.moment)
);
window.npm.BigCalendar = BigCalendar;
window.npm.Tooltip = require("react-portal-tooltip");
window.npm.ReactPaginate = require("react-paginate");
