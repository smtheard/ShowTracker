// require watch_button.jsx

var EpisodeRow = React.createClass({
  getInitialState: function() {
    return {
      watched: this.props.watched_by_user
    }
  },

  render: function() {
    return (
      <li className="mdl-list__item mdl-list__item--two-line">
        <span className="mdl-list__item-primary-content">
          <span>{this.props.show_title}</span>
          <span className="mdl-list__item-sub-title">
            {this.props.season_number}x{this.props.number}
          </span>
        </span>
        <span className="mdl-list__item-secondary-content">
          <bottlereact.WatchButton
            callback={_ => {location.reload()}} // TODO: gross hack to avoid writing a bunch of state propogation code at the moment
            prefetchedState={{watched: this.state.watched}}
            episode_id={this.props.id} />
          <span className="mdl-list__item-secondary-info">{npm.moment(this.props.first_air).fromNow()}</span>
        </span>
      </li>
    )
  }
});

var EpisodeList = React.createClass({
  getInitialState: function() {
    return {
      episodes: this.props.episodes
    };
  },

  render: function() {
    var episode_rows = null;
    episode_rows = this.state.episodes.map(episode => {
      return (<EpisodeRow {...episode} />);
    });
    return (
      <div className="mdl-card mdl-shadow--2dp" style={{margin: "5px"}}>
        <div className="mdl-card__title">
          <h5 className="mdl-card__title-text">{this.props.title} Episodes</h5>
        </div>
        <ul className="mdl-list">
          {episode_rows}
        </ul>
      </div>
    )
  }
});

bottlereact._register('EpisodeList', EpisodeList);
