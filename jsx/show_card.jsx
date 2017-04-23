var ShowCard = React.createClass({
  render: function() {
    var style = { color:"#fff", height:"176px", background:"url('" + this.props.image_src + "')" }
    return (
      <div className="demo-card-wide mdl-card mdl-shadow--2dp" style={{width: "512px"}}>
        <div className="mdl-card__title" style={style}>
          <h2 className="mdl-card__title-text">{this.props.title}</h2>
        </div>
        <div className="mdl-card__supporting-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Mauris sagittis pellentesque lacus eleifend lacinia...
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Follow
          </a>
        </div>
        <div className="mdl-card__menu" style={{color: "#fff"}}>
          <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
            <i className="material-icons">share</i>
          </button>
        </div>
      </div>
    )
  }
})

bottlereact._register('ShowCard', ShowCard)
