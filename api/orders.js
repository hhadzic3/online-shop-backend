var express = require('express');
var router = express.Router();
const db = require('../db/db');


router.get('/', (req, res) => db.orders.findAll().then(orders => res.json(orders)));


module.exports = router;