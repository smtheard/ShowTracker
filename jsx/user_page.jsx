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

  render: function() {
    var show_cards = this.state.shows.map(show => {
      return (<bottlereact.ShowCard {...show} width={this.width()}/>);
    });

    var episode_events = this.state.episodes.map(episode => {
      var first_air = npm.moment(episode.first_air);
      return {title: episode.show_title, start: first_air, end: first_air, props: {...episode}}; 
    });

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp">
          <bottlereact.EpisodeList mode={"Upcoming"} episodes={this.state.episodes} />
          <bottlereact.EpisodeList mode={"Recent"} episodes={this.state.episodes} />
        </div>
        <div className="mdl-cell mdl-cell--8-col mdl-card mdl-shadow--2dp" style={{minHeight: "600px"}}>
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
});

bottlereact._register('UserPage', UserPage);
