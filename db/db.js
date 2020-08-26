const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://xuvncdsf:5tB-jsNR5ko5TI4l0OKuRFuodEMAtmQE@rogue.db.elephantsql.com:5432/xuvncdsf') 
const path = require('path');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Sequelize.Op;

// Importing modals
db.users = sequelize.import(path.join(__dirname , '/users.js'));
//db.users = require(path.join(__dirname + '/users.js'))(sequelize, Sequelize.DataTypes)

// Asociations






module.exports = db;