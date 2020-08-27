var express = require('express');
var router = express.Router();
const db = require('../db/db');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt'); // pass ne smije biti NUL

process.env.SECRET_KEY = 'secret'

// GET
router.get('/', (req, res) => db.users.findAll({attributes: {exclude: ['password']}}).then(users => res.json(users)));

router.get('/:id', (req, res) => db.users.findOne({
    where: {   id: req.params.id } , attributes: {exclude: ['password']}}).then( data => { res.send(data) })   
);

router.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    
    db.users.findOne({
        where: {
            id: decoded.id
        }
    }).then(user => {
        if (user) {
            res.json(user)
        } else {
            res.send('User does not exist')
        }
        })
        .catch(err => {
        res.send('error: ' + err)
        })
});

// POST
router.post('/login', (req, res) => {
    db.users.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
    .then(user => {
    if (bcrypt.compareSync(req.body.password,user.password) || req.body.password == user.password ) {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, { expiresIn: 1440 })
        res.json({ token: token })
    } else {
        res.send('User does not exist')
    }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

router.post('/register', (req, res) => {
    var userData = req.body;
db.users.findOne({
    where: {
        mail: req.body.mail
    }
}).then(user => {
    if (!user) {
        const hash = bcrypt.hashSync(userData.password , 10)
        userData.password = hash;
        db.users.create(userData)
        .then(user => {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
            })
            res.json({ token: token })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
    } else {
        res.json({ error: 'User already exists' })
    }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
});

module.exports = router;