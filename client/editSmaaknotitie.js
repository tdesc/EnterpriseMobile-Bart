Template.edit_smaaknotitie.rendered = function() {
   // TODO: why is normal binding not working here?
   console.log(Session.get("notitie").geur)
   $('#geur').val(Session.get("notitie").geur)
   console.log($("#geur").val())
   $("#geur").select2({
     multiple: true,
     query: function(query) {
       var aromas = Aromas.find({aroma: {$regex: query.term}});
       var results = aromas.map(function(aroma){
         return {id: aroma.nummer, text: aroma.aroma}
       }); 
       query.callback({results: results});
     },
     initSelection: function(element, callback) {
       var data = [];
       _.each(element.val().split(","), function (nummer) {
         var aroma = Aromas.findOne({nummer: nummer})
         if (aroma != null) {
           data.push({id: nummer, text: aroma.aroma});
         }
       });
       callback(data);
     }
   });
}

Template.edit_smaaknotitie.events({
  'click button.save' : function() {
    var notitie = Template.edit_smaaknotitie.notitie();
    notitie.jaartal = $('#jaartal').val();
    notitie.kleur = $('#kleur').val();
    notitie.geur = $('#geur').val();
    notitie.smaak = $('#smaak').val();
    notitie.cijfer = parseInt($('#cijfer').val());
    console.log(notitie._id)
    if (notitie._id == null || notitie._id == '') {
      Smaaknotities.insert(notitie);
    } else {
      Smaaknotities.update({_id: notitie._id}, {$set : {
        jaartal: notitie.jaartal,
        kleur: notitie.kleur,
        geur: notitie.geur,
        smaak: notitie.smaak,
        cijfer: notitie.cijfer
      }});
    }
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