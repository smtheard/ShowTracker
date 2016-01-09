var React = require('react');
var ReactDOM = require('react-dom');

var Register = React.createClass({
  updateUsername: function(e) {
    this.setState({username: e.target.value});
  },
  updateEmail: function(e) {
    this.setState({email: e.target.value});
  },
  updatePassword: function(e) {
    this.setState({password: e.target.value});
  },

  submitRegister: function(e) {
    e.preventDefault();
    Parse.$ = jQuery;
    Parse.initialize("Bg2HInypTLQMpQBzIddYiS7nX8JJVoev8YAoRXwY", "bRYmjfD3hpFJTpvB5YiZroU6VSqZJufyZu19ZI6r");
    var user = new Parse.User();
    user.set("username", this.state.username);
    user.set("password", this.state.password);
    user.set("email", this.state.email);
    user.signUp(null, {
      success: function(user) {
        // render app component
        alert('successfully created account');
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  },

  render: function() {
    return (
      <div className="register_container">
        <form className="form-register" role="form">
            <h2 className="form-register-heading">Register</h2>
            <input type="text" name="username" onChange={this.updateUsername} className="form-control" placeholder="Username" required="" autofocus=""/>
            <input type="text" name="email" onChange={this.updateEmail} className="form-control" placeholder="Email" required="" autofocus=""/>
            <input type="password" name="password" onChange={this.updatePassword} className="form-control" placeholder="Password" required=""/>
            <div>
              <button onClick={this.submitRegister} className="btn btn-lg btn-primary btn-block" type="submit">submit</button>
            </div>
        </form>
      </div>
    );
  }
});

ReactDOM.render(<Register />, document.getElementById('register'));