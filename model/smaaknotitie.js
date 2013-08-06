/**
 * Smaaknotitie constructor
 */ 
Smaaknotitie = function (object) {
  _.extend(this, object)
}

/**
 * Smaaknotitie class definition
 */
 _.extend(Smaaknotitie.prototype, {

    datumLeesbaar: function() {
      if (this.datum) {
        return moment(this.datum).calendar();
      } else {
        return ""
      }
    },

    proever: function() {
      if (Meteor.users.findOne({_id: this.user_id})) {
        return Meteor.users.findOne({_id: this.user_id}).username
      } else {
        return "";
      }
    },

    init: function(wijnId) {
      this.datum = new Date();
      this.user_id = Meteor.userId();
      this.wijn_id = wijnId;
    },

    toString: function() {
      return "Smaaknotitie {wijn_id: "+this.wijn_id + ", user_id: " + this.user_id + ", jaartal: "+ this.jaartal + "}";
    }

});

/**
 * Smaaknotities collection
 */
Smaaknotities = new Meteor.Collection("smaaknotities", {
  transform: function(doc) {
    return new Smaaknotitie(doc);
  }
});

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


