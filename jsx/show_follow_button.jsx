var ShowFollowButton = React.createClass({
  getInitialState: function() {
    return {following: this.props.prefetchedState && this.props.prefetchedState.following};
  },

  componentDidMount: function() {
    if(!this.props.prefetchedState)
      this.fetch();
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({following: nextProps.prefetchedState && nextProps.prefetchedState.following});
  },

  fetch: function() {
    $.ajax({
       type: 'GET',
       contentType: 'application/json',
       url: '/rest/show-follow/' + this.props.show_id,
       data: JSON.stringify(this.state),
       success: (data) => {
          if(data.success)
            this.updateState(data);
          else
            this.onFailure(data);
        },
       error: this.onFailure
    });
  },

  onClick: function() {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: '/rest/show-follow/' + this.props.show_id,
      data: JSON.stringify(this.state),
      success: (data) => {
        if(data.redirect)
          window.location = data.redirect;
        if(data.success)
          this.updateState(data);
        else
          this.onFailure(data);
        },
       error: this.onFailure
    });
  },

  updateState: function(data) {
    this.setState({following: data.following});
  },

  onFailure: function(data) {
    console.log("todo");
  },

  render: function() {
    var mdl_styling = this.state.following ?
      "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" :
      "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
    return (
      <button onClick={this.onClick} className={mdl_styling} style={this.props.style}>
        {this.state.following ? "Remove from My Shows" :  "Add to My Shows"  }
      </button>
    );
  }
});

bottlereact._register('ShowFollowButton', ShowFollowButton);
