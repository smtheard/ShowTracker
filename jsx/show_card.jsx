var ShowCard = React.createClass({
  getInitialState: function() {
    return {expanded: false}
  },

  truncate: function(str) {
    var truncated = str.split(/\s+/).slice(0,25).join(" ");
    if(truncated.length < str.length)
      return truncated + "...";
    else
      return truncated;
  },

  toggleDesc: function(event) {
    this.setState({expanded: !this.state.expanded})
  },

  render: function() {
    return (
      <div className="demo-card-wide mdl-card mdl-shadow--2dp"
           style={{height: "340px", width: "370px", display:"inline-block", padding:"5px", margin:"5px"}}>
        <div className="mdl-card__title"
             style={{ color:"#fff", height:"176px", background:"url('" + this.props.image_src + "')" }}>
          <h2 className="mdl-card__title-text">{this.props.title}</h2>
        </div>
        <div onClick={this.toggleDesc} className="mdl-card__supporting-text" style={{height: "75px", overflowY:"auto"}}>
          {this.state.expanded ? this.props.description : this.truncate(this.props.description)}
        </div>
        <div className="mdl-card__actions mdl-card--border" style={{bottom: "0"}}>
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
