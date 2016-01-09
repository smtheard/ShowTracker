var React = require('react');
var ReactDOM = require('react-dom');
var Login = require('./Login.jsx');
var Register = require('./Register.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div className="app_container">
          <h2 className="form-signin-heading">Show Tracker</h2>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));