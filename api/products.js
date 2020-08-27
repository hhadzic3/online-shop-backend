var express = require('express');
var router = express.Router();
const db = require('../db/db');


router.get('/', (req, res) => db.products.findAll().then(products => res.json(products)));

router.get('/:id', (req, res) => db.products.findOne({
    where: {   id: req.params.id }}).then( data => { res.send(data) })   
);

module.exports = router;