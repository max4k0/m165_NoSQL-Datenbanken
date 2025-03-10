````
use KN03;


print("Alle Benutzer:");
db.benutzer.find().forEach(user => printjson(user));

print("Os nach dem 01. Jan. 2024 aktualisiert:");
db.windows_betriebssystem.find({ Last_Update: { $gt: ISODate("2024-01-01T00:00:00Z") } }).forEach(os => printjson(os));

print("PC-Komponenten mit Kategorie 'Elektronik' oder Preis über 1000:");
db.pc_komponenten.find({ 
    $or: [{ Kategorie: "Elektronik" }, { Preis: { $gt: 1000 } }] 
}).forEach(pc => printjson(pc));

print("Benutzer mit Alter über 25 und ner Gmail-Adresse:");
db.benutzer.find({ 
    age: { $gt: 25 }, 
    email: /@gmail\.com$/
}).forEach(user => printjson(user));

print("Programme, die mit 'Vis' beginnen:");
db.programme.find({ Name: /^Vis/ }).forEach(program => printjson(program));

print("Benutzer mit Projektion (Name & _id):");
db.benutzer.find({}, { BenutzerName: 1, _id: 1 }).forEach(user => printjson(user));

print("Programme mit Projektion (Name & Version, ohne _id):");
db.programme.find({}, { Name: 1, Version: 1, _id: 0 }).forEach(program => printjson(program));

