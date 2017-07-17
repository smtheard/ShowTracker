// require show_card.jsx

var Home = React.createClass({
  getInitialState: function() {
    return {shows: [], page: 0, query: "", pageCount: 0};
  },

  componentWillMount: function() {
    this.loadShows(0);
    componentHandler.upgradeDom();
  },

  loadShows: function(page) {
    $.ajax({
       type: 'GET',
       contentType: 'application/json',
       url: '/rest/shows/' + page,
       success: (data) => {
          if(data.success)
            this.updateState(data);
        }
    });
  },

  queryShows: function(page) {
    $.ajax({
       type: 'POST',
       contentType: 'application/json',
       url: '/rest/shows/' + (page || 0),
       data: JSON.stringify({query: this.state.query}),
       success: data => {
          if(data.success)
            this.updateState(data);
          else
            this.onFailure(data);
        },
       error: this.onFailure
    });
  },

  updateState: function(data) {
    // data format:
    // [{id: 1, title: "Game of Thrones", image_src: "www.gameofthrones.com/image/5", ...},
    //  {id: 2, title: "Billions", ...}]
    this.setState({shows: data.shows, pageCount: parseInt(data.page_count) || 0});
  },

  updateQuery: function(event) {
    event.preventDefault();
    this.setState({query: event.target.value}, this.queryShows);
  },

  handlePageClick: function(event) {
    var page = event.selected;
    if(this.state.query)
      this.queryShows(page);
    else
      this.loadShows(page);
  },

  render: function() {
    var show_cards = this.state.shows.map(show => {
      return (<bottlereact.ShowCard key={show.show_id} {...show} width="370px"/>);
    });
    return (
      <div>
        <div style={{width: "360px", display: "table", margin:"0 auto"}} className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input value={this.state.query} onChange={this.updateQuery} className="mdl-textfield__input" type="text" id="search" />
          <label className="mdl-textfield__label" htmlFor="search">Search Shows...</label>
        </div>
        {show_cards}
        <npm.ReactPaginate
          pageCount={this.state.pageCount}
          breakLabel={<a href="">...</a>}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={this.handlePageClick} />
      </div>
    )
  }
});

bottlereact._register('Home', Home)
