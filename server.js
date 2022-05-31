console.log('May Node be with you')

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(`mongodb+srv://cheesefeet:stinkych33se!@cluster0.7sqxr.mongodb.net/?retryWrites=true&w=majority`)
.then(client => {
    console.log('Connected to Database')
    const db = client.db('quotes')
    const quotesCollection = db.collection('quotes')

    app.set('view engine', 'ejs')
    
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(express.static('public'))

    app.use(bodyParser.json())

    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
        .then (results => {
            res.render('index.ejs', {cats: results })
            // console.log(results)
        })
        .catch(error => console.error(error))
        
    })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
        res.redirect('/')
    })
        .catch(error => console.error(error))
    })

    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
            { type: 'cat' },
            {
            $set: {
                name: req.body.name,
                type: req.body.type,
            }
            },
            {
            upsert: true
            }
        )
        .then(result => {
            res.json('Success')
        })
        .catch(error => console.error(error))
    })

   
    app.delete('/quotes', (req, res) => {
            quotesCollection.deleteOne(
            { type: req.body.type }
            )
            .then(result => {
                if (result.deletedCount === 0) {
                return res.json('No tiger to delete')
                }
                res.json(`Deleted tigers`)
            })
            .catch(error => console.error(error))
        })
   

    app.listen(3000, function(){
        console.log('listening on 3000')
    })

})
    .catch(error => console.error(error))

