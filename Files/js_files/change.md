````

use KN03;

//löschen
db.Benutzer.drop();
db.Produkte.drop();
db.Bestellungen.drop();


//neu einfügen


let benutzerId = ObjectId();

db.Benutzer.insertOne({
    _id: benutzerId,
    name: "Max",
    email: "max@gmail.com",
    alter: 18
});



let produktIds = [ObjectId(), ObjectId(), ObjectId()];

db.Produkte.insertMany([
    {
        _id: produktIds[0],
        name: "Laptop",
        preis: 1250,
        kategorie: "Elektronik"
    },
    {
        _id: produktIds[1],
        name: "Smartphone",
        preis: 800,
        kategorie: "Elektronik"
    },
    {
        _id: produktIds[2],
        name: "Kopfhörer",
        preis: 150,
        kategorie: "Audio"
    }
]);
print("Mehrere Produkte erneut eingefügt.");



let bestellungIds = [ObjectId(), ObjectId()];

db.Bestellungen.insertMany([
    {
        _id: bestellungIds[0],
        benutzerId: benutzerId,
        produktId: produktIds[0],
        menge: 1,
        status: "Versendet"
    },
    {
        _id: bestellungIds[1],
        benutzerId: benutzerId,
        produktId: produktIds[2],
        menge: 2,
        status: "In bearbeitung"
    }
]);
print("mehrere Dokumente erneut eingefügt.");



//benutzer neu laden
db.Benutzer.updateOne(
    { _id: benutzerId },
    { $set: { email: "max@gmail.com" } }
);
print("Benutzer aktualisiert mit updateOne");

//Artikel neu laden
db.Produkte.updateMany(
    { $or: [{ kategorie: "Elektronik" }, { name: "Kopfhörer" }] },
    { $set: { preis: 100 } }
);
print("mehrere produkte aktualisiert mit updateMany().");

//ersetzen
db.Bestellungen.replaceOne(
    { _id: bestellungIds[1] },
    {
        _id: bestellungIds[1],
        benutzerId: benutzerId,
        produktId: produktIds[1],//new
        menge: 1,  //Änderung
        status: "Abgeschlossen"
    }
);
print("Bestellung ersetzt mit replaceOne().");
