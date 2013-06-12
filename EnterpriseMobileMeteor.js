Wijnen = new Meteor.Collection("wijnen");

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
    var wijn = Wijnen.findOne(Session.get("selected_wijn"));
    return wijn;
  };
  
  Template.wijn.selected = function () {
    return Session.equals("selected_wijn", this._id) ? "selected" : '';
  };

  Template.wijn.events({
    'click': function () {
      Session.set("selected_wijn", this._id);
    }
  });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
     if (Wijnen.find().count() === 0) {
        var wijnen = [
          new wijn("Naam1", "Appelatie1", "Streek1", "Land1", "Druif1", "rood", "Soort1"),
          new wijn("Naam2", "Appelatie2", "Streek2", "Land2", "Druif2", "rood", "Soort2"),
          new wijn("Naam3", "Appelatie3", "Streek3", "Land3", "Druif3", "wit", "Soort3"),
          new wijn("Naam4", "Appelatie4", "Streek4", "Land4", "Druif4", "wit", "Soort4"),
          new wijn("Naam5", "Appelatie5", "Streek5", "Land5", "Druif5", "rosé", "Soort5")];
        for (var i = 0; i < wijnen.length; i++)
          Wijnen.insert({naam: wijnen[i].naam,
                         appellatie: wijnen[i].appellatie,
                         streek: wijnen[i].streek,
                         land: wijnen[i].land,
                         druif: wijnen[i].druif,
                         kleur: wijnen[i].kleur,
                         soort: wijnen[i].soort});
      }
    });

}
