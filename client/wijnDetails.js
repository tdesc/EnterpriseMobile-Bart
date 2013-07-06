Template.wijn_details.viewed_wijn = function() {
  return new Wijn(Wijnen.findOne(Session.get("viewed_wijn")));  
}
