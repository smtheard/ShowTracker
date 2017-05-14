// require episode_card.jsx
// require watch_button.jsx

var Season = React.createClass({
  getInitialState: function() {
    return {
      episodes: this.episodes(this.props),
      watched: this.seasonWatched(this.props)
    };
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({
      episodes: this.episodes(newProps),
      watched: this.seasonWatched(newProps)
    });
  },

  episodes: function(props) {
    var episodes = props.episodes.sort((a, b) => {return b.number - a.number }).map(episode => {
      return <bottlereact.EpisodeCard {...episode} />
    });
    return episodes;
  },

  seasonWatched: function(props) {
    return props.episodes.every( episode => { return episode.watched_by_user });
  },

  render: function() {
    return (
      <div className="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
        <div className="mdl-layout-title">
          <div style={{marginTop: "16px", marginLeft: "16px", display: "inline-block"}}>Season {this.props.number}</div>
          <div style={{display: "inline-block", verticalAlign: "middle"}}>
            <bottlereact.WatchButton
              prefetchedState={{watched: this.state.watched}}
              watched_text={"Unwatch Season"}
              not_watched_text={"Mark Season As Watched"}
              show_id={this.props.show_id}
              season_number={this.props.number} />
          </div>
        </div>
        <div className="mdl-grid" style={{margin: "0"}}>
          {this.state.episodes}
        </div>
      </div>
    );
  }
});

bottlereact._register('Season', Season)
