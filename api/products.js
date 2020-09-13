var express = require('express');
var router = express.Router();
const db = require('../db/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function filterByCategory(req){
    let category = req.query.category;
    let subCategory = req.query.sub_category;

    if (category === undefined || category === 'none')
        return 0;
    else if (subCategory === 'none' )
        return 1;
    else if (subCategory !== 'none' )
        return 2;
}

// TODO: REFACTOR -> GET with query
router.get('/', (req, res) => { 
    let order = 'ASC';
    let sort = req.query.sortby;
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

    let label = req.query.label;
    let limit = req.query.limit;
    if (limit === undefined)
        limit = 9;

    let category = req.query.category;
    let subCategory = req.query.sub_category;
    
    if (label === undefined && sort === undefined){
        db.products.findAll({
            limit: limit,
            include: db.categories
        }).then(products => res.json(products))
    }
    else if (label !== undefined && sort !== undefined){
        db.products.findAll(
            {   
                limit: limit,
                where: {label:label},
                order: [[sort, order]]
            },
            ).then(products => res.json(products))
    }
    else {
        if (label === undefined){
            let filter = filterByCategory(req);
            if (filter === 2){
                db.products.findAll({
                    limit: limit,
                    order: [[sort, order]],
                    
                    include: [{
                        model: db.categories, 
                        attributes: ['name'], 
                         where: { name: subCategory, description:{ [Op.substring]: category} } 
                    }]
                    
                }).then(products => res.json(products))
            }
            else {
                db.products.findAll({
                    limit: limit,
                    order: [[sort, order]]
                }).then(products => res.json(products))
            }
        }
        else {
            db.products.findAll({
                limit: limit,
                where: {label:label}
            }).then(products => res.json(products))
        }
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