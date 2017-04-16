
var Access = React.createClass({
  getInitialState: function() {
    return {username: '', password: ''};
  },

  onSuccess: function(data){
    window.location = this.props.next || '/'
  },

  onFailure: function(data){
    helpers.toaster(data.error_message || "Something went wrong.");
  },

  onSubmit: function() {
    var that = this;
    $.ajax({
       type: 'POST',
       contentType: 'application/json',
       url: this.props.callback_route,
       data: JSON.stringify(this.state),
       success: function(data) {
          if(data.success)
            that.onSuccess(data);
          else
            that.onFailure(data);
        },
       error: this.onFailure
    });
  },

  updateUsername: function(e) {
    this.setState({username: e.target.value});
  },

  updatePassword: function(e) {
    this.setState({password: e.target.value});
  },

  render: function() {
    return (
      <div className="mdl-card mdl-shadow--6dp">
        <div className="mdl-card__title mdl-color--primary mdl-color-text--white">
          <h3 className="mdl-card__title-text">{this.props.title}</h3>
        </div>
        <div className="mdl-card__supporting-text">
          <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="text" id="username" value={this.state.username} onChange={this.updateUsername} />
              <label className="mdl-textfield__label" for="username">Username</label>
          </div>

          <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="password" id="password" value={this.state.password} onChange={this.updatePassword} />
              <label className="mdl-textfield__label" for="password">Password</label>
          </div>

          {this.props.confirm ?
          <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="password" id="confirm-password" />
              <label className="mdl-textfield__label" for="confirm-password">Confirm Password</label>
          </div> : ""}
          

          <button onClick={this.onSubmit} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Submit
          </button>
        </div>
      </div>
    );
  }
})

bottlereact._register('Access', Access)
