
var toaster = function(message, timeout, actionHandler, actionText) {
  var notification = document.querySelector('.mdl-js-snackbar');
  var data = {
    message: message,
    actionHandler: actionHandler,
    actionText: actionText,
    timeout: timeout || 2000
  };
  notification.MaterialSnackbar.showSnackbar(data);
}

var helpers = {"toaster": toaster};
