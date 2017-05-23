var WatchButton = React.createClass({
  getInitialState: function() {
    return {watched: false,
            icon: this.icon("remove_red_eye"),
            text: this.notWatchedText()};
  },

  componentDidMount: function() {
    if(this.props.prefetchedState)
      this.updateState(this.props.prefetchedState);
    else
      this.fetch();
  },

  componentWillReceiveProps: function(newProps) {
    if(newProps.prefetchedState)
      this.updateState(newProps.prefetchedState);
  },

  fetch: function() {
    $.ajax({
      type: 'GET',
      contentType: 'application/json',
      // parent_type is an enum, episode/season/show
      // id refers to episode id for episode, show id for season/show
      url: this.url(),
      success: (data) => {
        if(data.success)
          this.updateState(data);
        else
          this.onFailure(data);
      }
    });
  },

  watchedText: function() {
    return (this.props.watched_text || "Watched");
  },

  notWatchedText: function() {
    return (this.props.not_watched_text || "Mark as Watched");
  },

  updateState: function(data) {
    var watched = data.watched;
    this.setState({
      watched: watched,
      icon: watched ? this.icon("done", "#4CAF50") : this.icon("remove_red_eye"),
      text: watched ? this.watchedText() : this.notWatchedText()
     });
  },

  parentType: function() {
    if(this.props.season_number)
      return "season";
    if(this.props.show_id)
      return "show";
    return "episode";
  },

  url: function() {
    var parent_type = this.parentType();
    var url = '/rest/' + parent_type + '-watch/';
    if(parent_type == "season") 
      return url + this.props.show_id + '/' + this.props.season_number;
    else
      return url + (this.props.episode_id || this.props.show_id);
  },

  onClick: function() {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: this.url(),
      data: JSON.stringify({watched: this.state.watched}),
      success: (data) => {
        if(data.redirect)
          window.location = data.redirect;
        if(data.success){
          this.updateState(data);
          this.props.callback && this.props.callback();
        }
        else
          this.onFailure(data);
      },
      error: this.onFailure
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
        text: this.watchedText()
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

    if(this.props.tiny) {
      return (
        <span onClick={this.onClick} 
          onMouseOver={this.onMouseOver}
          onMouseLeave={this.onMouseLeave}
          style={{display: "float", cursor: "pointer",  backgroundColor: "white"}}>
          {this.state.icon}
        </span>
      ); 
    } else {
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

  }
});

bottlereact._register('WatchButton', WatchButton);
