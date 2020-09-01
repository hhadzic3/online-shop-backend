const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var users = require('./api/users.js');
var categories = require('./api/categories.js');
var orders = require('./api/orders.js');
var products = require('./api/products.js');
var order_details = require('./api/order_details.js');
var product_images = require('./api/product_images.js');
const db = require('./init.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var cors = require('cors')

app.use(cors()) 
app.use('/api/users', users);
app.use('/api/categories', categories);
app.use('/api/orders', orders);
app.use('/api/products', products);
app.use('/api/order_details', order_details);
app.use('/api/product_images', product_images);

app.get('/', function (req, res) {
    res.send("<h1>Welcome to the server side!</h1>");
});
app.get('/api', function (req, res) {
    res.send("<h1>Welcome to the server side!</h1>");
});

module.exports = app.listen(/*process.env.PORT ||*/ 8080, () => {
    console.log('Server is working on http://localhost:8080');
    db.initialize();
});