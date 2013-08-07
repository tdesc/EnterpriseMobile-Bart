if (Meteor.isServer) {
  Meteor.publish('users-by-selector', function(options) {
    return Meteor.users.find(options, {
      fields: {
        username: 1,
        profile: 1
      }
    });
  });
}

if (Meteor.isClient) {
  Meteor.autosubscribe(function() {
    return Meteor.subscribe('users-by-selector', {});
  });
}

// Landen
Landen = new Meteor.Collection("landen");
landen = {};

if (Meteor.isServer) {
  Meteor.publish("landen", function() {
    return Landen.find();
  })
}

if (Meteor.isClient) {
  Deps.autorun(function() {
    Meteor.subscribe("landen");
  });
}


// Aromas
Aromas = new Meteor.Collection("aromas");

if (Meteor.isServer) {
  Meteor.publish("aromas", function() {
    return Aromas.find();
  })
}

if (Meteor.isClient) {
  Deps.autorun(function() {
    Meteor.subscribe("aromas");
  });
}


// Client initialization
if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  });
  
  moment.lang('nl');
}