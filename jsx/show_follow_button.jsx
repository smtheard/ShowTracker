var ShowFollowButton = React.createClass({
  getInitialState: function() {
    return {tracking: false};
  },

  onClick: function() {
    this.setState({tracking: !this.state.tracking});
  },

  render: function() {
    var mdl_styling = this.state.tracking ?
      "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" :
      "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
    return (
      <button onClick={this.onClick} className={mdl_styling} style={this.props.style}>
        {this.state.tracking ? "Remove from My Shows" :  "Add to My Shows"  }
      </button>
    );
  }
});

bottlereact._register('ShowFollowButton', ShowFollowButton);
