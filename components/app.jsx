const _ = lodash;

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
      <div className="wrapper"> 
        <AccountsUIWrapper/>
        <a href={`wardrobes/${this.data.currentUser._id}`}>Your wardrobe</a>
        <input type="search"/>
        <ShirtsList shirts={this.data.shirts}/>
      </div>
    );
  }
});

Wardrobe = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let shirts = Shirts.find({}).fetch();
    let currentUserId = Meteor.user()._id;
    let currentUserShirts = Shirts.find({wardrobe: currentUserId}).fetch();

    // Get a list of users with shirts matching fields
    // Get shirts from each of those users
    // This can move into a publication
    let matchingUsers = [];
    _.forEach(currentUserShirts, (shirt, i) => {
      matchingUsers.push(_.pluck(_.filter(shirts, {
        'size': shirt.size,
        'fit': shirt.fit
      }), 'wardrobe'));
    });

    matchingUsers = _.uniq(_.flatten(matchingUsers));

    return {
      currentUser: Meteor.user(),
      currentUserShirts: currentUserShirts,
      matchingShirts: Shirts.find({wardrobe: {$in: matchingUsers}}).fetch()
    };
  },

  render() {
    return (
      <div className="wrapper">
        <header>
          <h1>{`${this.data.currentUser.profile.name}'s`} Wardrobe</h1>
        </header>
        <h3>Your shirts</h3>
        <ShirtsList shirts={this.data.currentUserShirts}/>

        <h3>Matching shirts</h3>
        <ShirtsList shirts={this.data.matchingShirts}/>

        <h3>Add shirts</h3>
        <NewShirt wardrobe={this.data.currentUser._id}/>
      </div>
    );
  }
});

ShirtsList = React.createClass({
  render() {
    return (
      <div className="shirts">
        {this.props.shirts.length ?
          <table>
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
                let wardrobe = Meteor.users.find({_id: shirt.wardrobe}).fetch();
                return (
                  <tr key={i}>
                    <td>{shirt.retailer}</td>
                    <td>{shirt.size}</td>
                    <td>{shirt.fit}</td>
                    <td>{wardrobe[0].profile.name}</td>
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

if(Meteor.isClient) {
  FlowRouter.route('/', {
    action() {
      ReactLayout.render(App);
    }
  });

  FlowRouter.route('/wardrobes/:_id', {
    action(params) {
      ReactLayout.render(Wardrobe);
    }
  });
}
