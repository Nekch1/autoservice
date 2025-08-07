// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db'); // убедись, что путь к sequelize правильный

// const User = require('./User');
// const Car = require('./Car');
// const Service = require('./Service'); // если связи через Service напрямую

// const Order = sequelize.define('Order', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   order_date: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
//   status: {
//     type: DataTypes.ENUM('ожидание', 'в процессе', 'завершён', 'отменён'),
//     defaultValue: 'ожидание',
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: true,
//   },
// }, {
//   tableName: 'orders',
//   timestamps: true,
// });

// // 🔗 Связи
// Order.belongsTo(User, { foreignKey: 'user_id', as: 'User' });
// Order.belongsTo(Car, { foreignKey: 'car_id', as: 'Car' });

// User.hasMany(Order, { foreignKey: 'user_id', as: 'Orders' });
// Car.hasMany(Order, { foreignKey: 'car_id', as: 'Orders' });

// // Через OrderService связывается с Service — это настраивается отдельно

// module.exports = Order;


// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');

// const Order = sequelize.define('Order', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   user_id: {
//     type: DataTypes.INTEGER,
//     allowNull: true, // для неавторизованных пользователей
//   },
//   car_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   order_date: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//   },
//   order_time: {
//     type: DataTypes.STRING,
//     allowNull: true, // если время хранится отдельным полем
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   status: {
//     type: DataTypes.STRING,
//     defaultValue: 'ожидание', // начальный статус
//   },
//   price: {
//     type: DataTypes.FLOAT,
//     allowNull: true, // админ может установить позже
//   },
// }, {
//   tableName: 'orders',
//   timestamps: true,
// });

// module.exports = Order;


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
