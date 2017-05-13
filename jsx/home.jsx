// require show_card.jsx

var Home = React.createClass({
  getInitialState: function() {
    return {shows: [], page: 0};
  },

  componentWillMount: function() {
    this.loadShows();
  },

  loadShows: function() {
    $.ajax({
       type: 'GET',
       contentType: 'application/json',
       url: '/rest/shows',
       success: (data) => {
          if(data.success)
            this.updateState(data.shows);
        }
    });
  },

  updateState: function(show_data) {
    // data format:
    // [{id: 1, title: "Game of Thrones", image_src: "www.gameofthrones.com/image/5", ...},
    //  {id: 2, title: "Billions", ...}]
    
    var shows = this.state.shows;
    Array.prototype.push.apply(shows, show_data);
    this.setState({shows: shows});
  },

  render: function() {
    var show_cards = this.state.shows.map(show => {
      return (<bottlereact.ShowCard {...show} width="370"/>);
    });
    return (
      <div>
        {show_cards}
      </div>
    )
  }
});

bottlereact._register('Home', Home)
