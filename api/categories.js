var express = require('express');
var router = express.Router();
const db = require('../db/db');

router.get('/', (req, res) => db.categories.findAll().then(categories => res.json(categories)));

router.get('/:id', (req, res) => db.categories.findOne({
    where: {   id: req.params.id }}).then( data => { res.send(data) })   
);

module.exports = router;