var ShowCard = React.createClass({
  getInitialState: function() {
    return {expanded: false, opacity: 3};
  },

  truncate: function(str) {
    var truncated = str.split(/\s+/).slice(0,25).join(" ");
    if(truncated.length < str.length)
      return truncated + "...";
    else
      return truncated;
  },

  toggleDesc: function(event) {
    this.setState({expanded: !this.state.expanded});
  },

  increaseOpacity: function(event) {
    this.setState({opacity: 9});
  },

  decreaseOpacity: function(event) {
    this.setState({opacity: 3});
  },

  render: function() {
    return (
      <div className="mdl-card mdl-shadow--2dp" 
           style={{height: "340px", width: this.props.width, display: "inline-block", margin: "5px"}}>
        <a href={this.props.path}>
          <div className="mdl-card__title"
               style={{ cursor: "pointer", position: "relative", padding: 0, color: "#fff", height: "176px", background: "url('" + this.props.image_src + "')" }}
               onMouseOver={this.increaseOpacity}
               onMouseLeave={this.decreaseOpacity}>
            <div style={{position: "absolute", background: "rgba(0, 0, 0, 0."+ this.state.opacity + ")", width: this.props.width, bottom: 0, padding: "10px"}}>
              <h2 className="mdl-card__title-text">{this.props.title}</h2>
            </div>
          </div>
        </a>
        <div onClick={this.toggleDesc} className="mdl-card__supporting-text" style={{height: "75px", overflowY: "auto"}}>
          {this.state.expanded ? this.props.description : this.truncate(this.props.description)}
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Follow
          </a>
        </div>
      </div>
    )
  }
})

bottlereact._register('ShowCard', ShowCard)
