Wijnen = new Meteor.Collection("wijnen");

Wijnen.allow({
  update: function (userId, docs, fields, modifier) {
    console.log(userId)
    return userId
  }
});

Landen = new Meteor.Collection("landen");
landen = {};