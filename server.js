let db = require('./db/database.js')
let fs = require('fs')
let port = process.env.PORT || 8080;
let express = require('express')
let app = express()

let findItemKeyById = (id) => {
    for(const key in items)
        if(items[key].id == id)
            return key
}
let serveItems = (res) => {
    db.ItemsModel.find({}).exec().then(foundItems => {
        res.json(foundItems)
    }).catch(err => {
        res.sendStatus(500)
    })
}

let serveItem = (res, itemId) => {
    db.ItemsModel.findById(itemId).exec().then(foundItem => {
        res.json(foundItem)
    }).catch(err => {
        res.sendStatus(500)
    })
}


app.use(express.json())
app.use(express.static(__dirname + '/client/build'));
app.use(function(req,res ,next){ 
    if(req.headers.accept === 'application/json')
        next() 
    else
        res.sendFile(__dirname + '/client/build/index.html')
})
app.get('/items/:id', function(req, res, next){
    serveItem(res, req.params.id)
})
app.get('/items', function(req,res,next){
    serveItems(res)
})
app.post('/items', function(req, res, next){
    let item = req.body.item
    delete item["_id"]
    db.ItemsModel.create(item, function(err, instance){
        if(err) console.log(err)
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify({success: "success"}))
    })
})
app.delete('/items/:id', function(req, res, next){
    db.ItemsModel.findById(req.params.id, function(err, instance){
        instance.remove()
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify({success: "success"}))
    })
})
app.put('/items/:id', function(req, res, next){
    if(req.body.sold === true){
        db.ItemsModel.findByIdAndUpdate(req.params.id, {sold: true}, function(err,instance){
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify({success: "success"}))    
        })
    }
    else if(req.body.liked === "yes"){
        db.ItemsModel.findById(req.params.id, function(err,instance){
            instance.likes += 1
            instance.save( function(err){
                res.writeHead(200, {"Content-Type": "application/json"})
                res.end(JSON.stringify({success: "success"}))    
            })
        })
    }
}) 

app.listen(port)