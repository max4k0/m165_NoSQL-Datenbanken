````




db = db.getSiblingDB("KN03");


db.pc_komponenten.drop();
db.windows_betriebssystem.drop();
db.programme.drop();

const userId1 = ObjectId();
const userId2 = ObjectId();
const userId3 = ObjectId();
const userId4 = ObjectId();



const pcId1 = ObjectId();
const pcId2 = ObjectId();
const pcId3 = ObjectId();
const pcId4 = ObjectId();

db.pc_komponenten.insertMany([
    {
        _id: pcId1,
        System_Model: "Alienware M17 R5",
        CPU: "AMD Ryzen 9 6900HX",
        RAM: 32,
        Datenträger: "2TB SSD",
        Grafikkarte: "AMD Radeon RX 6850M XT",
        Netzwerkkarte: "Killer Wi-Fi 6E AX1675",
        Mainboard: "Alienware Custom Board",
        Netzteil: "240W Adapter",
        Gehäuse: "Metall & Kunststoff",
        Gekauft_am: ISODate("2022-11-10T00:00:00Z"),
        Win_Version: ["Windows 10", "Windows 11", "Ubuntu 22.04"]
    },
    {
        _id: pcId2,
        System_Model: "Lenovo ThinkPad X1",
        CPU: "Intel Core i7-1260P",
        RAM: 16,
        Datenträger: "1TB SSD",
        Grafikkarte: "Intel Iris Xe",
        Netzwerkkarte: "Intel AX211",
        Mainboard: "Lenovo ThinkPad Custom",
        Netzteil: "65W USB-C",
        Gehäuse: "Carbon Fiber",
        Gekauft_am: ISODate("2023-06-15T00:00:00Z"),
        Win_Version: ["Windows 11", "Ubuntu 20.04"]
    },
    {
        _id: pcId3,
        System_Model: "HP EliteBook 850 G8",
        CPU: "Intel Core i7-1185G7",
        RAM: 16,
        Datenträger: "512GB SSD",
        Grafikkarte: "Intel Iris Xe",
        Netzwerkkarte: "Wi-Fi 6",
        Mainboard: "HP Custom Board",
        Netzteil: "65W USB-C",
        Gehäuse: "Aluminium",
        Gekauft_am: ISODate("2023-03-20T00:00:00Z"),
        Win_Version: ["Windows 10", "Windows 11"]
    },
    {
        _id: pcId4,
        System_Model: "Asus ROG Strix G17",
        CPU: "AMD Ryzen 7 5800H",
        RAM: 32,
        Datenträger: "1TB SSD",
        Grafikkarte: "NVIDIA RTX 3070",
        Netzwerkkarte: "Wi-Fi 6E",
        Mainboard: "Asus Custom Board",
        Netzteil: "280W Adapter",
        Gehäuse: "Kunststoff & Metall",
        Gekauft_am: ISODate("2023-09-10T00:00:00Z"),
        Win_Version: ["Windows 11"]
    }
]);
print("Komponenten hinzugefügt.\n");

const windowsId1 = ObjectId();
const windowsId2 = ObjectId();
const windowsId3 = ObjectId();
const windowsId4 = ObjectId();

db.windows_betriebssystem.insertMany([
    {
        _id: windowsId1,
        ComputerName: "Alienware-17R5",
        Build_Version: "22H2",
        Art: "Pro",
        Architektur: "64-bit",
        Last_Update: new Date(),
        Benutzer: [
        {
    _id: userId1,
    BenutzerName: "Tom",
    Passwort: "pass123",
    Rolle: "Admin",
    Letzter_Login: new Date()
    }
        ]
    },
    {
        _id: windowsId2,
        ComputerName: "ThinkPad-X1",
        Build_Version: "23H1",
        Art: "Enterprise",
        Architektur: "64-bit",
        Last_Update: new Date(),
        Benutzer: [
    {
        _id: userId2,
        BenutzerName: "Anna",
        Passwort: "pass456",
        Rolle: "User",
        Letzter_Login: new Date()
    }
        ]
    },
    {
        _id: windowsId3,
        ComputerName: "HP-EliteBook-850",
        Build_Version: "21H2",
        Art: "Enterprise",
        Architektur: "64-bit",
        Last_Update: new Date(),
        Benutzer: [
    {
        _id: userId3,
        BenutzerName: "Felix",
        Passwort: "pass789",
        Rolle: "User",
        Letzter_Login: new Date()
    },
        ]
    },
    {
        _id: windowsId4,
        ComputerName: "ROG-Strix-G17",
        Build_Version: "23H2",
        Art: "Home",
        Architektur: "64-bit",
        Last_Update: new Date(),
        Benutzer: [
    {
        _id: userId4,
        BenutzerName: "Laura",
        Passwort: "pass101",
        Rolle: "Guest",
        Letzter_Login: new Date()
    }
        ]
    }
]);
print("betriebssysteme hinzugefügt.\n");

const progId1 = ObjectId();
const progId2 = ObjectId();
const progId3 = ObjectId();
const progId4 = ObjectId();

db.programme.insertMany([
    {
        _id: progId1,
        Name: "Visual Studio Code",
        Hersteller: "Microsoft",
        Version: "1.75.0",
        Kompatibilität: "Windows 10/11",
        Beschreibung: "Code Editor für Entwickler",
        Rechte: "Admin",
        Installiert_am: ISODate("2024-02-15T00:00:00Z"),
        Benutzer: [userId3, userId4]
    },
    {
        _id: progId2,
        Name: "Google Chrome",
        Hersteller: "Google",
        Version: "120.0",
        Kompatibilität: "Windows 10/11",
        Beschreibung: "Webbrowser",
        Rechte: "User",
        Installiert_am: ISODate("2024-01-10T00:00:00Z"),
        Benutzer: [userId2, userId4]
    },
    {
        _id: progId3,
        Name: "Adobe Photoshop",
        Hersteller: "Adobe",
        Version: "25.0",
        Kompatibilität: "Windows 10/11",
        Beschreibung: "Bildbearbeitungssoftware",
        Rechte: "Pro User",
        Installiert_am: ISODate("2023-12-05T00:00:00Z"),
        Benutzer: [userId1, userId3]
    },
    {
        _id: progId4,
        Name: "Slack",
        Hersteller: "Slack Technologies",
        Version: "5.0",
        Kompatibilität: "Windows/Linux",
        Beschreibung: "Team-Kommunikationsplattform",
        Rechte: "User",
        Installiert_am: ISODate("2024-03-01T00:00:00Z"),
        Benutzer: [userId1, userId2]
    }
]);


