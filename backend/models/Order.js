const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // для неавторизованных пользователей
  },
  car_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  order_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  order_time: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'ожидание',
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true, 
  },
}, {
  tableName: 'orders',
  timestamps: true,
});

module.exports = Order;
