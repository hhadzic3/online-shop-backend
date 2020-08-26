var express = require('express');
var router = express.Router();
const db = require('../db/db');


router.get('/', (req, res) => db.users.findAll({attributes: {exclude: ['password']}
}).then(users => res.json(users)));


module.exports = router;