Layout = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    };
  },

  render() {
    return (
      <span>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <a className="navbar-brand" href="#">Brand</a>
            <ul className="nav navbar-nav">
              <li className={this.data.currentUser._id === FlowRouter.getParam('_id') ? 'active' : null}>
                <a href={`wardrobes/${this.data.currentUser._id}`}>
                  Your wardrobe
                </a>
              </li>
            </ul>
            <div className="navbar-right">
              <AccountsUIWrapper/>
            </div>
          </div>
        </nav>
        {this.props.content()}
      </span>
    );
  }
});
