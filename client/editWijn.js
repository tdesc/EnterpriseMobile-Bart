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
    // do nothing
  },
  'click button' : function() {
    Meteor.Router.to('/wijn');
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