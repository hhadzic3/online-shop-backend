var express = require('express');
var router = express.Router();
const db = require('../db/db');

router.get('/', (req, res) => { 
    let userId = req.query.user;
    let label = req.query.label;

    if (!userId || !label)
        db.order_details.findAll().then(order_details => res.json(order_details))

    db.order_details.findAll({
        include: [{
            model: db.products,
            attributes: ['name','label','price'],
            where: {
                label: label
            }
        },
        {
            model: db.orders,
            where: {
                customer_id: userId
            }
        }],
    }
    ).then(order_details => res.json(order_details))
    
});

router.get('/:id', (req, res) => db.order_details.findOne({
        where: { id: req.params.id }
    }).then( data => {
        res.send(data)
    })   
);

// DELETE
router.delete('/:id' , (req, res) => 
    db.order_details.destroy({
        where: {   id: req.params.id     }
    }).then( () => {
        res.json({ status : 'Deleted!'})
    })  
);

// POST
router.post('/' , function(req, res)  {
    if ( !req.body.price)
        res.json({ error: 'Error: Price is required'})

    db.orders.create({
        customer_id: req.body.order.customer_id,
        ammount: req.body.order.ammount,
        shipping_address: req.body.order.shipping_address,
        order_address: req.body.order.order_address,
        order_email: req.body.order.order_email,
        order_date: req.body.order.order_date,
        order_status: req.body.order.order_status,
        payment_method: req.body.order.payment_method
    })
    .then( data => {
        //res.send(data)
        db.order_details.create({
            product_id: req.body.product_id,
            price: req.body.price,
            quantity: req.body.quantity,
            order_id: data.id
        })
        .then( data => {
            res.send(data);
        })
    })
    .catch( err => {
        console.log(err); 
        //res.send(err)
    })
    
    
});

module.exports = router;