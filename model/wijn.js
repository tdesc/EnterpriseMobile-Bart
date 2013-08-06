/**
 * Wijn constructor
 */
Wijn = function (object) {
  _.extend(this, object)
}

/**
 * Wijn class definition
 */
_.extend(Wijn.prototype, {
  toString: function() {
      return "Wijn {naam: "+this.naam + ", land:" + this.land + "}";
  }
});

/**
 * Wijnen collection
 */
Wijnen = new Meteor.Collection("wijnen", {
  transform: function(doc) {
    return new Wijn(doc); 
  }
});

Wijnen.allow({
  update: function (userId, docs, fields, modifier) {
    return userId
  }
});

if (Meteor.isServer) {
  Meteor.publish("wijnen", function(query) {
    if (!query) {
      return Wijnen.find({naam: {$exists: true, $ne: null, $ne: ""}}, {sort: {naam: 1}, limit: 10});
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
