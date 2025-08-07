// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const User = sequelize.define('user', { 
//   name: DataTypes.STRING,
//   surname: DataTypes.STRING,
//   phone: DataTypes.STRING,
//   email: DataTypes.STRING,
//   password: DataTypes.STRING,
//   role: {
//     type: DataTypes.ENUM('client', 'admin'),
//     defaultValue: 'client'
//   }
// });

// module.exports = User;


const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('user', { 
  name: DataTypes.STRING,
  surname: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('client', 'admin'),
    defaultValue: 'client'
  },
  isBlocked: {
  type: DataTypes.BOOLEAN,
  defaultValue: false
}

});

module.exports = User;