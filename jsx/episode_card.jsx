// require watch_button.jsx

var EpisodeCard = React.createClass({
  getInitialState: function() {
    return this.props;
  },

  componentWillReceiveProps: function(newProps) {
    this.setState(newProps);
  },

  render: function() {
    return (
      <div className="mdl-cell mdl-cell--3-col mdl-card mdl-shadow--2dp" >
        <div className="mdl-card__title">
          Episode {this.state.number}
        </div>
        <div className="mdl-card__title" style={{padding: "0px", marginLeft: "16px"}}>
          {this.state.title}
        </div>
        <div className="mdl-card__supporting-text" style={{margin: 0, padding: 0}}>
          <bottlereact.WatchButton callback={this.props.watch_button_callback} prefetchedState={{watched: this.state.watched_by_user}} episode_id={this.state.id} />
        </div>
        <div className="mdl-card__supporting-text" style={{overflowY: "auto"}}>
          {npm.moment.utc(this.state.first_air).tz(npm.moment.tz.guess()).format("MMMM D, YYYY h:mm A z")}
        </div>
        {this.state.description ?
        <div className="mdl-card__supporting-text" style={{overflowY: "auto"}}>
          Description: {this.state.description}
        </div> : <span/> }
      </div>
    );
  }
});

bottlereact._register('EpisodeCard', EpisodeCard)
