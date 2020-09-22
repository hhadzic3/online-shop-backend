require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(`${process.env.DB_URL}`, {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
}); 
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


// 1) Asociation 
db.products.hasMany(db.product_images, {
    foreignKey: {
        name: 'product_id'
    }
});
db.product_images.belongsTo(db.products, {
    as: 'productImage',
    foreignKey: {
        name: 'product_id'
    }
});
// 2) Asociation
db.users.hasMany(db.products, {
    foreignKey: {
        name: 'seller_id'
    }
});
db.products.belongsTo(db.users, {
    //as: 'seller',
    foreignKey: {
        name: 'seller_id'
    }
});


// 3) Asociation
db.products.hasMany(db.order_details, {
    foreignKey: {
        name: 'product_id'
    }
});
db.order_details.belongsTo(db.products, {
    //as: 'productOrder',
    foreignKey: {
        name: 'product_id'
    }
});

// 4) Asociation
db.orders.hasMany(db.order_details, {
    foreignKey: {
        name: 'order_id'
    }
});
db.order_details.belongsTo(db.orders, {
    //as: 'orderDetails',
    foreignKey: {
        name: 'order_id'
    }
});

// 5) Asociation
db.users.hasMany(db.orders, {
    foreignKey: {
        name: 'customer_id'
    }
});
db.orders.belongsTo(db.users, {
    as: 'userOrder',
    foreignKey: {
        name: 'customer_id'
    }
});


db.product_categories = sequelize.define('product_categories', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true
    }
}, {
    sequelize,
    tableName: 'product_categories',
    timestamps: false,
    underscored: true
});
 

db.products.belongsToMany(db.categories, { through: db.product_categories });
db.categories.belongsToMany(db.products, { through: db.product_categories });

module.exports = db;