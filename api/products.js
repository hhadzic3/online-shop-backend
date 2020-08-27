var express = require('express');
var router = express.Router();
const db = require('../db/db');


router.get('/', (req, res) => db.products.findAll().then(products => res.json(products)));


module.exports = router;