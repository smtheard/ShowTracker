var WatchButton = React.createClass({
  getInitialState: function() {
    return {watched: false,
            icon: this.icon("remove_red_eye"),
            text: "Mark as Watched"};
  },

  onClick: function() {
    var watched = !this.state.watched
    this.setState({
      watched: watched,
      icon: watched ? this.icon("done", "#4CAF50") : this.icon("remove_red_eye"),
      text: watched ? "Watched" : "Mark as Watched"
     });
  },

  onMouseOver: function() {
    if(this.state.watched) {
      this.setState({
        icon: this.icon("cancel", "#e62117"),
        text: "Unwatch"
      });
    }
  },

  onMouseLeave: function() {
    if(this.state.watched) {
      this.setState({
        icon: this.icon("done", "#4CAF50"),
        text: "Watched"
      });
    }
  },

  icon: function(name, color) {
    return <div style={{color: color}} className="mdl-chip__action"><i  className="material-icons">{name}</i></div>
  },

  render: function() {
    var mdl_styling = this.state.watched ?
      "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" :
      "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
    return (
      <span onClick={this.onClick} 
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        style={{display: "inline-block", cursor: "pointer", margin: "5px", backgroundColor: "white"}}
        className="mdl-chip mdl-chip--contact mdl-chip mdl-shadow--2dp">
          <span className="mdl-chip__text" style={{marginLeft: "10px"}}>
            {this.state.text}
          </span>
          {this.state.icon}
      </span>
    );
  }
});

bottlereact._register('WatchButton', WatchButton);
