var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./App.jsx');
var Login = require('./Login.jsx');
var Register = require('./Register.jsx');

var Logic = React.createClass({
  render: function() { return (<div></div>)}
});

ReactDOM.render(<Login />, document.getElementById('login'));
ReactDOM.render(<Register />, document.getElementById('register'));
ReactDOM.render(<App />, document.getElementById('app'));