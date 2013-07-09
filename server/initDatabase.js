Meteor.startup(function () {
  if (Wijnen.find().count() === 0) {
    console.log("Oude smaaknotities weggooien")
    Smaaknotities.remove({})
    console.log("Wijnen toevoegen...")
    var wijnen = [
      new Wijn({naam:"Bodegas Dolor de Cabeza", appellatie:"Rueda D.O.", streek:"Rueda", land:"Spanje", druif:"Verdejo", kleur:"wit", soort:"Olé"}),
      new Wijn({naam:"Château Migraine", appellatie:"Appellation Gueule de Bois Controlée", streek:"Gueule de Bois", land:"Frankrijk", druif:"Chardonnay", kleur:"wit", soort:"Hoofdpijnwijn"}),
      new Wijn({naam:"De Hoofdpijnhoeve", appellatie:"Achterhoekse Oorsprong", streek:"Gelderland", land:"Nederland", druif:"Merlot", kleur:"rosé", soort:"Soort"}),
      new Wijn({naam:"Finca Migraña", appellatie:"San Rafael", streek:"Mendoza", land:"Argentinië", druif:"Bonarda", kleur:"rood", soort:"Lekker"}),
      new Wijn({naam:"Kaap die Houten Kop", appellatie:"Olifantshoek", streek:"Noordkaap", land:"Zuid-Afrika", druif:"Shiraz", kleur:"rood", soort:"Zwaar"}),
      new Wijn({naam:"Maux de Tête Villages", appellatie:"Appellation Henrique Strabique", streek:"Loucher", land:"Frankrijk", druif:"Merlot", kleur:"rood", soort:"De kater komt later"}),
      new Wijn({naam:"Hangover's Bin", appellatie:"Headache Hills", streek:"Headache Hills", land:"Australië", druif:"Pinot Noir", kleur:"rood", soort:"Heavy stuff"})];
    for (var i = 0; i < wijnen.length; i++) {
      console.log("   Toevoegen wijn " + i + " van " + wijnen.length);
      console.log(wijnen[i])
      var result = Wijnen.insert(wijnen[i]);
      console.log(result);
    }
  }
  
  if (Smaaknotities.find().count() === 0) {
    console.log("Smaaknotities toevoegen...")
    var aUserId = Meteor.users.findOne()._id;
    
    var smaaknotities = [
      new Smaaknotitie({jaartal: 2010, datum: new Date(), kleur:"donkerrood", geur:"WC-eend",smaak:"Pindakaas",cijfer:8}),
      new Smaaknotitie({jaartal: 2011, datum: new Date(), kleur:"lichtrood", geur:"WC-eend",smaak:"Lekker",cijfer:7}),
      new Smaaknotitie({jaartal: 2012, datum: new Date(), kleur:"geel", geur:"WC-eend",smaak:"Niet te hachelen",cijfer:6}),
      new Smaaknotitie({jaartal: 2013, datum: new Date(), kleur:"groen", geur:"WC-eend",smaak:"Koffie",cijfer:5})
    ]
    console.log("    max aantal smaaknotities per wijn: " + smaaknotities.length)
    
    console.log("    aantal wijnen: " + Wijnen.find().count())
    Wijnen.find().forEach(function(wijn){
      var aantal = Math.round(Math.random() * smaaknotities.length);
      console.log("    " + aantal + " smaaknotities voor wijn " + wijn.naam)
      for (var n = 0; n < aantal; n++) {
        console.log("        Smaaknotitie " + n + " van " + aantal)
        smaaknotities[n].user_id = aUserId;
        smaaknotities[n].wijn_id = wijn._id;
        Smaaknotities.insert(smaaknotities[n]);
      }
    });
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
