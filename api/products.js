var express = require('express');
var router = express.Router();
const db = require('../db/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// GET with query
router.get('/', (req, res) => { 
    let order;
    let sort = req.query.sortby;
    let label = req.query.label;
    let limit = req.query.limit;
    let price = req.query.price;
    let category = req.query.category;
    let subCategory = req.query.sub_category;

    if (limit === undefined)
        limit = 9;

    if (sort === 'price_asc'){
        sort = 'price';
        order = 'ASC'
    }        
    else if (sort === 'price_desc'){
        sort = 'price';
        order = 'DESC'
    }        
    else if (sort === 'popularity'){
        sort = 'label';
        order = 'DESC'
    } 
    else {
        sort = 'label';
        order = 'DESC'
    }

    db.products.findAll({
        include: db.categories,
        order: [[sort, order]]
    }).then(products => {
            const response = products.filter(c => {
            return (label ? (c.label === label) : true) &&
                (price && price != 'none' ? (c.price <= price) : true) &&
                (category && category !== 'none' ? (c.categories.some(element => {
                    return element['description'].includes(category)
                })) : true) &&
                (subCategory && subCategory !== 'none'? (c.categories.some(element => {
                    return element['name'] === subCategory
                })) : true); 
            });
        res.json(response.slice(0,limit))
    })
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