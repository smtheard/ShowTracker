// require episode_card.jsx
// require watch_button.jsx

var EpisodeCard = React.createClass({
  getInitialState: function() {
    return {watched: false};
  },

  render: function() {
    return (
      <div className="mdl-cell mdl-cell--3-col mdl-card mdl-shadow--2dp" >
        <div className="mdl-card__title">
          Episode {this.props.number}
        </div>
        <div className="mdl-card__title" style={{padding: "0px", marginLeft: "16px"}}>
          {this.props.title}
        </div>
        <div className="mdl-card__supporting-text" style={{margin: 0, padding: 0}}>
          <bottlereact.WatchButton episode_id={this.props.id} />
        </div>
        <div className="mdl-card__supporting-text" style={{overflowY: "auto"}}>
          Air Date: {this.props.first_air}
        </div>

        <div className="mdl-card__supporting-text" style={{overflowY: "auto"}}>
          Description: {this.props.description}
        </div>
      </div>
    );
  }
});

bottlereact._register('EpisodeCard', EpisodeCard)
