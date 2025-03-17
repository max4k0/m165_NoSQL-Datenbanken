````


use KN03;

let benutzerId = ObjectId();
db.benutzer.insertOne({
    _id: benutzerId,
    BenutzerName: "Max",
    Passwort: "securepass123",
    Rolle: "Admin",
    Letzter_Login: new Date(),
    email: "max@gmail.com"
});
print("Benutzer eingefügt.");


let pcKomponenteId = ObjectId();
db.pc_komponenten.insertOne({
    _id: pcKomponenteId,
    CPU: "Intel Core i7-12700H",
    RAM: 16,
    Datenträger: "1TB SSD",
    Grafikkarte: "NVIDIA RTX 3060",
    Netzwerkkarte: "Intel AX201",
    Mainboard: "Dell Custom Board",
    Netzteil: "90W Adapter",
    Gehäuse: "Aluminium",
    Gekauft_am: ISODate("2023-05-12T00:00:00Z"),
    Win_Version: ["Windows 10", "Windows 11"]
});


//benutzer
let computerId = ObjectId();
db.windows_betriebssystem.insertOne({
    _id: computerId,
    ComputerName: "DELL-XPS-15",
    Build_Version: "22H2",
    Art: "Pro",
    Architektur: "64-bit",
    Last_Update: new Date(),
    Benutzer: [{
       _id: benutzerId,
       BenutzerName: "Max",
       Rolle: "Admin",
       Letzter_Login: new Date(),
       email: "max@gmail.com"
    }]
});

let programIds = [ObjectId(), ObjectId()];
db.programme.insertMany([
    {
        _id: programIds[0],
        Name: "Visual Studio Code",
        Hersteller: "Microsoft",
        Version: "1.75.0",
        Kompatibilität: "Windows 10/11",
        Beschreibung: "Code Editor für Entwickler",
        Rechte: "Admin",
        Installiert_am: ISODate("2024-02-15T00:00:00Z"),
        BenutzerID: [benutzerId]
    },
    {
        _id: programIds[1],
        Name: "Google Chrome",
        Hersteller: "Google",
        Version: "120.0",
        Kompatibilität: "Windows 10/11",
        Beschreibung: "Webbrowser",
        Rechte: "User",
        Installiert_am: ISODate("2024-01-10T00:00:00Z"),
        BenutzerID: [benutzerId]
    }
]);
print("Programme eingefügt.");



//update
db.benutzer.updateOne(
    { _id: benutzerId },
    { $set: { email: "max.new@gmail.com" } }
);


//update
db.programme.updateMany(
    { Hersteller: "Microsoft" },
    { $set: { Version: "1.80.0" } }
);


//update
db.pc_komponenten.replaceOne(
    { _id: pcKomponenteId },
    {
        _id: pcKomponenteId,
        CPU: "Intel Core i7-12700H",
        RAM: 16,
        Datenträger: "1TB SSD",
        Grafikkarte: "NVIDIA RTX 4080", //neue GPU
        Netzwerkkarte: "Intel AX201",
        Mainboard: "Dell Custom Board",
        Netzteil: "90W Adapter",
        Gehäuse: "Aluminium",
        Gekauft_am: ISODate("2023-05-12T00:00:00Z"),
        Win_Version: ["Windows 10", "Windows 11"]
    }
);


//replace
db.windows_betriebssystem.replaceOne(
    { _id: computerId },
    {
        _id: computerId,
        ComputerName: "DELL-XPS-15",
        Build_Version: "23H1",
        Art: "Pro",
        Architektur: "64-bit",
        Last_Update: new Date(),
        Benutzer: [{
           _id: benutzerId,
           BenutzerName: "Max",
           Rolle: "Admin",
           Letzter_Login: new Date(),
           email: "maxnew@gmail.com"
        }]
    }
);

