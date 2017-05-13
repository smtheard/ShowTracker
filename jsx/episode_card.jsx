// require episode_card.jsx
// require watch_button.jsx

var EpisodeCard = React.createClass({
  getInitialState: function() {
    return this.props;
  },

  componentWillReceiveProps: function(newProps) {
    this.setState(newProps);
  },

  render: function() {
    return (
      <div className="mdl-cell mdl-cell--3-col mdl-card mdl-shadow--2dp" >
        <div className="mdl-card__title">
          Episode {this.state.number}
        </div>
        <div className="mdl-card__title" style={{padding: "0px", marginLeft: "16px"}}>
          {this.state.title}
        </div>
        <div className="mdl-card__supporting-text" style={{margin: 0, padding: 0}}>
          <bottlereact.WatchButton prefetchedState={{watched: this.state.watched_by_user}} episode_id={this.state.id} />
        </div>
        <div className="mdl-card__supporting-text" style={{overflowY: "auto"}}>
          Air Date: {this.state.first_air}
        </div>

        <div className="mdl-card__supporting-text" style={{overflowY: "auto"}}>
          Description: {this.state.description}
        </div>
      </div>
    );
  }
});

bottlereact._register('EpisodeCard', EpisodeCard)
