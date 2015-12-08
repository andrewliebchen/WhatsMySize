Wardrobe = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let userId = FlowRouter.getParam('_id');
    return {
      user: Meteor.users.findOne(userId),
      wardrobeShirts: Shirts.find({wardrobe: userId}).fetch(),
      matchingShirts: Shirts.find({wardrobe: {
        $not: userId
      }}).fetch()
    };
  },

  getInitialState() {
    return {
      tab: 0
    };
  },

  handleTabNav(tab) {
    this.setState({tab: tab});
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>{`${this.data.user.profile.name}'s`} Wardrobe</h1>
        </header>
        <ul className="nav nav-tabs">
          <li className={this.state.tab === 0 ? 'active' : ''}>
            <a onClick={this.handleTabNav.bind(null, 0)}>Matching shirts</a>
          </li>
          <li className={this.state.tab === 1 ? 'active' : ''}>
            <a onClick={this.handleTabNav.bind(null, 1)}>My shirts</a>
          </li>
        </ul>
        {this.state.tab === 0 ? <ShirtsList shirts={this.data.matchingShirts}/> : null}
        {this.state.tab === 1 ? <ShirtsList shirts={this.data.wardrobeShirts}/> : null}
        <NewShirt wardrobe={this.data.user._id}/>
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/wardrobes/:_id', {
    subscriptions(params) {
      this.register('wardrobe', Meteor.subscribe('wardrobe', params._id));
    },

    action(params) {
      FlowRouter.subsReady('wardrobe', () => {
        ReactLayout.render(Layout, {
          content() {
            return <Wardrobe/>;
          }
        });
      });
    }
  });
}
