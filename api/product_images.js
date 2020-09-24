var express = require('express');
var router = express.Router();
const db = require('../db/db');
var multer = require('multer')

router.get('/', (req, res) => 
    db.product_images.findAll()
        .then(product_images => 
            res.json(product_images)
        )
);

router.get('/:product_id', (req, res) => {

    db.product_images.findOne({
        where: { product_id: req.params.product_id }
    })
    .then( data => {
        res.sendFile(__dirname + data.image)
    })
    .catch (err => {
        console.log('Error: ' + err);
    })    
});
router.get('/id/:id', (req, res) => {

    db.product_images.findOne({
        where: { id: req.params.id }
    })
    .then( data => {
        res.sendFile(__dirname + data.image)
    })
    .catch (err => {
        console.log('Error: ' + err);
    })    
});

router.get('/all/:product_id', (req, res) => {
        db.product_images.findAll({
            where: { product_id: req.params.product_id }
        })
        .then( data => {
            res.json(data)
            //res.sendFile(__dirname + data.image)
        })
        .catch (err => {
            console.log('Error: ' + err);
        })
});

// DELETE
router.delete('/:id' , (req, res) => 
    db.product_images.destroy({
        where: { id: req.params.id }
    }).then( () => {
        res.json({ status : 'Deleted!'})
    })  
);
const uploadController = require("./controller/upload");
const upload = require("./middleware/upload");

router.post("/upload",  uploadController.multipleUpload);
        
// POST
router.post('/' , function(req, res)  {
    if ( !req.body.image)
        res.json({ error: 'Bad Data'})

    db.product_images.create(req.body)
        .then( data => { res.send(data) })
        .catch( err => {
            console.log(err); 
            res.send(err)
        })
});

module.exports = router;