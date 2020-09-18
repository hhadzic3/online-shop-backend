var express = require('express');
var router = express.Router();
const db = require('../db/db');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt'); // password can't be NULL
require('dotenv').config()

// GET
router.get('/', (req, res) => {
    db.users
        .findAll({
            attributes: {
                exclude: ['password']
            }
        })
        .then(users => res.json(users))
});

router.get('/:id', (req, res) => {
    db.users
        .findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['password']
            }
        })
        .then(data => {
            res.send(data)
        })
});

// DELETE
router.delete('/:id', (req, res) => db.users.destroy({
    where: {
        id: req.params.id
    }
}).then(() => {
    res.json({status: 'Deleted!'})
}));

module.exports = router;