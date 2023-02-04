//Agregation 

// $match
db.sightings.aggregate([
    {
        $match: {
            species_common: "Eastern Bluebird"
        }
    }
])

// $group
db.sightings.aggregate([
    {
        $match: {
            species_common: "Eastern Bluebird"
        }
    },
    {
        $group: {
            _id: "$location.coordinates",
            totalBirds: { $count: {} }
        }
    }
])

db.sightings.aggregate([
    {
        $match: {
            species_common: 'Eastern Bluebird'
        }
    }, {
        $group: {
            _id: '$location.coordinates',
            number_of_sightings: { $count: {} }
        }
    }
])
//aggregation sort and limit
db.sightings.aggregate([
    {
        $sort: {
            "location.latitude": -1
        }
    },
    {
        $limit: 4
    }
])

//aggregation project
db.sightings.aggregate([
    {
        $project: {
            date: 1,
            species_common: 1,
            _id: 0
        }
    }
])

//aggregation $set
db.sightings.aggregate([
    {
        $set: {
            class: "Bird"
        }
    }
])