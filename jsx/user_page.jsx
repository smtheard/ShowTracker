// require show_card.jsx
// require watch_button.jsx

var EpisodeEvent = React.createClass({
  getInitialState: function() {
    return {active: false};
  },

  toggleTooltip: function() {
    console.log("event clicker");
    var active = this.state.active;
    this.setState({active: !active});
  },

  render: function() {
    return (
      <div onClick={this.toggleTooltip}>
        <div id={"event"}  style={{cursor: "pointer", lineHeight: "1.2"}}>{this.props.title}</div>
        <div style={{fontSize: "11px"}}>2x05</div>
        <npm.Tooltip active={this.state.active} position="top" arrow="center" parent="#event" >
          <div onClick={this.toggleTooltip} style={{position: "absolute", top:2, right:2, fontSize:16}}>X</div>
              <bottlereact.WatchButton
              prefetchedState={{watched: this.state.watched}}
              watched_text={"Unwatch Season"}
              not_watched_text={"Mark Season As Watched"}
              show_id={this.props.show_id}
              season_number={this.props.number}
              callback={this.props.watch_button_callback} />
        </npm.Tooltip>
      </div>
    );
  }
});

var UserPage = React.createClass({
  getInitialState: function() {
    return {shows: this.props.followed_shows};
  },

  width: function() {
    if(this.state.shows.length > 12)
      return 263;
    else
      return 353;
  },

  render: function() {
    var show_cards = this.state.shows.map(show => {
      return (<bottlereact.ShowCard {...show} width={this.width()}/>);
    });
    return (
      <div className="mdl-grid">

        <div className="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp">
        </div>
        <div className="mdl-cell mdl-cell--8-col mdl-card mdl-shadow--2dp" style={{minHeight: "600px"}}>
          <npm.BigCalendar
            events={[{title: "No Ordinary Family", start: new Date(2017, 4, 17), end: new Date(2017, 4, 17)}]}
            startAccessor='start'
            endAccessor='end'
            views={["month"]}
            components={{event: EpisodeEvent}} />
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
})

bottlereact._register('UserPage', UserPage)
