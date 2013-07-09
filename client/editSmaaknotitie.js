Template.edit_smaaknotitie.events({
  'click button.save' : function() {
    var notitie = Template.edit_smaaknotitie.notitie();
    notitie.jaartal = $('#jaartal').val();
    notitie.kleur = $('#kleur').val();
    notitie.geur = $('#geur').val();
    notitie.smaak = $('#smaak').val();
    notitie.cijfer = parseInt($('#cijfer').val());
    Smaaknotities.insert(notitie);
  },
  'click button.cancel' : function() {
    // do nothing
  },
  'click button' : function() {
    Meteor.Router.to('/wijn');
  }
});

Template.edit_smaaknotitie.notitie = function () {
  return Session.get("notitie");
};

Template.edit_smaaknotitie.wijn = function() {
  return Wijnen.findOne(Session.get("selected_wijn"));
}