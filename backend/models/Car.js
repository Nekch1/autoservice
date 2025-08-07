const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User')

const Car = sequelize.define('сar', {
  mark: DataTypes.STRING,
  model: DataTypes.STRING,
  production_year: DataTypes.INTEGER,
  license_plate: DataTypes.STRING
});

Car.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Car, { foreignKey: 'user_id' });

module.exports = Car;