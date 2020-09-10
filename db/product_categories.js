const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('product_categories', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        product_id: DataTypes.INTEGER,
        category_id: DataTypes.INTEGER
    }, {
        sequelize,
        tableName: 'product_categories',
        timestamps: false,
        underscored: true
    }
    );
};