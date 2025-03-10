````
use KN03;





const userIdToDelete = ObjectId("65e01f7f456d7a6b5c3a1d23");
const userResult = db.benutzer.deleteOne({ _id: userIdToDelete });

if (userResult.deletedCount > 0) {
    print("Benutzer wurde gelöscht.");
} else {
    print("Kein Benutzer mit dieser ID.");
}


const programId1 = ObjectId("65e01f8a456d7a6b5c3a1d24");
const programId2 = ObjectId("65e01f8b456d7a6b5c3a1d25");

const programResult = db.programme.deleteMany({
    _id: { $in: [programId1, programId2] }
});

if (programResult.deletedCount > 0) {
    print(programResult.deletedCount + " gelöscht.");
} else {
    print("Programme nicht gefunden.");
}


const computerNameToDelete = "DELL-XPS-15";
const osResult = db.windows_betriebssystem.deleteOne({ ComputerName: computerNameToDelete });

if (osResult.deletedCount > 0) {
    print("Betriebssystem gelöscht.");
} else {
    print("Kein Betriebssystem mit diesem Namen gefunden.");
}


const systemModelToDelete = "Dell-XPS-15";
const pcResult = db.pc_komponenten.deleteOne({ _id: systemModelToDelete });

if (pcResult.deletedCount > 0) {
    print("PC komponente wurde gelöscht.");
} else {
    print("Keine PC komponente mit diesem Modell gefunden.");
}
