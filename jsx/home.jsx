// require show_card.jsx

var Home = React.createClass({
  getInitialState: function() {
    return {shows: [], page: 0, query: ""};
  },

  componentWillMount: function() {
    this.loadShows();
    componentHandler.upgradeDom();
  },

  loadShows: function() {
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

  updateShows: function(show_data) {
    // data format:
    // [{id: 1, title: "Game of Thrones", image_src: "www.gameofthrones.com/image/5", ...},
    //  {id: 2, title: "Billions", ...}]
    
    var shows = this.state.shows;
    Array.prototype.push.apply(shows, show_data);
    this.setState({shows: shows});
  },

  updateQuery: function(event) {
    this.setState({query: event.target.value});
  },

  render: function() {
    var show_cards = this.state.shows.map(show => {
      return (<bottlereact.ShowCard {...show} width="370px"/>);
    });
    return (
      <div>
        <form action="#">
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
