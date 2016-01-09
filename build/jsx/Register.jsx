var React = require('react');
var ReactDOM = require('react-dom');

var Register = React.createClass({
  render: function() {
    return (
      <div className="register_container">
        <form className="form-register" role="form">
            <h2 className="form-register-heading">Register</h2>
            <input type="text" name="username" className="form-control" placeholder="Username" required="" autofocus=""/>
            <input type="text" name="email" className="form-control" placeholder="Email" required="" autofocus=""/>
            <input type="password" name="password" className="form-control" placeholder="Password" required=""/>
            <div>
              <button className="btn btn-lg btn-primary btn-block" type="submit">submit</button>
            </div>
        </form>
      </div>
    );
  }
});

ReactDOM.render(<Register />, document.getElementById('register'));