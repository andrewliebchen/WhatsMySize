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
    let userId = FlowRouter.getParam('_id');
    return {
      user: Meteor.users.findOne(userId)
    };
  },

  render() {
    return (
      <div className="wrapper">
        <header>
          <h1>{`${this.data.user.profile.name}'s`} Wardrobe</h1>
        </header>
        <h3>Your shirts</h3>
        <WardrobeShirts id={this.data.user._id}/>

        <h3>Matching shirts</h3>
        <MatchingShirts id={this.data.user._id}/>

        <h3>Add shirts</h3>
        <NewShirt wardrobe={this.data.user._id}/>
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
                    <td>
                      {/*
                        <a href={`/wardrobes/${wardrobe[0]._id}`}>{wardrobe[0].profile.name}</a>
                        */}
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

WardrobeShirts = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let shirts = Meteor.subscribe('wardrobe', this.props.id);

    return {
      loading: !shirts.ready(),
      shirts: Shirts.find({wardrobe: this.props.id}).fetch()
    };
  },

  render() {
    if(this.data.loading) {
      return <div>loading...</div>
    }

    return (
      <ShirtsList shirts={this.data.shirts}/>
    );
  }
});

MatchingShirts = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let shirts = Meteor.subscribe('matchingShirts', this.props.id);

    return {
      loading: !shirts.ready(),
      shirts: Shirts.find({wardrobe: {
        $not: this.props.id
      }}).fetch()
    };
  },

  render() {
    if(this.data.loading) {
      return <div>loading...</div>
    }

    return (
      <ShirtsList shirts={this.data.shirts}/>
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
    subscriptions(params) {
      this.register('profile', Meteor.subscribe('profile', params._id));
    },
    action(params) {
      FlowRouter.subsReady('profile', () => {
        ReactLayout.render(Wardrobe);
      });
    }
  });
}
