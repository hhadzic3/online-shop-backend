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
    let user = req.query.user;
    let sortby;

    if (limit === undefined)
        limit = 9;

    if (!req.query.sort) {
        sortby = {
            sort: 'label',
            order: 'DESC'
        }
        limit = 15;
    } else {
        sortby = {
            sort: req.query.sort,
            order: req.query.order
        }
    }
    const {sort, order} = sortby;

    let where = {};    
    if (label)
        where.label = label;
    if (price && price !== 'none')
        where.price = {
            [Op.lte]: price 
        };
        
    let whereCategory = {};
    if (category && category !== 'none' && subCategory && subCategory !== 'none'){
        whereCategory = {
            name: subCategory,
            description: {
                [Op.substring]: category
            }
        }
    }

    // For Seller
    if (user){
        let where = {};
        where.seller_id = user;    
        if (label === 'sold')
            where.label = label;
        else {
            where.label = {
                [Op.ne]: 'sold'
            }
        }
        db.products.findAll({
            where: where
        }).then(products => res.json(products))
    }
    else{
        db.products.findAll({
            limit: limit,
            where: where,
            order: [
                [sort, order]
            ],
            include: [{
                model: db.categories,
                attributes: ['name'],
                where: whereCategory
            }]
        }).then(products => res.json(products))
    }
});

router.get('/:id', (req, res) => db.products.findOne({
    where: {
        id: req.params.id
    }
}).then(data => {
    res.send(data)
}));

// DELETE
router.delete('/:id', (req, res) => db.products.destroy({
    where: {
        id: req.params.id
    }
}).then(() => {
    res.json({
        status: 'Deleted!'
    })
}));

function randomNumber(min, max) {  
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}  
let numberOfProducts = 15;

// POST
router.post('/', function (req, res) {
    if (!req.body.stock)
        res.json({
            error: 'Bad Data'
        })
    const Pid = numberOfProducts + randomNumber(1,999);    
    db.products.create({
        id: Pid,
        name: req.body.name,
        seller_id : req.body.seller_id,
        price: req.body.price,
        weight: req.body.weight,
        description: req.body.description,
        label: req.body.label,
        stock: req.body.stock
    }).then(data => {
        req.body.categories.forEach(id => {
            db.product_categories.create({
                productId: data.id,
                categoryId: id
            })
        });
        req.body.subcategories.forEach(id => {
            db.product_categories.create({
                productId: data.id,
                categoryId: id
            })
        });
        req.body.images.forEach(element => {
            db.product_images.create({
                product_id: data.id,
                image: `/images/${element}`,
            }).then((image) => {
                
            });
        });

        res.sendStatus(200);
    })
    .catch(err => {
        console.log(err);
        res.send(err)
    })
});

// PUT
router.put('/:id', function (req, res) {

    if (req.params.id !== undefined) {
        if (!req.body.label)
            res.json({
                error: 'Bad Data'
            })
        var v = req.body;
        db.products.update({
            label: v.label,
        }, {
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.json({
                status: 'Updated!'
            })
        });
    }
    else {
    res.json({
        error: 'Error: ID is required!'
    })
    }
});

module.exports = router;
