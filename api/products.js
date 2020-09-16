var express = require('express');
var router = express.Router();
const db = require('../db/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// GET with query
router.get('/', (req, res) => { 
    let label = req.query.label;
    let limit = req.query.limit;
    let price = req.query.price; 
    let category = req.query.category;
    let subCategory = req.query.sub_category;
    let sortby;

    if (limit === undefined)
        limit = 9;

    if (!req.query.sort){
        sortby = {
            sort: 'label',
            order: 'DESC'
        }
    }
    else{
        sortby = {
            sort: req.query.sort,
            order: req.query.order
        }
    }
    const {sort, order} = sortby;


    db.products.findAll({
        include: db.categories,
        order: [[sort, order]]
    }).then(products => {
            const response = products.filter(product => {
            return (label ? (product.label === label) : true) &&
                (price && price != 'none' ? (product.price <= price) : true) &&
                (category && category !== 'none' ? (product.categories.some(one_category => {
                    return one_category['description'].includes(category)
                })) : true) &&
                (subCategory && subCategory !== 'none'? (product.categories.some(one_category => {
                    return one_category['name'] === subCategory
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