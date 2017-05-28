// require show_card.jsx
// require episode_event.jsx
// require episode_list.jsx

var UserPage = React.createClass({
  getInitialState: function() {
    return {
      shows: this.props.followed_shows,
      episodes: this.props.episodes
    };
  },

  width: function() {
    if(this.state.shows.length > 12)
      return 263;
    else
      return 353;
  },

  renderEvent: function(eventProps) {
    return (<bottlereact.EpisodeEvent {...eventProps.event.props}/>); 
  },

  filterUpcoming: function() {
    var time7daysInFuture = npm.moment().add(7,'days').startOf('day');
    var yesterdayEndOfRange =  npm.moment().endOf('day').subtract(1,'day');
    return this.state.episodes.filter(
      episode => {
        return npm.moment(episode.first_air).isBetween(yesterdayEndOfRange, time7daysInFuture);
      }
    );
  },

  filterRecent: function() {
    var time7daysAgo = npm.moment().subtract(7,'days').startOf('day');
    var yesterdayEndOfRange =  npm.moment().endOf('day').subtract(1,'day');
    return this.state.episodes.filter(
      episode => {
        return npm.moment(episode.first_air).isBetween(time7daysAgo, yesterdayEndOfRange);
      }
    );
  },

  render: function() {
    var show_cards = this.state.shows.map(show => {
      return (<bottlereact.ShowCard key={show.show_id} {...show} width={this.width()}/>);
    });

    var episode_events = this.state.episodes.map(episode => {
      var first_air = npm.moment(episode.first_air);
      return {title: episode.show_title, start: first_air, end: first_air, props: {...episode}}; 
    });

    var upcoming_episodes = this.filterUpcoming();
    var recent_episodes = this.filterRecent();
    var calendar_width = 12;
    var left_bar_visible = upcoming_episodes.length || recent_episodes.length;
    if(left_bar_visible)
      calendar_width = 8;

    if(this.props.followed_shows.length) {
      return (
        <div className="mdl-grid">
            {left_bar_visible ?
              <div className="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp">
                {upcoming_episodes.length ? <bottlereact.EpisodeList title={"Upcoming"} episodes={upcoming_episodes} /> : <span/>}
                {recent_episodes.length ? <bottlereact.EpisodeList title={"Recent"} episodes={recent_episodes} /> : <span/>}
              </div>
              : <span/> }
            <div className={"mdl-cell mdl-cell--"+ calendar_width + "-col mdl-card mdl-shadow--2dp"} style={{minHeight: "600px"}}>
              <h5 style={{textAlign: "center", margin: "16px"}}>Episode Calendar</h5>
              <npm.BigCalendar
                events={episode_events}
                startAccessor='start'
                endAccessor='end'
                views={["month"]}
                components={{event: this.renderEvent}} />
            </div>
            <div className="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
              <div className="mdl-layout-title">
                <div style={{marginTop: "16px", marginLeft: "16px", display: "inline-block"}}>
                  My Shows
                </div>
              </div>
              <div className="mdl-grid">
                {show_cards}
              </div>
            </div>
        </div>
      )
    }
    else {
      return (
        <div className="mdl-layout-title">
          <div style={{textAlign: "center"}}>
            Profiles are not populated until the user adds to "My Shows"! <br/>
            <a href="/" style={{textDecoration: "none"}}>Explore Shows</a>
          </div>
        </div>
      );
    }
  }
});

bottlereact._register('UserPage', UserPage);
