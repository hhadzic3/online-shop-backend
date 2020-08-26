var express = require('express');
var router = express.Router();
const db = require('../db/db');

router.get('/', (req, res) => db.categories.findAll().then(categories => res.json(categories)));

module.exports = router;