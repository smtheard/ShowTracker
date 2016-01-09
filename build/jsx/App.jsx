var React = require('react');
var ReactDOM = require('react-dom');

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