````


db = db.getSiblingDB("KN03");

//collection
db.benutzer.remove({});
print("Benutzer entfernt.");
print("Benutzeranzahl: " + db.benutzer.find().count());

db.pc_komponenten.remove({});
print("PC-Komponenten entfernt.");
print("PC-Komponentenanzahl: " + db.pc_komponenten.find().count());


db.windows_betriebssystem.remove({});
print("Windows Betriebssysteme entfernt.");
print("Windows Betriebssystemanzahl: " + db.windows_betriebssystem.find().count());


db.programme.remove({});
print("Programme entfernt.");
print("Programmeanzahl: " + db.programme.find().count());

