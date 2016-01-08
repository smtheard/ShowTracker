var React = require('react');
var ReactDOM = require('react-dom');

var Login = React.createClass({
  render: function() {
    return (
      <div className="container">
      <form className="form-signin" role="form">
          <h2 className="form-signin-heading">Please sign in</h2>
          <input type="text" name="username" className="form-control" placeholder="Username" required="" autofocus=""/>
          <input type="password" name="password" className="form-control" placeholder="Password" required=""/>
          <div className="checkbox">
              <label>
                  <input type="checkbox" value="remember-me"/> Remember me
              </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
      <a className="btn btn-lg btn-primary btn-block" href="register.html">Register</a>
      </div>
    );
  }
});

ReactDOM.render(<Login />, document.getElementById('login'));