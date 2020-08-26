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
        product_id: DataTypes.INTEGER,
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