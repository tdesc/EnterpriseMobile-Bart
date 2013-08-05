Template.wijn_details.events({
  'click i.editWijn': function () {
    Meteor.Router.to('/bewerkWijn');
  },
  'click i.editNotitie': function() {
    Session.set("notitie", this)
    console.log(this)
    Meteor.Router.to('/bewerkNotitie');
  },
  'click button.new' : function(event) {
    var n = new Smaaknotitie();
    n.init(Session.get("selected_wijn"));
    Session.set("notitie", n);
    Meteor.Router.to('/bewerkNotitie');
  },
  'click button.cancel' : function() {
    Meteor.Router.to('/wijnen');
  }
});

Template.wijn_details.selected_wijn = function() {
  return new Wijn(Wijnen.findOne(Session.get("selected_wijn")));  
}

Template.wijn_details.aantal_notities = function() {
  return Smaaknotities.find({wijn_id: Session.get("selected_wijn")}).count();
}

Template.wijn_details.gemiddeld_cijfer = function() {
  var aantal = 0;
  var totaal = 0;
  Smaaknotities.find({wijn_id: Session.get("selected_wijn")}).forEach(function(notitie) {
    aantal = aantal + 1;
    totaal = totaal + notitie.cijfer;
  })
  return (totaal/aantal).toFixed(2);
}

Template.wijn_details.notities = function() {
  return Smaaknotities.find({wijn_id: Session.get("selected_wijn")}).map(function(n){return new Smaaknotitie(n)});
}

Template.notitie_regel.isUser = function(userId) {
  return userId != null && userId != '' && userId == Meteor.userId()
};

Template.notitie_regel.aromas = function() {
  var data = ""
  _.each(this.geur.split(","), function (nummer) {
    var aroma = Aromas.findOne({nummer: nummer})
    if (aroma != null) {
      data += aroma.aroma + ", ";
    }
  });
  return data.substring(0, data.length-2);
}