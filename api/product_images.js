var express = require('express');
var router = express.Router();
const db = require('../db/db');

router.get('/', (req, res) => 
    db.product_images.findAll()
        .then(product_images => 
            res.json(product_images)
        )
);

router.get('/:product_id', (req, res) => db.product_images.findOne({
    where: { id: req.params.product_id }})
        .then( data => {
            //res.send(data.image) 
            res.sendFile(__dirname + data.image)
            //res.sendFile( + '../images/bag.png')
        })
        .catch (err => {
            res.sendFile(__dirname + '/images/iphone11.png');
        })
        
);

// DELETE
router.delete('/:id' , (req, res) => 
    db.product_images.destroy({
        where: { id: req.params.id }
    }).then( () => {
        res.json({ status : 'Deleted!'})
    })  
);

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