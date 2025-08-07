// controllers/orderController.js
const Order = require('../models/Order');
const OrderService = require('../models/OrderService');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');

// Получить список заказов
exports.getAllOrders = async (req, res) => {
  try {
    const { userId, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const where = userId ? { user_id: userId } : {};

    const orders = await Order.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: ['User', 'Car', 'Services'],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      total: orders.count,
      pages: Math.ceil(orders.count / limit),
      currentPage: parseInt(page),
      data: orders.rows,
    });
  } catch (err) {
    console.error('Ошибка получения заказов:', err);
    res.status(500).json({ message: 'Ошибка получения заказов' });
  }
};

// Получить один заказ
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: ['User', 'Car', 'Services'],
    });

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    res.json(order);
  } catch (err) {
    console.error('Ошибка получения заказа:', err);
    res.status(500).json({ message: 'Ошибка получения заказа' });
  }
};

// Создать заказ
exports.createOrder = async (req, res) => {
  try {
    const { user_id, car_id, services, order_date, email } = req.body;

    if (!user_id || !car_id || !services || !order_date || !email) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }

    const order = await Order.create({
      user_id,
      car_id,
      order_date,
      status: 'ожидание',
    });

    const links = services.map(service_id => ({
      order_id: order.id,
      service_id,
    }));
    await OrderService.bulkCreate(links);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const message = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Подтверждение записи в автосервис',
      text: `Вы успешно записались на услугу.\nДата: ${order_date}\nНомер заказа: ${order.id}`,
    };

    await transporter.sendMail(message);

    res.status(201).json({ success: true, order_id: order.id });
  } catch (err) {
    console.error('Ошибка при создании заказа:', err);
    res.status(500).json({ message: 'Ошибка при создании заказа' });
  }
};

// Обновить заказ
exports.updateOrder = async (req, res) => {
  try {
    const [updated] = await Order.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) {
      return res.status(404).json({ message: 'Заказ не найден для обновления' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Ошибка обновления заказа:', err);
    res.status(500).json({ message: 'Ошибка обновления заказа' });
  }
};

// Удалить заказ
exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Заказ не найден для удаления' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Ошибка удаления заказа:', err);
    res.status(500).json({ message: 'Ошибка удаления заказа' });
  }
};
