const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://xuvncdsf:5tB-jsNR5ko5TI4l0OKuRFuodEMAtmQE@rogue.db.elephantsql.com:5432/xuvncdsf') 
const path = require('path');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Sequelize.Op;

// Importing modals
// for sequlize > 6.0.0 importing will be like this:
// db.users = require(path.join(__dirname + '/users.js'))(sequelize, Sequelize.DataTypes)

db.users = sequelize.import(path.join(__dirname , '/users.js'));
db.products = sequelize.import(path.join(__dirname , '/products.js'));
db.orders = sequelize.import(path.join(__dirname , '/orders.js'));
db.order_details = sequelize.import(path.join(__dirname , '/order_details.js'));
db.categories = sequelize.import(path.join(__dirname , '/categories.js'));
db.product_images = sequelize.import(path.join(__dirname , '/product_images.js'));


// Asociations






module.exports = db;