Meteor.startup = function() {
  Meteor.atuorun = function() {
    landen = _(Landen.find().fetch()).pluck("naam");
  }
};

Template.wijnapp.events({
  'blur input#search-query' : function(event) {
    Session.set("search_query", $("#search-query").val());
  },
  'click button.search': function() {
    Session.set("search_query", $("#search-query").val());
  },
  'click i.icon-remove-sign': function() {
    Session.set("search_query", "");
  }
})


Template.wijnapp.wijnen = Template.wijnenTable.wijnen = function () {
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

Template.wijnapp.search_query = function() {
  return Session.get("search_query");
}

Template.wijnapp.selected_wijn = function () {
  return Session.get("selected_wijn");
};

Template.wijnapp.viewed_wijn = function () {
  return Session.get("viewed_wijn");
};  

Template.wijnapp.show_placeholder = function() {
  return (Session.get("selected_wijn") + Session.get("viewed_wijn")).length <= 0;
};