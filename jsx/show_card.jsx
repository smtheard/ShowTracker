// require show_follow_button.jsx

var ShowCard = React.createClass({
  getInitialState: function() {
    return {
      expanded: false,
      opacity: 3,
      is_followed_by_user: this.props.is_followed_by_user,
      show_id: this.props.show_id
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      is_followed_by_user: nextProps.is_followed_by_user,
      show_id: nextProps.show_id
    });
  },

  truncate: function(str) {
    if(!str)
      return "";
    
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
           style={{height: "320px", width: this.props.width, display: "inline-block", margin: "5px"}}>
        <a href={this.props.path}>
          <div className="b-lazy mdl-card__title"
               style={{ cursor: "pointer", position: "relative", padding: 0, color: "#fff", height: "176px" }}
               data-src={this.props.image_src}
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
        <bottlereact.ShowFollowButton prefetchedState={{following: this.state.is_followed_by_user}} show_id={this.state.show_id} style={{width: "100%"}}/>
      </div>
    );
  }
});

bottlereact._register('ShowCard', ShowCard);
