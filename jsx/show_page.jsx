// require show_card.jsx
// require show_info.jsx
// require season.jsx
// require watch_button.jsx

var ShowPage = React.createClass({
  getInitialState: function() {
    return {
      opacity: 3,
      episodes: this.props.episodes_by_season
    };
  },

  fetchEpisodes: function() {

  },

  render: function() {
    var seasons = Object.keys(this.props.episodes_by_season).sort((a, b) => b - a).map( season => {
      return <bottlereact.Season show_id={this.props.show_id} number={season} episodes={this.props.episodes_by_season[season]} />
    });
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--8-col mdl-shadow--2dp"
               style={{maxHeight: "370px", display: "inline-block", position: "relative"}}>
            <div className="mdl-card__title"
                 style={{ cursor: "pointer", position: "relative", padding: 0, color: "#fff", height: "176px", background: "url('" + this.props.image_src + "')" }}>
              <div style={{width: "auto", position: "absolute", background: "rgba(0, 0, 0, 0.7)", bottom: 0, padding: "10px"}}>
                <h2 className="mdl-card__title-text">{this.props.title}</h2>
              </div>
            </div>
            <div className="mdl-card__supporting-text" style={{overflowY: "auto", height: "100px"}}>
              {this.props.description}
            </div>
          <bottlereact.WatchButton watched_text={"Unwatch All Episodes"} not_w0atched_text={"Mark All Episodes as Watched"} show_id={this.props.show_id} />
        </div>
        <bottlereact.ShowInfo
          show_id={this.props.show_id}
          title={this.props.title}
          next_episode={this.props.next_episode}
          premiere_date={this.props.premiere_date}
          status={this.props.status}
          country={this.props.country}
          network_name={this.props.network_name}
          imdb_url={this.props.imdb_url}
          schedule={this.props.schedule} />
        {seasons}
      </div>
    )
  }
})

bottlereact._register('ShowPage', ShowPage)
