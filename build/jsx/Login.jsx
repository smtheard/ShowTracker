var React = require('react');
var ReactDOM = require('react-dom');

var Login = React.createClass({
  updateUsername: function(e) {
    this.setState({username: e.target.value});
  },
  updatePassword: function(e) {
    this.setState({password: e.target.value});
  },

  submitLogin: function(e) {
    e.preventDefault();
    Parse.$ = jQuery;
    Parse.initialize("Bg2HInypTLQMpQBzIddYiS7nX8JJVoev8YAoRXwY", "bRYmjfD3hpFJTpvB5YiZroU6VSqZJufyZu19ZI6r");
    var username = this.state.username;
    var password = this.state.password;
 
    Parse.User.logIn(username, password, {
        success: function(user) {
          // TODO: render app
        },
        error: function(user, error) {
            console.log(error);
        }
    });

  },
  renderRegister: function(e) {
    // TODO: render register
  },

  render: function() {
    return (
      <div className="login-container">
        <form className="form-login" role="form">
            <h2 className="form-login-heading">Please Login</h2>
            <input type="text" name="username" onChange={this.updateUsername} className="form-control" placeholder="Username" required="" autofocus=""/>
            <input type="password" name="password" onChange={this.updatePassword} className="form-control" placeholder="Password" required=""/>
            <div className="checkbox">
                <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.submitLogin}>Login</button>
        </form>
        <a className="btn btn-lg btn-primary btn-block" onClick={this.renderRegister}>Register</a>
      </div>
    );
  }
});

module.exports = Login;
