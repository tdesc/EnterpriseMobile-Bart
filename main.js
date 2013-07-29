//Wijnen
Wijnen = new Meteor.Collection("wijnen");

Wijnen.allow({
  update: function (userId, docs, fields, modifier) {
    return userId
  }
});

if (Meteor.isServer) {
  Meteor.publish("wijnen", function(query) {
    if (!query) {
      return Wijnen.find({}, {sort: {naam: 1}, limit: 10});
    } else {
      return Wijnen.find({ $or: [
         {naam: {$regex: query}},
         {appellatie: {$regex: query}}, 
         {streek: {$regex: query}}, 
         {land: {$regex: query}}, 
         {druif: {$regex: query}}, 
         {soort: {$regex: query}}
        ]}, {sort: {naam: 1}, limit: 10});
    }
  });
}

if (Meteor.isClient) {
  Deps.autorun(function() {
    Meteor.subscribe("wijnen", Template.wijnapp.search_query());
  });
}


// Smaaknotities
Smaaknotities = new Meteor.Collection("smaaknotities");

Smaaknotities.allow({
  update: function (userId, doc) {
    return userId && doc.user_id === userId;
  },
  insert: function(userId, doc) {
    return userId
  }
})

if (Meteor.isServer) {
  Meteor.publish("smaaknotities", function(wijnId) {
    result = Smaaknotities.find({wijn_id: wijnId});
    return result;
  })
}

if (Meteor.isClient) {
  Deps.autorun(function() {
    Meteor.subscribe("smaaknotities", Session.get("selected_wijn"))
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