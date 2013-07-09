Template.wijn_details.events({
  'click i.icon-edit': function () {
    Meteor.Router.to('/bewerkWijn');
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