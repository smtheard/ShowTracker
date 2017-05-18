// require show_card.jsx
// require watch_button.jsx

var EpisodeEvent = React.createClass({
  render: function() {
    return (<h1> hello </h1>);
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
        <div className="mdl-cell mdl-cell--8-col mdl-card mdl-shadow--2dp" style={{height: "500px"}}>
          <BigCalendar
            events={[{title: "event1", start: new Date(2017, 5, 17), end: new Date(2017, 5, 17)}]}
            startAccessor='start'
            endAccessor='end'
            views={["month"]}
            components={{event: EpisodeEvent}} />
        </div>
        <div className="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp">
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
