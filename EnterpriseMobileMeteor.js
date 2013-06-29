Wijnen = new Meteor.Collection("wijnen");

Wijnen.deny({
  update: function (userId, docs, fields, modifier) {
    return !userId
  }
});

Landen = new Meteor.Collection("landen");
landen = {};

if (Meteor.isClient) {
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
  
  Template.wijnapp.wijnen = function () {
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
  
  Template.edit_wijn.events({
    'click button.save' : function() {
      Wijnen.update( {_id: Session.get("selected_wijn") }, { $set: {
        naam: $("#naam").val(),
        appellatie: $('#appellatie').val(),
        streek: $('#streek').val(),
        land: $('#land').val(),
        druif: $('#druif').val(),
        kleur: $('#kleur').val(),
        soort: $('#soort').val()
      } } );
    },
    'click button.cancel' : function() {
      Session.set("selected_wijn", '');
    }
  });

  Template.edit_wijn.selected_wijn = function () {
    return new Wijn(Wijnen.findOne(Session.get("selected_wijn")));
  };
  Template.edit_wijn.rendered = function () {
    return $('#land').typeahead({
      source: function() {return _(Landen.find().fetch()).pluck("naam")}
    }) 
  };
  
  Template.edit_wijn.selected = function(foo, bar) {
    return foo == bar ? 'selected' : '';
  };
  
  Template.wijn.selected = function () {
    return Session.equals("selected_wijn", this._id) || Session.equals("viewed_wijn", this._id) ? "selected" : '';
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
      Session.set("viewed_wijn", '');
      stopPropagation();
    },
    'click': function() {
      Session.set("viewed_wijn", this._id);
      Session.set("selected_wijn", '');      
    }
  });
  
  Template.wijn_details.viewed_wijn = function() {
    return new Wijn(Wijnen.findOne(Session.get("viewed_wijn")));  
  }
  

}
