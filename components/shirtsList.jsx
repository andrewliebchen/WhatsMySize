ShirtsList = React.createClass({
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
                {/*<th>Wardrobe</th>*/}
              </tr>
            </thead>
            <tbody>
              {this.props.shirts.map((shirt, i) => {
                // let wardrobe = Meteor.users.find({_id: shirt.wardrobe}).fetch();
                return (
                  <tr key={i}>
                    <td>{shirt.retailer}</td>
                    <td>{shirt.size}</td>
                    <td>{shirt.fit}</td>
                    {/*
                    <td>
                      <a href={`/wardrobes/${wardrobe[0]._id}`}>{wardrobe[0].profile.name}</a>
                    </td>
                    */}
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
