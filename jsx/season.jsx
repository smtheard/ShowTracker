// require episode_card.jsx
// require watch_button.jsx

var Season = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    var episodes = this.props.episodes.sort((a, b) => {return b.number - a.number }).map(episode => {
      return <bottlereact.EpisodeCard {...episode} />
    });
    return (
      <div className="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
        <div className="mdl-layout-title">
          <div style={{marginTop: "16px", marginLeft: "16px", display: "inline-block"}}>Season {this.props.number}</div>
          <div style={{display: "inline-block", verticalAlign: "middle"}}>
            <bottlereact.WatchButton watchedText={"Unwatch Season"} notWatchedText={"Mark Season As Watched"} show_id={this.props.show_id} season_number={this.props.number} />
          </div>
        </div>
        <div className="mdl-grid" style={{margin: "0"}}>
          {episodes}
        </div>
      </div>
    );
  }
});

bottlereact._register('Season', Season)
