Wijnen = new Meteor.Collection("wijnen");
Landen = new Meteor.Collection("landen");
landen = {};

function wijn(naam, appellatie, streek, land, druif, kleur, soort) {
  this.naam = naam;
  this.appellatie = appellatie;
  this.streek = streek;
  this.land = land;
  this.druif = druif;
  this.kleur = kleur;
  this.soort = soort;
}

if (Meteor.isClient) {
  Meteor.startup = function() {
    Meteor.atuorun = function() {
      landen = _(Landen.find().fetch()).pluck("naam");
      console.log(landen);
    }
  };
  
  Template.wijnapp.wijnen = function () {
    return Wijnen.find({}, {sort: {naam: 1}});
  };

  Template.wijnapp.selected_wijn = function () {
    var wijn = Wijnen.findOne(Session.get("selected_wijn"));
    return wijn;
  };
  
  Template.edit_wijn.events({
    'click input.save' : function() {
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
    'click input.cancel' : function() {
      Session.set("selected_wijn", '');
    }
  });

  Template.edit_wijn.selected_wijn = function () {
    return Wijnen.findOne(Session.get("selected_wijn"));
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
