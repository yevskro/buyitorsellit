let mongoose = require('mongoose')
let mongoDB = 'mongodb://127.0.0.1/buyitorsellit'

mongoose.connect(mongoDB)
mongoose.Promise = global.Promise

exports.Promise = mongoose.Promise
exports.db = mongoose.connection

let Schema = mongoose.Schema
let ItemSchema = new Schema({
    name: String,
    price: Number,
    sold: Boolean,
    description: String,
    imgUrl: String,
    location: String,
    likes: Number
})

exports.ItemsModel = mongoose.model('Items', ItemSchema)

/*
exports.ItemsModel.find({'location': 'New Jersey'}, 'name', function(err, Items){
    if(err)
        console.log("database error")
    console.log(Items)
})
*/