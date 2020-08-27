const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('products', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        seller_id : DataTypes.INTEGER,
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        weight: DataTypes.INTEGER,
        description: DataTypes.STRING,
        //category: DataTypes.STRING,
        stock: DataTypes.INTEGER
    }, {
        sequelize,
        tableName: 'products',
        timestamps: false,
        underscored: true
    }
    );
};