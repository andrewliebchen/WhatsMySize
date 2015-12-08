NewShirt = React.createClass({
  handleAddShirt() {
    let retailer = ReactDOM.findDOMNode(this.refs.retailer);
    let size = ReactDOM.findDOMNode(this.refs.size);
    let fit = ReactDOM.findDOMNode(this.refs.fit);

    Shirts.insert({
      wardrobe: this.props.wardrobe,
      retailer: retailer.value,
      size: size.value,
      fit: fit.value,
      created_at: Date.now()
    });

    retailer.value = '';
    size.value = '';
    fit.value = '';
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
