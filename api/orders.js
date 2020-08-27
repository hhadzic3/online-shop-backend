var express = require('express');
var router = express.Router();
const db = require('../db/db');


router.get('/', (req, res) => db.orders.findAll().then(orders => res.json(orders)));

router.get('/:id', (req, res) => db.orders.findOne({
    where: {   id: req.params.id }}).then( data => { res.send(data) })   
);

// DELETE
router.delete('/:id' , (req, res) => db.orders.destroy({
    where: {   id: req.params.id     }
 }).then( () => { res.json({ status : 'Deleted!'}) })  
);


module.exports = router;