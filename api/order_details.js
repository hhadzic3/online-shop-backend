var express = require('express');
var router = express.Router();
const db = require('../db/db');

router.get('/', (req, res) => db.order_details.findAll().then(order_details => res.json(order_details)));

module.exports = router;