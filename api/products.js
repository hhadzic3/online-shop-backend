var express = require('express');
var router = express.Router();
const db = require('../db/db');


router.get('/', (req, res) => db.product_images.findAll().then(product_images => res.json(product_images)));


module.exports = router;