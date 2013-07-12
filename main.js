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

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  });
  
  moment.lang('nl');
}
