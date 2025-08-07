// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const OrderService = sequelize.define('OrderService', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });

// module.exports = OrderService;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrderService = sequelize.define('OrderService', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'order_services',
  timestamps: false,
});

module.exports = OrderService;
