// require show_card.jsx

var ShowPage = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col mdl-shadow--2dp"
               style={{height: "340px", display: "inline-block", margin: "5px"}}>
            <div className="mdl-card__title"
                 style={{ cursor: "pointer", position: "relative", padding: 0, color: "#fff", height: "176px", background: "url('" + this.props.image_src + "')" }}
                 onMouseOver={this.increaseOpacity}
                 onMouseLeave={this.decreaseOpacity}>
              <div 
                   style={{position: "absolute", background: "rgba(0, 0, 0, 0."+ this.state.opacity + ")", bottom: 0, padding: "10px"}}>
                <h2 className="mdl-card__title-text">{this.props.title}</h2>
              </div>
            </div>
            <div className="mdl-card__supporting-text" style={{height: "55px", overflowY: "auto"}}>
              {this.props.description}
            </div>
        </div>
        <div className="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp">
        </div>
        <div className="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp">
        </div>
        <div className="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp">

        </div>
      </div>
    )
  }
})

bottlereact._register('ShowPage', ShowPage)
