var express = require('express');
var router = express.Router();
const db = require('../db/db');


router.get('/', (req, res) => db.orders.findAll().then(orders => res.json(orders)));

router.get('/:id', (req, res) => db.orders.findOne({
    where: {   id: req.params.id }}).then( data => { res.send(data) })   
);

module.exports = router;