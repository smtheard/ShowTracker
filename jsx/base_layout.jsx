var BaseLayout = React.createClass({
  componentDidMount: function() {
    componentHandler.upgradeDom();
  },

  render: function() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" style={{alignItems: "center"}}>
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <a href="/" style={{textDecoration: "none", color: "white"}}><span className="mdl-layout-title">Overseer.TV</span></a>
            <div className="mdl-layout-spacer"></div>
            
            { this.props.current_user ? 
              <nav className="mdl-navigation">
                <a className="mdl-navigation__link" href={this.props.current_user.path}><i className="material-icons">&#xE853;</i></a>
                <button id="more-menu"
                        className="mdl-button mdl-js-button mdl-button--icon">
                  <i className="material-icons">&#xE5D4;</i>
                </button>
                <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                    htmlFor="more-menu">
                  <a href={"/settings"} className="mdl-menu__item">Settings</a>
                  <a href={"/logout"} className="mdl-menu__item">Logout</a>
                </ul>
              </nav>
              :
              <nav className="mdl-navigation">
                <a href={"/login"} style={{marginRight: '10px'}}className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
                  Login
                </a>
                <a href={"/register"} className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
                  Register
                </a>
              </nav>
            }
          </div>
        </header>
        <main style={{maxWidth: "1140px", padding: "24px"}}>
          {this.props.children}
        </main>
      </div>
    )
  }
})

bottlereact._register('BaseLayout', BaseLayout)
