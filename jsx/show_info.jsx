// require track_button.jsx

var ShowInfo = React.createClass({
  getInitialState: function() {
    return {};
  },

  nullableRow: function(name, prop) {
    if(!prop)
      return "";
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric" style={{whiteSpace: "normal", wordWrap:"break-word", textAlign:"right"}}>
          {name}:
        </td>
        <td className="mdl-data-table__cell--non-numeric" style={{whiteSpace: "normal", wordWrap:"break-word", textAlign:"left"}}>
          {prop}
        </td>
      </tr>
    );
  },

  nextEpisode: function() {
    if(this.props.status == "Ended")
      return "";
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric" style={{whiteSpace: "normal", wordWrap:"break-word", textAlign:"right"}}>
          Next Episode:
        </td>
        <td className="mdl-data-table__cell--non-numeric" style={{whiteSpace: "normal", wordWrap:"break-word", textAlign:"left"}}>
          {this.props.next_episode ? this.props.next_episode : "TBA"}
        </td>
      </tr>
    );
  },

  render: function() {
    return (
      <div className="mdl-cell mdl-cell--4-col" style={{position:"relative", height: "340px"}}>
        <bottlereact.ShowFollowButton show_id={this.props.show_id} style={{width: "100%"}} />
        <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp" style={{width: "100%", tableLayout:"fixed"}}>
            {this.nextEpisode()}
            {this.nullableRow("Premiere Date", this.props.premiere_date)}
            {this.nullableRow("Status", this.props.status)}
            {this.nullableRow("Country", this.props.country)}
            {this.nullableRow("Network", this.props.network_name)}
            {this.nullableRow("Schedule", this.props.schedule)}
        </table>
        <a style={{position: "absolute", right: 0, bottom: 0, margin: "5px" }}
           target="_blank" rel="noopener noreferrer" href={this.props.imdb_url}>
          <img src="http://ia.media-imdb.com/images/M/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@._V1_.png" 
               alt="IMDB"
               style={{height:"28px", width:"60px"}}/>
        </a>
      </div>
    );
  }
})

bottlereact._register('ShowInfo', ShowInfo);
