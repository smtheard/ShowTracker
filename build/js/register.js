$(function() {
  Parse.$ = jQuery;

  Parse.initialize("Bg2HInypTLQMpQBzIddYiS7nX8JJVoev8YAoRXwY", "bRYmjfD3hpFJTpvB5YiZroU6VSqZJufyZu19ZI6r");
  $('.form-register').on('submit', function(e) {
    e.preventDefault();
 
    var data     = $(this).serializeArray();
    var username = data[0].value;
    var email    = data[1].value;
    var password = data[2].value;

    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    user.signUp(null, {
      success: function(user) {
      // render app component
        var app = React.createElement(App);
        ReactDOM.render(app, document.getElementById('app'));

      },
      error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
      }
    });
  });
});