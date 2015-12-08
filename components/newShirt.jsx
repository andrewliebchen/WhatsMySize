NewShirt = React.createClass({
  propTypes: {
    wardrobe: React.PropTypes.string.isRequired
  },

  handleAddShirt() {
    let retailer = ReactDOM.findDOMNode(this.refs.retailer);
    let size = ReactDOM.findDOMNode(this.refs.size);
    let fit = ReactDOM.findDOMNode(this.refs.fit);

    Meteor.call('addShirt', {
      wardrobe: this.props.wardrobe,
      retailer: retailer.value,
      size: size.value,
      fit: fit.value,
      created_at: Date.now()
    }, (error, success) => {
      if(success) {
        Session.set('flash', 'Shirt added');
        retailer.value = '';
        size.value = '';
        fit.value = '';
      }
    });
  },

  render() {
    return (
      <form className="panel panel-default">
        <header className="panel-heading">
          <h3 className="panel-title">Add a shirt to your wardrobe</h3>
        </header>
        <div className="panel-body">
          <div className="form-group">
            <label>Retailer</label>
            <input
              type="text"
              className="form-control"
              ref="retailer"
              placeholder="Brooks Brothers"
              required/>
          </div>
          <div className="form-group">
            <label>Size</label>
            <input
              type="text"
              className="form-control"
              ref="size"
              placeholder="Medium"
              required/>
          </div>
          <div className="form-group">
            <label>Fit</label>
            <input
              type="text"
              className="form-control"
              ref="fit"
              placeholder="Slim"/>
          </div>
        </div>
        <footer className="panel-footer">
          <button
            className="btn btn-primary"
            onClick={this.handleAddShirt}>
            Add shirt
          </button>
        </footer>
      </form>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    addShirt(args) {
      return Shirts.insert({
        wardrobe: args.wardrobe,
        retailer: args.retailer,
        size: args.size,
        fit: args.fit,
        created_at: args.created_at
      });
    }
  });
}
