App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      shirts: Shirts.find({}).fetch()
    };
  },

  handleAddSeeds() {
    Meteor.call('seed');
  },

  render() {
    return (
      <div className="container"> 
        <div className="form-group">
          <input type="search" className="form-control" placeholder="Non-functional search"/>
        </div>
        <ShirtsList shirts={this.data.shirts}/>
        <footer className="well">
          <button
            className="btn btn-default"
            onClick={this.handleAddSeeds}>
            Add seed shirts
          </button>
        </footer>
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/', {
    subscriptions() {
      this.register('shirts', Meteor.subscribe('shirts'));
    },

    action() {
      FlowRouter.subsReady('shirts', () => {
        ReactLayout.render(Layout, {
          content() {
            return <App/>;
          }
        });
      });
    }
  });
}
