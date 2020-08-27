const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('categories', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'categories',
        timestamps: false,
        underscored: true
    }
    );
};