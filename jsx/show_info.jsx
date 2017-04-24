var ShowInfo = React.createClass({
  getInitialState: function() {
    return {};
  },

  nullableRow: function(name, prop) {
    if(!prop)
      return "";
    return (
      <tr>
        <td className="mdl-list__item-primary-content">
          {name}:
        </td>
        <td className="mdl-list__item-primary-content">
          {prop}
        </td>
      </tr>
    );
  },

  render: function() {
    return (
      <div className="mdl-cell mdl-cell--4-col">
        <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
          <tbody>
            {this.nullableRow("Premiere Date", this.props.premiere_date)}
            {this.nullableRow("Status", this.props.status)}
            {this.nullableRow("Country", this.props.country)}
            {this.nullableRow("Network", this.props.network_name)}
            {this.nullableRow("Schedule", this.props.schedule)}
          </tbody>
        </table>
      </div>
    );
  }
})

bottlereact._register('ShowInfo', ShowInfo);
