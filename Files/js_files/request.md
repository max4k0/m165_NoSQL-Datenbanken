````


use KN03;


print("Alle Benutzer:");
db.benutzer.find().forEach(user => printjson(user));


print("Os nach dem 01.Jan.2024 aktualisiert:");
db.windows_betriebssystem.find({ Last_Update: { $gt: ISODate("2024-01-01T00:00:00Z") } })
  .forEach(os => printjson(os));


print("PC-Komponenten, die 'Alienware' im System_Model enthalten:");
db.pc_komponenten.find({ System_Model: /Alienware/ })
  .forEach(pc => printjson(pc));


print("Benutzer mit Rolle Admin:");
db.benutzer.find({ Rolle: "Admin" })
  .forEach(user => printjson(user));


print("Programme, die mit 'Vis' beginnen (Regex):");
db.programme.find({ Name: /^Vis/ })
  .forEach(program => printjson(program));


print("Benutzer mit Projektion (BenutzerName & _id):");
db.benutzer.find({}, { BenutzerName: 1, _id: 1 })
  .forEach(user => printjson(user));

print("Programme mit Projektion (Name & Version, ohne _id):");
db.programme.find({}, { Name: 1, Version: 1, _id: 0 })
  .forEach(program => printjson(program));


print("'1.0' oder 'Vis':");
db.programme.find({
  $or: [
    { Version: "1.0" },
    { Name: /^Vis/ }
  ]
}).forEach(program => printjson(program));


print("Benutzer die älter als 25 und active sind:");
db.benutzer.find({
  $and: [
    { Alter: { $gt: 25 } },
    { Status: "active" }
  ]
}).forEach(user => printjson(user));
