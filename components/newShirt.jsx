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
      <div className="new-shirt">
        <div className="form-group">
          <label>Retailer</label>
          <input type="text" ref="retailer" placeholder="Brooks Brothers" required/>
        </div>
        <div className="form-group">
          <label>Size</label>
          <input type="text" ref="size" placeholder="Medium" required/>
        </div>
        <div className="form-group">
          <label>Fit</label>
          <input type="text" ref="fit" placeholder="Slim"/>
        </div>
        <button onClick={this.handleAddShirt}>Add shirt</button>
      </div>
    );
  }
});
