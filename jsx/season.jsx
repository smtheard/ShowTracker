// require episode_card.jsx

var Season = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    var episodes = this.props.episodes.map(episode => {
      return <bottlereact.EpisodeCard {...episode} />
    });
    return (
      <div className="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
        <div className="mdl-layout-title" style={{margin: "5px"}}>Season {this.props.number}</div>
        <div className="mdl-grid">
          {episodes}
        </div>
      </div>
    );
  }
});

bottlereact._register('Season', Season)
