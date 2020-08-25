const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var users = require('./api/users.js');
//const db = require('./init.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var cors = require('cors')

app.use(cors()) 
//app.use('/api/users.js', users);

app.get('/', function (req, res) {
    res.send("<h1>Welcome to the server side!</h1>");
});

module.exports = app.listen(process.env.PORT || 8080, () => {
	//db.initialize();
    console.log('Server is working on http://localhost:8080');
});