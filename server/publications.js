const _ = lodash;

Meteor.publish('wardrobe', (userId) => {
  let shirts = Shirts.find({}).fetch();
  let currentUserShirts = Shirts.find({wardrobe: userId}).fetch();

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

  let matchingUsersQuery = matchingUsers.push(userId);

  return [
    Meteor.users.find({_id: userId}),
    Shirts.find({wardrobe: {$in: matchingUsers}})
  ];
});
