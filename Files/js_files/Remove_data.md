````
use KN03;

db.users.drop();
db.orders.drop();
db.products.drop();

print("Collections gelöscht.");


const userIdToDelete = ObjectId("65e01f7f456d7a6b5c3a1d23");
const userResult = db.users.deleteOne({ _id: userIdToDelete });

if (userResult.deletedCount > 0) {
    print("Benutzer gelöscht");
} else {
    print("Kein Benutzer mit der id");
}

const productId1 = ObjectId("65e01f8a456d7a6b5c3a1d24");
const productId2 = ObjectId("65e01f8b456d7a6b5c3a1d25");

const productResult = db.products.deleteMany({
    _id: { $in: [productId1, productId2] }
});

if (productResult.deletedCount > 0) {
    print(productResult.deletedCount + " Produkte gelöscht");
} else {
    print("Id gibts nicht");
}
