const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        full_name: DataTypes.STRING,
        billing_address: DataTypes.STRING,
        shipping_address: DataTypes.STRING,
        country: DataTypes.STRING,
        phone: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'users',
        timestamps: false,
        underscored: true
    }
    );
};