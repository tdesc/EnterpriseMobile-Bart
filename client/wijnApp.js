Meteor.startup = function() {
  Meteor.atuorun = function() {
    landen = _(Landen.find().fetch()).pluck("naam");
  }
};

Template.wijnapp.rendered = function() {
  $('form input').keydown(function(event){
     if(event.keyCode == 13) {
       $('form input').blur();
       event.preventDefault();
       return false;
     }
   });
 }

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

Template.wijnapp.pagina = function() {
  return Meteor.Router.page();
}

Template.wijnapp.showSearch = function() {
  return Meteor.Router.page() == "wijnen"
}

Template.wijnapp.search_query = function() {
  return Session.get("search_query");
}

Template.wijnapp.selected_wijn = function () {
  return Session.get("selected_wijn");
};

Template.wijnapp.show_placeholder = function() {
  return (Session.get("selected_wijn")).length <= 0;
};