var express = require('express');
var router = express.Router();
const db = require('../db/db');

// GET sa query
router.get('/', (req, res) => { 
    let l = req.query.label;
    let sort = req.query.sortby;
    let order;

    if (sort === undefined){
        sort = 'price';
        order = 'ASC'
    }
    else if (sort === 'price_asc'){
        sort = 'price';
        order = 'ASC'
    }        
    else if (sort === 'price_desc'){
        sort = 'price';
        order = 'DESC'
    }        
    else if (sort === 'popularity'){
        sort = 'stock';
        order = 'ASC'
    }        
    else if (sort === 'rating'){
        sort = 'stock';
        order = 'asc'
    }        
    else if (sort === 'newness'){
        sort = 'stock';
        order = 'asc'
    }        
    else {
        sort = 'price';
        order = 'ASC'
    }

    if (l != undefined){
        db.products.findAll(
            {
                where: {label:l},
                order: [[sort, order]]
            },
        ).then(products => res.json(products))
    }
    else {
        db.products.findAll({
            order: [[sort, order]]
        }).then(products => res.json(products))
    }   
});


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
    if ( !req.body.stock)
        res.json({ error: 'Bad Data'})
    db.products.create(req.body).then( data => { res.send(data) })
    .catch( err => {
        console.log(err); 
        res.send(err)
    })
});

// PUT
router.put('/:id' , function(req, res)  {
    
    if (req.params.id !== undefined){
        if ( !req.body.stock )
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
    }
    res.json({ error: 'Error: ID is required!'})
});





module.exports = router;