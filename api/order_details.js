var express = require('express');
var router = express.Router();
const db = require('../db/db');

router.get('/', (req, res) => db.order_details.findAll().then(order_details => res.json(order_details)));

router.get('/:id', (req, res) => db.order_details.findOne({
    where: {   id: req.params.id }}).then( data => { res.send(data) })   
);

// DELETE
router.delete('/:id' , (req, res) => db.order_details.destroy({
    where: {   id: req.params.id     }
 }).then( () => { res.json({ status : 'Deleted!'}) })  
);

// POST
router.post('/' , function(req, res)  {
    if ( !req.body.price)
        res.json({ error: 'Bad Data'})
    db.order_details.create(req.body).then( data => { res.send(data) });
});

module.exports = router;