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
        description: {
            type: Sequelize.STRING,
            validate:{ isIn: [["primary","subcategory","color","price","size"]] }    
        },
    }, {
        sequelize,
        tableName: 'categories',
        timestamps: false,
        underscored: true
    }
    );
};