const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('product_images', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        product_id: DataTypes.INTEGER,
        image: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'product_images',
        timestamps: false,
        underscored: true
    }
    );
};