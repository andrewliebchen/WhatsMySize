ShirtsList = React.createClass({
  propTypes: {
    shirts: React.PropTypes.array.isRequired
  },

  render() {
    return (
      <div>
        {this.props.shirts.length ?
          <table className="table">
            <thead>
              <tr>
                <th>Retailer</th>
                <th>Size</th>
                <th>Fit</th>
                <th>Wardrobe</th>
              </tr>
            </thead>
            <tbody>
              {this.props.shirts.map((shirt, i) => {
                let wardrobe = Meteor.users.findOne(shirt.wardrobe);
                return (
                  <tr key={i}>
                    <td>{shirt.retailer}</td>
                    <td>{shirt.size}</td>
                    <td>{shirt.fit}</td>
                    <td>
                      {wardrobe ?
                        <a href={`/wardrobes/${wardrobe._id}`}>
                          {wardrobe.profile.name}
                        </a>
                      : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        : <p>No shirts</p>}
    </div>
    );
  }
});
