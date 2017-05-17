// require show_card.jsx
// require watch_button.jsx

var UserPage = React.createClass({
  getInitialState: function() {
    return {shows: this.props.followed_shows};
  },

  render: function() {
    var show_cards = this.state.shows.map(show => {
      return (<bottlereact.ShowCard {...show} width="353"/>);
    });
    return (
      <div className="mdl-grid">
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
