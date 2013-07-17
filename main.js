Wijnen = new Meteor.Collection("wijnen");

Wijnen.allow({
  update: function (userId, docs, fields, modifier) {
    return userId
  }
});

Smaaknotities = new Meteor.Collection("smaaknotities");

Smaaknotities.allow({
  update: function (userId, doc) {
    return userId && doc.user_id === userId;
  },
  insert: function(userId, doc) {
    return userId
  }
})

Landen = new Meteor.Collection("landen");
landen = {};

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  });
  
  moment.lang('nl');
}

Aromas = new Meteor.Collection("aromas");
