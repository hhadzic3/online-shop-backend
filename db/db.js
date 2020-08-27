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
db.product_categories = sequelize.import(path.join(__dirname , '/product_categories.js'));
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
    as: 'seller',
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
    as: 'productOrder',
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
db.order_details.belongsTo(db.products, {
    as: 'orderDetails',
    foreignKey: {
        name: 'product_id'
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

// 6) Asociation -> todo: obratiti paznju na ovu vezu   
db.products.hasMany(db.product_categories, {
    foreignKey: {
        name: 'product_id'
    }
});
db.product_categories.belongsTo(db.products, {
    as: 'userOrder',
    foreignKey: {
        name: 'product_id'
    }
});

// 7) Asociation
db.categories.hasMany(db.product_categories, {
    foreignKey: {
        name: 'category_id'
    }
});
db.product_categories.belongsTo(db.categories, {
    as: 'productsCategory',
    foreignKey: {
        name: 'category_id'
    }
});

module.exports = db;