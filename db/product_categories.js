/*const Sequelize = require('sequelize');

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
};*/

const Sequelize = require('sequelize');
const db = require('./db');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('product_categories', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        product_id: {
            type: Sequelize.INTEGER,
            references: {
              model: db.products, // 'Movies' would also work
              key: 'id'
            }
          },
          category_id: {
            type: Sequelize.INTEGER,
            references: {
              model: db.categories, // 'Actors' would also work
              key: 'id'
            }
          }
    }, {
        sequelize,
        tableName: 'product_categories',
        timestamps: false,
        underscored: true
    }
    );
};