
var Login = React.createClass({
  onSubmit: function() {
    alert('onSubmit triggered');
  },

  render: function() {
    return (
      <div className="mdl-grid">
        <div className="mdl-layout-spacer"></div>
        <div className="mdl-cell mdl-cell--4-col">
          <form onSubmit={this.onSubmit}>
            <div className="mdl-textfield mdl-js-textfield mdl-cell-12-col">
                <input className="mdl-textfield__input" type="text" id="username" />
                <label className="mdl-textfield__label" for="username">Username</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-cell-12-col">
                <input className="mdl-textfield__input" type="password" id="password" />
                <label className="mdl-textfield__label" for="password">Password</label>
            </div>
            <input type="submit" value="Submit"/>
          </form>
        </div>
        <div className="mdl-layout-spacer"></div>
      </div>
    );
  }
})

bottlereact._register('Login', Login)