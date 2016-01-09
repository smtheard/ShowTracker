$(function() {
  Parse.$ = jQuery;

  Parse.initialize("Bg2HInypTLQMpQBzIddYiS7nX8JJVoev8YAoRXwY", "bRYmjfD3hpFJTpvB5YiZroU6VSqZJufyZu19ZI6r");
  $('.form-login').on('submit', function(e) {
    e.preventDefault();
 
    var data     = $(this).serializeArray();
    var username = data[0].value;
    var password = data[1].value;
 
    Parse.User.logIn(username, password, {
        success: function(user) {
          //render app
        },
        error: function(user, error) {
            console.log(error);
        }
    });
  });
});