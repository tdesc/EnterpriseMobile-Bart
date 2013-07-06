Template.wijnen.wijnen = function () {
  query = Template.wijnapp.search_query();
  if (!query) {
    return Wijnen.find({}, {sort: {naam: 1}});
  } else {
    return Wijnen.find({ $or: [
       {naam: {$regex: query}},
       {appellatie: {$regex: query}}, 
       {streek: {$regex: query}}, 
       {land: {$regex: query}}, 
       {druif: {$regex: query}}, 
       {soort: {$regex: query}}
      ]}, {sort: {naam: 1}});
  }
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