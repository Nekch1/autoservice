const User = require('./User');
const Car = require('./Car');
const Order = require('./Order');
const Service = require('./Service');
const OrderService = require('./OrderService');
// const Question = require('./models/Question');

// User 1:M Car
User.hasMany(Car, { foreignKey: 'user_id', as: 'Car' });
Car.belongsTo(User, { foreignKey: 'user_id', as: 'User' });

// User 1:M Order
User.hasMany(Order, { foreignKey: 'user_id', as: 'Orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'User' });

// User 1:M Question
// User.hasMany(Question, { foreignKey: 'user_id' });
// Question.belongsTo(User, { foreignKey: 'user_id' });

// Car 1:M Order
Car.hasMany(Order, { foreignKey: 'car_id', as: 'Orders' });
Order.belongsTo(Car, { foreignKey: 'car_id', as: 'Car' });

// Order M:M Service (через OrderService)
Order.belongsToMany(Service, { through: OrderService, foreignKey: 'order_id', as: 'Service' });
Service.belongsToMany(Order, { through: OrderService, foreignKey: 'service_id', as: 'Orders' });

// Order.belongsTo(User, { foreignKey: 'user_id', as: 'User' });
// Order.belongsTo(Car, { foreignKey: 'car_id', as: 'Car' });