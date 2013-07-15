Template.wijn_details.events({
  'click i.editWijn': function () {
    Meteor.Router.to('/bewerkWijn');
  },
  'click i.editNotitie': function() {
    Session.set("notitie", this)
    console.log(this)
    Meteor.Router.to('/bewerkNotitie');
  },
  'click button.new' : function() {
    var n = new Smaaknotitie();
    n.init(Session.get("selected_wijn"));
    Session.set("notitie", n);
    Meteor.Router.to('/bewerkNotitie');
    stopPropagation();
  },
  'click button' : function() {
    Meteor.Router.to('/wijnen');
  }
});

Template.wijn_details.selected_wijn = function() {
  return new Wijn(Wijnen.findOne(Session.get("selected_wijn")));  
}

Template.wijn_details.notities = function() {
  return Smaaknotities.find({wijn_id: Session.get("selected_wijn")}).map(function(n){return new Smaaknotitie(n)});
}

Template.wijn_details.isUser = function(userId) {
  return userId != null && userId != '' && userId == Meteor.userId()
};