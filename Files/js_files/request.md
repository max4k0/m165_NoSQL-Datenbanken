````
use KN03; 


print("Alle Users:");
db.users.find().pretty();


print("Bestellungen nach dem 01.jan.2024:");
db.orders.find({ date: { $gt: ISODate("2024-01-01T00:00:00Z") } }).pretty();

//oder
print("Produkte mit Kategorie 'Electronics' ODER Preis über 1000:");
db.products.find({ 
    $or: [{ category: "Electronics" }, { price: { $gt: 1000 } }] 
}).pretty();

//und
print("Users mit Alter über 25 UND Gmail-Adresse:");
db.users.find({ 
    $and: [{ age: { $gt: 25 } }, { email: /gmail/ }] 
}).pretty();

//regex
print("Bestellungen mit Produktname, der mit 'Lap' beginnt:");
db.orders.find({ product: /^Lap/ }).pretty();

//projektion mit _id
print("Users mit Projektion (Name & _id):");
db.users.find({}, { name: 1, _id: 1 }).pretty();

//projektion ohne _id
print("Produkte mit Projektion (Name & Preis, ohne _id):");
db.products.find({}, { name: 1, price: 1, _id: 0 }).pretty();
