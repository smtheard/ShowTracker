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
      allEpisodes: this.props.episodes
    };
  },

  filterUpcoming: function() {
    var time7daysInFuture = npm.moment().add(7,'days').startOf('day');
    var yesterdayEndOfRange =  npm.moment().endOf('day').subtract(1,'day');
    return this.state.allEpisodes.filter(
      episode => {
        return npm.moment(episode.first_air).isBetween(yesterdayEndOfRange, time7daysInFuture);
      }
    );
  },

  filterRecent: function() {
    var time7daysAgo = npm.moment().subtract(7,'days').startOf('day');
    var yesterdayEndOfRange =  npm.moment().endOf('day').subtract(1,'day');
    return this.state.allEpisodes.filter(
      episode => {
        return npm.moment(episode.first_air).isBetween(time7daysAgo, yesterdayEndOfRange);
      }
    );
  },

  render: function() {
    var episode_rows = null;
    if(this.props.mode == "Upcoming") {
      episode_rows = this.filterUpcoming().map(episode => {
        return (<EpisodeRow {...episode} />);
      });
    } else if(this.props.mode == "Recent") {
      episode_rows = this.filterRecent().map(episode => {
        return (<EpisodeRow {...episode} />);
      });
    }
    return (
      <div className="mdl-card mdl-shadow--2dp" style={{margin: "5px"}}>
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">{this.props.mode} Episodes</h2>
        </div>
        <ul className="mdl-list">
          {episode_rows}
        </ul>
      </div>
    )
  }
});

bottlereact._register('EpisodeList', EpisodeList);
