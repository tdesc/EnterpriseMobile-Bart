Template.wijn_details.events({
  'click i.icon-edit': function () {
    Meteor.Router.to('/bewerkWijn');
  },
  'click button' : function() {
    Meteor.Router.to('/wijnen');
  }
});

Template.wijn_details.selected_wijn = function() {
  return new Wijn(Wijnen.findOne(Session.get("selected_wijn")));  
}
