Wijnen = new Meteor.Collection("wijnen");

Wijnen.allow({
  update: function (userId, docs, fields, modifier) {
    console.log(userId)
    return userId
  }
});

Smaaknotities = new Meteor.Collection("smaaknotities");

Landen = new Meteor.Collection("landen");
landen = {};

moment.lang('nl');