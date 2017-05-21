var BaseLayout = React.createClass({
  render: function() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" style={{alignItems: "center"}}>
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <a href="/" style={{textDecoration: "none", color: "white"}}><span className="mdl-layout-title">Slothy</span></a>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation mdl-layout--large-screen-only">
            { this.props.current_user ? 
              <a className="mdl-navigation__link" href={this.props.current_user.path}><i className="material-icons">&#xE853;</i></a>
              :
              <span/>
            }
            </nav>
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
