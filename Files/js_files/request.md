````

use KN03;

print("Alle Benutzer:");
db.benutzer.find().forEach(user => printjson(user));

print("Os nach dem 01.Jan.2024 aktualisiert:");
db.windows_betriebssystem.find({ Last_Update: { $gt: ISODate("2024-01-01T00:00:00Z") } }).forEach(os => printjson(os));

print("PC-Komponenten, die 'Alienware' im System_Model enthalten:");
db.pc_komponenten.find({ System_Model: /Alienware/ }).forEach(pc => printjson(pc));

print("benutzer mit rolle admin");
db.benutzer.find({ Rolle: "Admin" }).forEach(user => printjson(user));

print("programme, die mit vis beginnen:");
db.programme.find({ Name: /^Vis/ }).forEach(program => printjson(program));

print("benutzer mit projektion (BenutzerName & _id):");
db.benutzer.find({}, { BenutzerName: 1, _id: 1 }).forEach(user => printjson(user));

print("programme mit projektion (Name & Version, ohne _id):");
db.programme.find({}, { Name: 1, Version: 1, _id: 0 }).forEach(program => printjson(program));
