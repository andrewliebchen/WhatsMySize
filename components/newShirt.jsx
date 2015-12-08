NewShirt = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    wardrobe: React.PropTypes.string.isRequired
  },

  getMeteorData() {
    return {
      alert: Session.get('alert')
    };
  },

  handleAddShirt(event) {
    event.preventDefault();

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
        Session.set('alert', 'Shirt added, playa!');
        retailer.value = '';
        size.value = '';
        fit.value = '';
      }
    });
  },

  render() {
    return (
      <form>
        <div className="modal-body">
          {this.data.alert ?
            <div className="alert alert-success">{this.data.alert}</div>
          : null}
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
        <footer className="modal-footer">
          <input
            type="submit"
            value="Add shirt"
            className="btn btn-primary"
            onClick={this.handleAddShirt}/>
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
