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


router.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

    db.users.findOne({
            where: {
                id: decoded.id
            }
        })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('Error: ' + err)
        })
});

// POST
router.post('/login', (req, res) => {
    db.users.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (user){
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                }
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('Error: ' + err)
        })
})

router.post('/register', (req, res) => {

    var userData = req.body;

    db.users.findOne({
            where: {
                email: userData.email
            }
        })
        .then(user => {

            if (!user) {
                const hash = bcrypt.hashSync(userData.password, 10)
                userData.password = hash;

                db.users.create(userData)
                    .then(user => {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
                        res.send(token)
                    })
                    .catch(err => {
                        res.send('Error: ' + err)
                    })
            } 
            else res.json({error: 'User already exists'})
        })
        .catch(err => {
            res.send('Error: ' + err)
        })
});


module.exports = router;