let mongoose = require('mongoose')
let mongoDB = 'mongodb://localhost/buyitorsellit'
mongoose.connect(mongoDB)

mongoose.Promise = global.Promise

let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
let Schema = mongoose.Schema

let ItemSchema = new Schema({
    name: String,
    price: Number,
    sold: Boolean,
    description: String,
    imgUrl: String,
    likes: Number,
    location: String
})

let ItemsModel = mongoose.model('Items', ItemSchema)

ItemsModel.remove({}, function(err){
    if(err) console.log("error cleaning database")
    console.log("cleaning database")
    create()
})

function create(){
    ItemsModel.create({ name: "BMW", likes: 0, sold: false, price: 222, location: "New Jersey", description: "Runs Well", imgUrl: "https://media-cdn.tripadvisor.com/media/photo-s/0a/64/92/c1/bwm-welt.jpg"}, function(err, instance){
        if(err) console.log("error seeding 1")
        ItemsModel.create({ name: "Socks", likes:0, sold: false, price: 12, location: "Kentucky", description: "Warm socks ready for winter time. A small tear on the left", imgUrl: "https://i.ytimg.com/vi/6CIyYg1vqoI/hqdefault.jpg"}, function(err, instance){
            if(err) console.log("error seeding 2")
            ItemsModel.create({name: "XbOX", likes: 0,sold: false, price: 360, used: false, location: "California", description: "Halo 2 comes with it!!!", imgUrl: "https://d1alt1wkdk73qo.cloudfront.net/images/guide/c19c49f0ce59441e98949baea70bcb19/640x960.jpg"}, function(err, instance){
                if(err) console.log("error seeding 3")
                ItemsModel.find(function(err, name){
                    if(err) console.log("error persisting")
                    console.log("seeded database")
                    mongoose.connection.close()
                })
            })
        })
    })
}