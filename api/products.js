var express = require('express');
var router = express.Router();
const db = require('../db/db');

// GET
router.get('/', (req, res) => db.products.findAll().then(products => res.json(products)));

router.get('/:id', (req, res) => db.products.findOne({
    where: {   id: req.params.id }}).then( data => { res.send(data) })   
);

// DELETE
router.delete('/:id' , (req, res) => db.products.destroy({
    where: {   id: req.params.id     }
 }).then( () => { res.json({ status : 'Deleted!'}) })  
);


// POST
router.post('/' , function(req, res)  {
    if ( !req.body.name)
        res.json({ error: 'Bad Data'})
    db.products.create(req.body).then( data => { res.send(data) });
});

// PUT
router.put('/:id' , function(req, res)  {
    if ( !req.body.name )
        res.json({ error: 'Bad Data' })
    
    var v = req.body;
    
    db.products.update({
        name: v.name,
        price: v.price,
        weight: v.weight,
        description: v.description,
        stock: v.stock 
    }, { where: { id: req.params.id } }
    ).then( () => { res.json({ status : 'Updated!'}) });
});





module.exports = router;