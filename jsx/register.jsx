
var Register = React.createClass({
  getInitialState: function() {
    return {username: '', password: ''};
  },

  onSubmit: function() {
    $.ajax({
       type: 'POST',
       contentType: 'application/json',
       url: '/register',
       data: JSON.stringify(this.state),
    });
  },

  updateUsername: function(e) {
    this.setState({username: e.target.value});
  },

  updatePassword: function(e) {
    this.setState({password: e.target.value});
  },

  render: function() {
    console.log(this.state);
    return (
      <div className="mdl-grid">
        <div className="mdl-layout-spacer"></div>
        <div className="mdl-cell mdl-cell--4-col">
            <div className="mdl-textfield mdl-js-textfield mdl-cell-12-col">
                <input className="mdl-textfield__input" type="text" id="username" value={this.state.username} onChange={this.updateUsername} />
                <label className="mdl-textfield__label" for="username">Username</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-cell-12-col">
                <input className="mdl-textfield__input" type="password" id="password" value={this.state.password} onChange={this.updatePassword} />
                <label className="mdl-textfield__label" for="password">Password</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-cell-12-col">
                <input className="mdl-textfield__input" type="confirm-password" id="confirm-password" />
                <label className="mdl-textfield__label" for="confirm-password">Confirm Password</label>
            </div>
            <button onClick={this.onSubmit} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
              Submit
            </button>
        </div>
        <div className="mdl-layout-spacer"></div>
      </div>
    );
  }
})

bottlereact._register('Register', Register)
