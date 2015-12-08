const _ = lodash;

let randomUser = () => {
  const randomNum = _.random(1000, 9999);

  return Accounts.createUser({
    username: `Dummy${randomNum}`,
    email: `dummy${randomNum}@example.com`,
    password: 'password',
    profile: {
      name: `Dummy ${randomNum}`
    }
  });
};

let randomRetailer = () => {
  switch(_.random(0, 2)) {
    case 0:
      return 'Banana Republic';
    case 1:
      return 'Gap';
    case 2:
      return 'Everlane';
  }
};

let randomSize = () => {
  switch(_.random(0, 2)) {
    case 0:
      return 'Small';
    case 1:
      return 'Medium';
    case 2:
      return 'Large';
  }
};

let randomFit = () => {
  switch(_.random(0, 2)) {
    case 0:
      return 'Slim';
    case 1:
      return 'Normal';
    case 2:
      return '';
  }
};

Meteor.methods({
  seed(){
    _.times(10, (i) => {
      Shirts.insert({
        wardrobe: randomUser(),
        retailer: randomRetailer(),
        size: randomSize(),
        fit: randomFit(),
        created_at: Date.now()
      });
    });
  }
})
