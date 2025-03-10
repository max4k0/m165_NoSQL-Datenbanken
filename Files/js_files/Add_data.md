````


db = db.getSiblingDB("KN03");

db.pc_komponenten.insertOne({
    _id: "Dell-XPS-15",
    CPU: "Intel Core i7-12700H",
    RAM: 16,
    Datenträger: "1TB SSD",
    Grafikkarte: "NVIDIA RTX 3080",
    Netzwerkkarte: "Intel AX201",
    Mainboard: "Dell Custom Board",
    Netzteil: "90W Adapter",
    Gehäuse: "Aluminium",
    Gekauft_am: ISODate("2023-05-12T00:00:00Z"),
    Win_Version: ["Windows 10", "Windows 11"]
});
print("PC-Komponenten hinzugefügt");


const userId1 = ObjectId();
const userId2 = ObjectId();
const userId3 = ObjectId();

db.benutzer.insertMany([
    { _id: userId1, BenutzerName: "Tom", Passwort: "pass123", Rolle: "Admin", Letzter_Login: new Date() },
    { _id: userId2, BenutzerName: "Toom", Passwort: "pass456", Rolle: "User", Letzter_Login: new Date() },
    { _id: userId3, BenutzerName: "Tooom", Passwort: "pass789", Rolle: "Guest", Letzter_Login: new Date() }
]);
print("Benutzer hinzugefügt");




db.windows_betriebssystem.insertOne({
    _id: "DELL-XPS-15",
    ComputerName: "DELL-XPS-15",
    Build_Version: "22H2",
    Art: "Pro",
    Architektur: "64-bit",
    Last_Update: new Date(),
    Benutzer: [userId1, userId2, userId3] // Benutzer-Referenzen
});
print("Windows Betriebssystem hinzugefügt");



const programId1 = ObjectId();
const programId2 = ObjectId();

db.programme.insertMany([
    {
        _id: programId1,
        Name: "Visual Studio",
        Hersteller: "Microsoft",
        Version: "1.75.0",
        Kompatibilität: "Windows 10/11",
        Beschreibung: "Code Editor für Entwickler",
        Rechte: "Admin",
        Installiert_am: ISODate("2024-02-15T00:00:00Z"),
        BenutzerID: [userId1, userId2]
    },
    {
        _id: programId2,
        Name: "Google Chrome",
        Hersteller: "Google",
        Version: "120.0",
        Kompatibilität: "Windows 10/11",
        Beschreibung: "Webbrowser",
        Rechte: "User",
        Installiert_am: ISODate("2024-01-10T00:00:00Z"),
        BenutzerID: [userId1, userId3]
    }
]);
print("Programme hinzugefügt");

