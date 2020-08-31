const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('orders', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        customer_id: DataTypes.INTEGER,
        ammount: DataTypes.INTEGER,
        shipping_address: DataTypes.STRING,
        order_address: DataTypes.STRING,
        order_email: DataTypes.STRING,
        order_date: DataTypes.STRING,
        order_status: {
            type: Sequelize.STRING,
            validate:{ isIn: [["ordered","unordered"]] }    
        },
        payment_method: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'orders',
        timestamps: false,
        underscored: true
    }
    );
};