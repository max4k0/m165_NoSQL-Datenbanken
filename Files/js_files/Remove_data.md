````


//drop_all_collections


db = db.getSiblingDB("KN03");


if (db.getCollectionNames().indexOf("benutzer") !== -1) { //existiert?
    db.benutzer.drop();

}
if (db.getCollectionNames().indexOf("pc_komponenten") !== -1) {
    db.pc_komponenten.drop();

}
if (db.getCollectionNames().indexOf("windows_betriebssystem") !== -1) {
    db.windows_betriebssystem.drop();

}
if (db.getCollectionNames().indexOf("programme") !== -1) {
    db.programme.drop();

}
print("Alle Collection sind jetzt gelöscht.");




//delete_entries


var benutzerDoc = db.benutzer.findOne();
if (benutzerDoc) {
    var result = db.benutzer.deleteOne({ _id: benutzerDoc._id });
    
} else {
    print("kein benutzer konnte gelöscht werden");
}

var docs = db.programme.find().limit(3).toArray();


if (docs.length >= 2) {
    var ids = [docs[0]._id, docs[1]._id];
    var result = db.programme.deleteMany({
        $or: [
        { _id:ids[0] }, { _id:ids[1] }
        
        ]
        
        
        
    });
    print("Gelöschte Dokumente: " + result.deletedCount);
    print("Gelöschte _ids: " + JSON.stringify(ids));
} else {
    print("Nicht genügend Dokumente in 'programme' gefunden.");
}

