App = React.createClass({
  render() {
    return (
      <div>Hello world!</div>
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
