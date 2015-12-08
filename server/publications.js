const _ = lodash;

Meteor.publish('profile', (id) => {
  return Meteor.users.find({_id: id});
});

Meteor.publish('wardrobe', (id) => {
  return Shirts.find({wardrobe: id});
});

Meteor.publish('matchingShirts', (id) => {
  let shirts = Shirts.find({}).fetch();
  let currentUserShirts = Shirts.find({wardrobe: id}).fetch();

  // Get a list of users with shirts matching fields
  // Get shirts from each of those users
  let matchingUsers = [];
  _.forEach(currentUserShirts, (shirt, i) => {
    matchingUsers.push(_.pluck(_.filter(shirts, {
      'size': shirt.size,
      'fit': shirt.fit
    }), 'wardrobe'));
  });

  matchingUsers = _.uniq(_.flatten(matchingUsers));

  return Shirts.find({wardrobe: {
    $in: matchingUsers
  }});
});
