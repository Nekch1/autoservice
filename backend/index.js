require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/db');
require('./models/associations')
const seedService = require('./seed/service-seed')

const app = express();
const PORT = process.env.PORT || 5000;

// 📦 Импорт маршрутов
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const carRoutes = require('./routes/cars');
const serviceRoutes = require('./routes/services');
const orderRoutes = require('./routes/orders');
const orderServiceRoutes = require('./routes/orderServices');
// const questionRoutes = require('./routes/questions');

// 🔐 Middleware
app.use(cookieParser());
app.use(cors({ 
  origin: 'http://localhost:3000',
  credentials: true 
}));
app.use(express.json());

// 📁 Статические файлы (загрузка изображений и т.д.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🌐 Основные маршруты
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/cars', carRoutes);
app.use('/services', serviceRoutes);
app.use('/orders', orderRoutes);
app.use('/order-services', orderServiceRoutes);
// app.use('/questions', questionRoutes); // включи при необходимости

// ✅ Дополнительный маршрут: доступ к машинам через /users/:userId/cars
app.use('/users/:userId/cars', (req, res, next) => {
  req.originalUrl = req.originalUrl.replace(`/users/${req.params.userId}/cars`, '/cars');
  carRoutes(req, res, next);
});

// 🚀 Запуск сервера и подключение к базе данных
async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // можно заменить на { alter: true } или { force: true } при разработке
    console.log('✅ База данных подключена и синхронизирована');
    await seedService();
    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Ошибка подключения к БД:', error);
  }
}

start();
