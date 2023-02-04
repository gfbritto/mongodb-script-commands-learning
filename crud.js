//FIND
db.sales.find({ "items.price": { $gt: 200 } })

db.sales.find()


db.transactions.find({
    transactions: {
        $elemMatch: {
            ammount: { $lte: 4500 }, transaction_code: "sell"
        }
    }
})

db.sales.find(
    {
        purchaseMethod: "Online",
        couponUsed: true,
        "customer.age": { $lte: 25 },
    }
)
db.sales.find({
    $or: [{
        "items.name": "pens"
    },
    { "items.tags": "writing" }
    ]
})

db.birds.findOne({
    common_name: "Robin Redbreast"
});
//UPDATE
db.birds.updateOne(
    { _id: ObjectId("6268413c613e55b82d7065d2") },
    { $set: { tags: ["geese", "herbivore", "migration"] } }
)

db.birds.findOne(
    { _id: ObjectId("6268471e613e55b82d7065d7") }
)

db.birds.updateOne(
    { _id: ObjectId("6268471e613e55b82d7065d7") },
    {
        $push: {
            diet: {
                $each: [
                    "newts", "opossum", "skunks", "squirrels"
                ]
            }
        }
    }
)

db.birds.updateOne(
    {
        common_name: "Robin Redbreast"
    },
    {
        $set: {
            last_updated: new Date()
        },
        $inc: { sightings: 1 },
    },
    {
        upsert: true
    }
)

db.products.updateOne(
    { sku: "abc123" },
    { $inc: { quantity: -2, "metrics.orders": 1 } }
)

db.birds.find(
    {
        common_name: 'Blue Jay'
    }
)

db.birds.findAndModify(
    {
        query: { common_name: 'Blue Jay' },
        update: {

            $inc: {
                sightings_count: 1
            }
        },
        new: true
    }
)

db.birds.UpdateMany(
    {
        common_name: {
            $in: [
                'Blue Jay', 'Grackle '
            ]
        }
    }
)

db.birds.updateMany(
    {
        common_name: {
            $in: [
                'Blue Jay', 'Grackle'
            ]
        }
    },
    {
        $set: {
            last_seen: ISODate("2022-01-01")
        }
    }
)

//DELETE
db.birds.deleteOne(
    { _id: ObjectId("62cddf53c1d62bc45439bebf") }
);

db.birds.deleteMany(
    { sightings_count: { $lte: 10 } }
)
//order and limit

db.sales.find({
    purchaseMethod: "Online",
    couponUsed: true
}).sort({ saleDate: -1 })

db.sales.find({
    storeLocation: "London",
    "items.name": {
        $in: [
            "laptop", "backpack", "printer paper"
        ]
    }
}).sort({ saleDate: -1 }).limit(3)

//projections

db.sales.find({ storeLocation: "Denver" }, { saleDate: 1, storeLocation: 1, purchaseMethod: 1 })

db.sales.find(
    {
        "customer.age": { $lte: 30 }, "customer.satisfaction": { $gt: 3 },
    },
    {
        "customer.age": 1, "customer.satisfaction": 1, _id: 0, "saleDate": 1,
    }
)

db.sales.find(
    {
        storeLocation: {
            $in: ["Seattle", "New York"]
        }
    },
    {
        purchaseMethod: 0, customer: 0, couponUsed: 0
    }
)

//counting query results

db.sales.countDocuments()

db.sales.countDocuments(
    {
        storeLocation: "Denver",
        couponUsed: true
    }
)