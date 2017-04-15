var BaseLayout = React.createClass({
  render: function() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" style={{alignItems: "center"}}>
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Slothy</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation mdl-layout--large-screen-only">
              <a className="mdl-navigation__link" href=""><i className="material-icons">&#xE8B8;</i></a>
              <a className="mdl-navigation__link" href=""><i className="material-icons">&#xE853;</i></a>
            </nav>
          </div>
        </header>
        <main className="mdl-layout__content" style={{"padding": "24px", "flex": "none"}}>
          <div className="page-content">{this.props.children}</div>
        </main>
      </div>
    )
  }
})

bottlereact._register('BaseLayout', BaseLayout)
