App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      shirts: Shirts.find({}).fetch()
    };
  },

  render() {
    return (
      <div className="container"> 
        <AccountsUIWrapper/>
        <a href={`wardrobes/${this.data.currentUser._id}`}>Your wardrobe</a>
        <input type="search"/>
        <ShirtsList shirts={this.data.shirts}/>
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/', {
    action() {
      ReactLayout.render(App);
    }
  });
}
