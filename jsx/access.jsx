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

  onSubmit: function(event) {
    event.preventDefault();
    $.ajax({
       type: 'POST',
       contentType: 'application/json',
       url: this.props.callback_route,
       data: JSON.stringify(this.state),
       success: data => {
          if(data.success)
            this.onSuccess(data);
          else
            this.onFailure(data);
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

  updateEmail: function(e) {
    this.setState({email: e.target.value});
  },

  render: function() {
    return (
      <div className="mdl-card mdl-shadow--6dp">
        <div className="mdl-card__title mdl-color--primary mdl-color-text--white">
          <h3 className="mdl-card__title-text">{this.props.title}</h3>
        </div>
        <div className="mdl-card__supporting-text">
          <form onSubmit={this.onSubmit}>
            <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="text" id="username" value={this.state.username} onChange={this.updateUsername} />
              <label className="mdl-textfield__label" htmlFor="username">Username</label>
            </div>

            {this.props.confirm ?
            <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="email" id="email" value={this.state.email} onChange={this.updateEmail} />
              <label className="mdl-textfield__label" htmlFor="email">Email</label>
            </div>
            : ""}

            <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="password" id="password" value={this.state.password} onChange={this.updatePassword} />
              <label className="mdl-textfield__label" htmlFor="password">Password</label>
            </div>

            {this.props.confirm ?
            <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="password" id="confirm-password" />
              <label className="mdl-textfield__label" htmlFor="confirm-password">Confirm Password</label>
            </div> : ""}

            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
})

bottlereact._register('Access', Access)
