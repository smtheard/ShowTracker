
var Root = React.createClass({
  render: function() {
    return (
      <div>
        <title> {this.props.title} </title>
        Root Page
      </div>
    );
  }
})

bottlereact._register('Root', Root)
