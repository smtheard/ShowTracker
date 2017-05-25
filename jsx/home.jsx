// require show_card.jsx

var Home = React.createClass({
  getInitialState: function() {
    return {shows: [], page: 0, query: ""};
  },

  componentWillMount: function() {
    this.loadAllShows();
    componentHandler.upgradeDom();
  },

  loadAllShows: function() {
    $.ajax({
       type: 'GET',
       contentType: 'application/json',
       url: '/rest/shows',
       success: (data) => {
          if(data.success)
            this.updateShows(data.shows);
        }
    });
  },

  queryShows: function(event) {
    if(event)
      event.preventDefault();
    $.ajax({
       type: 'POST',
       contentType: 'application/json',
       url: '/rest/shows',
       data: JSON.stringify({query: this.state.query}),
       success: data => {
          if(data.success)
            this.updateShows(data.shows);
          else
            this.onFailure(data);
        },
       error: this.onFailure
    });
  },

  updateShows: function(show_data) {
    // data format:
    // [{id: 1, title: "Game of Thrones", image_src: "www.gameofthrones.com/image/5", ...},
    //  {id: 2, title: "Billions", ...}]
    this.setState({shows: show_data});
  },

  updateQuery: function(event) {
    event.preventDefault();
    this.setState({query: event.target.value}, this.queryShows);
  },

  render: function() {
    var show_cards = this.state.shows.map(show => {
      return (<bottlereact.ShowCard {...show} width="370px"/>);
    });
    return (
      <div>
        <form onSubmit={this.queryShows}>
          <div style={{width: "100%"}} className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input value={this.state.query} onChange={this.updateQuery} className="mdl-textfield__input" type="text" id="search" />
            <label className="mdl-textfield__label" htmlFor="search">Search Shows...</label>
          </div>
        </form>
        {show_cards}
      </div>
    )
  }
});

bottlereact._register('Home', Home)
