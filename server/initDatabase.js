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
  
  if (Landen.find().count() === 0) {
    Landen.insert({naam: "Algerije", code: "DZ"});
    Landen.insert({naam: "Amerikaanse Maagdeneilanden", code: "VI"});
    Landen.insert({naam: "Amerikaans-Samoa", code: "AS"});
    Landen.insert({naam: "Argentinië", code: "AR"});
    Landen.insert({naam: "Australië", code: "AU"});
    Landen.insert({naam: "België", code: "BE"});
    Landen.insert({naam: "Bolivia", code: "BO"});
    Landen.insert({naam: "Brazilië", code: "BR"});
    Landen.insert({naam: "Bulgarije", code: "BG"});
    Landen.insert({naam: "Canada", code: "CA"});
    Landen.insert({naam: "Chili", code: "CL"});
    Landen.insert({naam: "China", code: "CN"});
    Landen.insert({naam: "Denemarken", code: "DK"});
    Landen.insert({naam: "Duitsland", code: "DE"});
    Landen.insert({naam: "Frankrijk", code: "FR"});
    Landen.insert({naam: "Georgië", code: "GE"});
    Landen.insert({naam: "Griekenland", code: "GR"});
    Landen.insert({naam: "Hongarije", code: "HU"});
    Landen.insert({naam: "Ierland", code: "IE"});
    Landen.insert({naam: "Indonesië", code: "ID"});
    Landen.insert({naam: "Israël", code: "IL"});
    Landen.insert({naam: "Italië", code: "IT"});
    Landen.insert({naam: "Japan", code: "JP"});
    Landen.insert({naam: "Kroatië", code: "HR"});
    Landen.insert({naam: "Libanon", code: "LB"});
    Landen.insert({naam: "Luxemburg", code: "LU"});
    Landen.insert({naam: "Macedonië", code: "MK"});
    Landen.insert({naam: "Mexico", code: "MX"});
    Landen.insert({naam: "Moldavië", code: "MD"});
    Landen.insert({naam: "Nederland", code: "NL"});
    Landen.insert({naam: "Nieuw-Zeeland", code: "NZ"});
    Landen.insert({naam: "Oekraïne", code: "UA"});
    Landen.insert({naam: "Oostenrijk", code: "AT"});
    Landen.insert({naam: "Portugal", code: "PT"});
    Landen.insert({naam: "Roemenië", code: "RO"});
    Landen.insert({naam: "Slovenië", code: "SI"});
    Landen.insert({naam: "Slowakije", code: "SK"});
    Landen.insert({naam: "Spanje", code: "ES"});
    Landen.insert({naam: "Thailand", code: "TH"});
    Landen.insert({naam: "Tunesië", code: "TN"});
    Landen.insert({naam: "Turkije", code: "TR"});
    Landen.insert({naam: "Uruguay", code: "UY"});
    Landen.insert({naam: "Zuid-Afrika", code: "ZA"});
    Landen.insert({naam: "Zwitserland", code: "CH"});

  }
});
