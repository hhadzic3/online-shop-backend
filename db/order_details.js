const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('order_details', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        order_id: DataTypes.INTEGER,
        product_id:{
            type: DataTypes.INTEGER,
            unique: true
        },
        price: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER
    }, {
        sequelize,
        tableName: 'order_details',
        timestamps: false,
        underscored: true
    }
    );
};