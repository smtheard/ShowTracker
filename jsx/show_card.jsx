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

  viewShow: function(event) {
    // TODO: implement url (going to need slugs)
    window.location = this.props.url;
  },

  render: function() {
    return (
      <div className="mdl-card mdl-shadow--2dp" 
           style={{height: "340px", width: "370px", display: "inline-block", margin: "5px"}}>
        <div className="mdl-card__title"
             style={{ cursor: "pointer", position: "relative", padding: 0, color: "#fff", height: "176px", background: "url('" + this.props.image_src + "')" }}
             onMouseOver={this.increaseOpacity}
             onMouseLeave={this.decreaseOpacity}
             onClick={this.viewShow}>
          <div 
               style={{position: "absolute", background: "rgba(0, 0, 0, 0."+ this.state.opacity + ")", width: "470px", bottom: 0, padding: "10px"}}>
            <h2 className="mdl-card__title-text">{this.props.title}</h2>
          </div>
        </div>
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
