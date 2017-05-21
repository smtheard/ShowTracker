// require watch_button.jsx

var EpisodeEvent = React.createClass({
  getInitialState: function() {
    return {
      tooltipActive: false,
      watched: this.props.watched_by_user
    };
  },

  toggleTooltip: function() {
    var active = this.state.tooltipActive;
    this.setState({tooltipActive: !active});
  },

  key: function() {
    return "event" + this.props.id;
  },

  toggleWatched: function() {
    console.log(this.state.watched);
    this.setState({watched: !this.state.watched});
  },

  render: function() {
    return (
      <div>
        <div id={this.key()} onClick={this.toggleTooltip} style={{cursor: "pointer", lineHeight: "0.9", fontSize: "14px"}}>{this.props.show_title}</div>
        <div onClick={this.toggleTooltip} style={{fontSize: "14px", float: "left"}}>{this.props.season_number + "x" + this.props.number}</div>
        <bottlereact.WatchButton
          callback={this.toggleWatched}
          prefetchedState={{watched: this.state.watched}}
          episode_id={this.props.id}
          tiny={true} />
        <npm.Tooltip group={this.key()} active={this.state.tooltipActive} position="top" arrow="center" parent={"#" + this.key()} tooltipTimeout={0}>
          <div>
            <div onClick={this.toggleTooltip} style={{cursor: "pointer", position: "absolute", top:2, right:2}}><i style={{fontSize: "1.3em"}}className="material-icons">&#xE5CD;</i></div>
            <a href={this.props.show_path} style={{cursor: "pointer", fontSize:'1.2em', marginRight: "26px", textDecoration: "none"}}>{this.props.show_title}</a>
            <div style={{fontSize: "14px"}}>Season: {this.props.season_number} Episode: {this.props.number}</div>
            <bottlereact.WatchButton
              callback={this.toggleWatched}
              prefetchedState={{watched: this.state.watched}}
              episode_id={this.props.id} />
          </div>
        </npm.Tooltip>
      </div>
    );
  }
});

bottlereact._register('EpisodeEvent', EpisodeEvent);
