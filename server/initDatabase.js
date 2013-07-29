Meteor.startup(function () {
  if (Wijnen.find().count() === 0) {
    console.log("Oude smaaknotities weggooien")
    Smaaknotities.remove({})
    console.log("Wijnen toevoegen...")
    /*var wijnen = [
      new Wijn({naam:"Bodegas Dolor de Cabeza", appellatie:"Rueda D.O.", streek:"Rueda", land:"Spanje", druif:"Verdejo", kleur:"wit", soort:"Olé"}),
      new Wijn({naam:"Château Migraine", appellatie:"Appellation Gueule de Bois Controlée", streek:"Gueule de Bois", land:"Frankrijk", druif:"Chardonnay", kleur:"wit", soort:"Hoofdpijnwijn"}),
      new Wijn({naam:"De Hoofdpijnhoeve", appellatie:"Achterhoekse Oorsprong", streek:"Gelderland", land:"Nederland", druif:"Merlot", kleur:"rosé", soort:"Soort"}),
      new Wijn({naam:"Finca Migraña", appellatie:"San Rafael", streek:"Mendoza", land:"Argentinië", druif:"Bonarda", kleur:"rood", soort:"Lekker"}),
      new Wijn({naam:"Kaap die Houten Kop", appellatie:"Olifantshoek", streek:"Noordkaap", land:"Zuid-Afrika", druif:"Shiraz", kleur:"rood", soort:"Zwaar"}),
      new Wijn({naam:"Maux de Tête Villages", appellatie:"Appellation Henrique Strabique", streek:"Loucher", land:"Frankrijk", druif:"Merlot", kleur:"rood", soort:"De kater komt later"}),
      new Wijn({naam:"Hangover's Bin", appellatie:"Headache Hills", streek:"Headache Hills", land:"Australië", druif:"Pinot Noir", kleur:"rood", soort:"Heavy stuff"})];
      */
    var csvWijnen = Meteor.http.get("http://54.217.219.195/wijn4.csv");
    console.log(csvWijnen.headers);
    var wijnen = csvWijnen.content.split("\n");
    for (var i = 0; i < wijnen.length; i++) {
      console.log(wijnen[i]);
      var wijn = (wijnen[i].replace(/"/g,'').split(","));
      console.log(wijn);
      var result = Wijnen.insert({naam: wijn[4], appellatie: wijn[2], streek: wijn[1], land: wijn[0], druif: wijn[5], kleur: wijn[6], soort: wijn[7], classificatie: wijn[3]});
      console.log("   Wijn " + i + " van " + wijnen.length + " toegevoegd: " + result + ", " + wijn[4]);
    }
  }
  
  if (Smaaknotities.find().count() === 0 && false) {
    console.log("Smaaknotities toevoegen...")
    var aUserId;
    if (Meteor.users.find().count() > 0) {
      aUserId = Meteor.users.findOne({username: "Pim de Pauw"})._id;
      console.log("Found userId " + aUserId);
    } else {
      aUserId = Accounts.createUser({username: "Pim de Pauw", email: "bart+pim@kummelweb.nl", password: "nachtegaal"});
      console.log("Created userId " + aUserId);
    }
    
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
        console.log("        about to insert: " + smaaknotities[n])
        Smaaknotities.insert(smaaknotities[n]);
      }
    });
  }
  
  var aromas = [
    ["fruit witte wijn","citrus",1,"grapefruit"],
    ["fruit witte wijn","citrus",2,"citroen"],
    ["appel/melkzuur gisting","citrus",3,"limoen"],
    ["appel/melkzuur gisting","citrus",4,"mandarijn"],
    ["appel/melkzuur gisting","boomfruit",5,"peer"],
    ["appel/melkzuur gisting","boomfruit",6,"appel"],
    ["appel/melkzuur gisting","boomfruit",7,"groene appel"],
    ["appel/melkzuur gisting","boomfruit",8,"perzik"],
    ["appel/melkzuur gisting","tropisch fruit",9,"meloen"],
    ["appel/melkzuur gisting","tropisch fruit",10,"guave"],
    ["appel/melkzuur gisting","tropisch fruit",11,"ananas"],
    ["appel/melkzuur gisting","tropisch fruit",12,"passievrucht"],
    ["appel/melkzuur gisting","tropisch fruit",13,"lychee"],
    ["fruit rode wijn","rode bessen",14,"aalbes"],
    ["fruit rode wijn","rode bessen",15,"zwarte bes"],
    ["fruit rode wijn","rode bessen",16,"aardbei"],
    ["fruit rode wijn","rode bessen",17,"braam"],
    ["fruit rode wijn","boomfruit",18,"kers"],
    ["fruit rode wijn","boomfruit",19,"pruim"],
    ["bloemig","",20,"kamperfoelie"],
    ["bloemig","",21,"meidoorn"],
    ["bloemig","",22,"sinaasappelbloesem"],
    ["bloemig","",23,"linde"],
    ["bloemig","",24,"jasmijn"],
    ["bloemig","",25,"acacia"],
    ["bloemig","",26,"viooltjes"],
    ["bloemig","",27,"lavendel"],
    ["bloemig","",28,"roos"],
    ["plantaardig","groenten",29,"groene paprika"],
    ["plantaardig","groenten",30,"tomaat"],
    ["plantaardig","verse kruiden",31,"vers gemaaid gras"],
    ["plantaardig","verse kruiden",32,"dille"],
    ["plantaardig","verse kruiden",33,"thijm"],
    ["plantaardig","gedroogde kruiden",34,"munt"],
    ["plantaardig","gedroogde kruiden",35,"tabak"],
    ["plantaardig","gedroogde kruiden",36,"hooi"],
    ["plantaardig","bladeren",37,"blad zwarte bes"],
    ["plantaardig","bladeren",38,"eucalyptus"],
    ["mineraal","jonge witte wijn",39,"vuursteen"],
    ["mineraal","gerijpte witte wijn",40,"kerosine"],
    ["mineraal","gerijpte rode wijn",41,"teer"],
    ["gist","",42,"brood"],
    ["melkzuurgisting","",43,"boter"],
    ["melkzuurgisting","",44,"yoghurt"],
    ["gerijpt op vat","",45,"toast"],
    ["gerijpt op vat","",46,"koffie"],
    ["gerijpt op vat","",47,"gerookt"],
    ["gerijpt op vat","kruiden",48,"vanille"],
    ["gerijpt op vat","kruiden",49,"peper"],
    ["gerijpt op vat","kruiden",50,"kaneel"],
    ["gerijpt op vat","kruiden",51,"zoethout"],
    ["gerijpt op vat","kruiden",52,"nootmuskaat"],
    ["gerijpt op vat","kruiden",53,"kruidnagel"],
    ["gerijpt op vat","noten",54,"kokosnoot"],
    ["gerijpt op vat","noten",55,"hazelnoot"],
    ["gerijpt op vat","noten",56,"amandel"],
    ["gerijpt op vat","hout",57,"eiken"],
    ["gerijpt op vat","hout",58,"sandelhout"],
    ["gerijpt op vat","hout",59,"cederhout"],
    ["gerijpt op vat","hout",60,"dennenhout"],
    ["late oogst / schimmel","",61,"sinaasappelschil"],
    ["late oogst / schimmel","",62,"gedroogde abrikoos"],
    ["versterkte wijn","",63,"pruim"],
    ["gerijpte witte wijn","",64,"honing"],
    ["gerijpte rode wijn","",65,"chocolade"],
    ["plantaardig","dierlijke geuren",66,"muskus"],
    ["plantaardig","dierlijke geuren",67,"leer"],
    ["plantaardig","bosgeuren",68,"paddestoelen"],
    ["plantaardig","bosgeuren",69,"truffel"],
    ["plantaardig","bosgeuren",70,"mos"],
    ["fouten","kurk",71,"kurk"],
    ["fouten","geoxideerd",72,"sherry"],
    ["fouten","gemaderiseerd",73,"madeira"],
    ["fouten","vluchtige zuren",74,"azijn"],
    ["fouten","",75,"nagellakverwijderaar"],
    ["mineraal","zwavelgeuren",76,"rubber"],
    ["mineraal","zwavelgeuren",77,"rotte eieren"],
    ["mineraal","zwavelgeuren",78,"ui"],
    ["mineraal","zwavelgeuren",79,"suikermaïs"],
    ["mineraal","brett",80,"oud verband"]];
 
  function insertAroma(row) {
    var Aroma = {
      aroma: row[3],
      nummer: row[2],
      subcategorie: row[1],
      categorie: row[0]
    };
    console.log(row[3] + ", " + row[2] + ", " + row[1] + ", " + row[0] )
    Aromas.insert({aroma: row[3], nummer: row[2], subcategorie: row[1], categorie: row[0]});
  }
    
  if (Aromas.find().count() === 0) {
    console.log("Initializing Aromas collection...")
    _.each(aromas, insertAroma)
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
