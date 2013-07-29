
Template.wijnen.wijnen = function () {
  return Wijnen.find();
};

Template.wijn.selected = function () {
  return Session.equals("selected_wijn", this._id) ? "selected" : '';
};

Template.wijn.landcode = function(landNaam) {
  land = Landen.findOne({naam: landNaam});
  if (land) {
    return land.code.toLowerCase();
  } else {
    return ""
  }
}

Template.wijn.events({
  'click i.icon-edit': function () {
    Session.set("selected_wijn", this._id);
    Meteor.Router.to('/wijn');
    stopPropagation();
  },
  'click': function() {
    Session.set("selected_wijn", this._id);
    Meteor.Router.to('/wijn');
  }
});