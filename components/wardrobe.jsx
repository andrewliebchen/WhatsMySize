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

  render() {
    return (
      <div className="wrapper">
        <header>
          <h1>{`${this.data.user.profile.name}'s`} Wardrobe</h1>
        </header>
        <h3>Your shirts</h3>
        <ShirtsList shirts={this.data.wardrobeShirts}/>

        <h3>Matching shirts</h3>
        <ShirtsList shirts={this.data.matchingShirts}/>

        <h3>Add shirts</h3>
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
        ReactLayout.render(Wardrobe);
      });
    }
  });
}
