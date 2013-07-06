Template.wijn_details.events({
  'click i.icon-edit': function () {
    Meteor.Router.to('/bewerkWijn');
  }
});

Template.wijn_details.selected_wijn = function() {
  return new Wijn(Wijnen.findOne(Session.get("selected_wijn")));  
}
