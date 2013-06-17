/*Wijn = function(naam, appellatie, streek, land, druif, kleur, soort) {
  this.naam = naam;
  this.appellatie = appellatie;
  this.streek = streek;
  this.land = land;
  this.druif = druif;
  this.kleur = kleur;
  this.soort = soort;
}*/

Wijn = function (object) {
  if (object) {
    this.naam = object.naam;
    this.appellatie = object.appellatie;
    this.streek = object.streek;
    this.land = object.land;
    this.druif = object.druif;
    this.kleur = object.kleur;
    this.soort = object.soort;
  }
}

Wijn.prototype.fromQueryResult = function (object) {
  if (object) {
    this.naam = object.naam;
    this.appellatie = object.appellatie;
    this.streek = object.streek;
    this.land = object.land;
    this.druif = object.druif;
    this.kleur = object.kleur;
    this.soort = object.soort;
  }
}

Wijn.prototype.toString = function() {
    return "Wijn {naam: "+this.naam + ", land:" + this.land + "}";
}



