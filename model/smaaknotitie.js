Smaaknotitie = function (object) {
  if (object) {
    this.wijn_id = object.wijn_id;
    this.user_id = object.user_id;
    this.jaartal = object.jaartal;
    this.datum = object.datum;
    this.kleur = object.kleur;
    this.geur = object.geur;
    this.smaak = object.smaak;
    this.cijfer = object.cijfer;
  }
}



Smaaknotitie.prototype.toString = function() {
    return "Smaaknotitie {wijn_id: "+this.wijn_id + ", user_id: " + this.user_id + ", jaartal: "+ this.jaartal + "}";
}



