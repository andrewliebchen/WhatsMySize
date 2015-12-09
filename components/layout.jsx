Layout = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    };
  },

  getInitialState() {
    return {
      newShirt: false
    };
  },

  handleNewShirtToggle() {
    this.setState({newShirt: !this.state.newShirt});
  },

  render() {
    return (
      <span>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <a className="navbar-brand" href="/">What's My Size?</a>
            <ul className="nav navbar-nav">
              {this.data.currentUser ?
                <li className={this.data.currentUser._id === FlowRouter.getParam('_id') ? 'active' : null}>
                  <a href={`wardrobes/${this.data.currentUser._id}`}>
                    Your wardrobe
                  </a>
                </li>
              : null}
            </ul>
            <div className="navbar-right">
              <button className="btn btn-primary" onClick={this.handleNewShirtToggle}>
                Add shirt
              </button>
            </div>
            <div className="navbar-right">
              <AccountsUIWrapper/>
            </div>
          </div>
        </nav>
        {this.props.content()}

        {this.state.newShirt ?
          <div className="modal" style={{display: 'block'}}>
            <div className="modal-dialog">
              <div className="modal-content">
                <header className="modal-header">
                  <button className="close" onClick={this.handleNewShirtToggle}>&times;</button>
                  <h4 className="modal-title">Add a shirt to your wardrobe</h4>
                </header>
                <NewShirt wardrobe={this.data.currentUser._id}/>
              </div>
            </div>
          </div>
        : null}
      </span>
    );
  }
});
