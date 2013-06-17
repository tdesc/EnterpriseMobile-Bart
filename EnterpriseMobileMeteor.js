Wijnen = new Meteor.Collection("wijnen");
Landen = new Meteor.Collection("landen");
landen = {};

if (Meteor.isClient) {
  Meteor.startup = function() {
    Meteor.atuorun = function() {
      landen = _(Landen.find().fetch()).pluck("naam");
      console.log(landen);
    }
  };
  
  Template.wijnapp.events({
    'click button.search': function() {
      Session.set("search_query", $(".search-query").val());
    }
  })
  
  Template.wijnapp.wijnen = function () {
    query = Session.get("search_query");
    if (!query) {
      return Wijnen.find({}, {sort: {naam: 1}});
    } else {
      //return Wijnen.find({naam: {$regex: query}}, {sort: {naam: 1}});
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

  Template.wijnapp.selected_wijn = function () {
    var wijn = new Wijn(Wijnen.findOne(Session.get("selected_wijn")));
    return wijn;
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
    return Session.equals("selected_wijn", this._id) ? "selected" : '';
  };
  
  Template.wijn.landcode = function(landNaam) {
    land = Landen.findOne({naam: landNaam});
    if (land) {
      return land.code
    } else {
      return ""
    }
  }

  Template.wijn.events({
    'click': function () {
      Session.set("selected_wijn", this._id);
    }
  });
  

}
