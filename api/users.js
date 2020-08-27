var express = require('express');
var router = express.Router();
const db = require('../db/db');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt'); // pass ne smije biti NUL

process.env.SECRET_KEY = 'secret'

router.get('/', (req, res) => db.users.findAll({attributes: {exclude: ['password']}}).then(users => res.json(users)));

router.get('/:id', (req, res) => db.users.findOne({
    where: {   id: req.params.id } , attributes: {exclude: ['password']}}).then( data => { res.send(data) })   
);


module.exports = router;