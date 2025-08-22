const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const OrderService = require('../models/OrderService');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
const User = require('../models/User')
const Car = require('../models/Car')
const Service = require('../models/Service')
const auth = require('../middleware/auth');

router.use(auth);
router.get('/', async (req, res) => {
  try {
    const { userId, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const where = userId ? { user_id: userId } : {};

    const orders = await Order.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      distinct:true,
      include: [
        { model: User, as: 'User'},  
        { model: Car, as:'Car' },
        { model: Service, as:'Service' },
      ],
      order: [['createdAt', 'DESC']],
    });
    console.log(orders)    
    const totalPages = orders.count === 0 ? 1 : Math.ceil(orders.count / limit);

    res.json({
      total: orders.count,
      pages: totalPages,
      currentPage: parseInt(page),
      data: orders.rows,
    });
  } catch (err) {
    console.error('Ошибка получения заказов:', err);
    res.status(500).json({ message: 'Ошибка получения заказов' });
  }
});

// 🔹 Получить конкретный заказ по ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: ['User', 'Car', 'Service'],
    });

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    res.json(order);
  } catch (err) {
    console.error('Ошибка получения заказа:', err);
    res.status(500).json({ message: 'Ошибка получения заказа' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { user_id, car_id, services, order_date, order_time, email, status, price } = req.body;

    if (!user_id || !car_id || !services || !order_date || !email) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }

    const order = await Order.create({
      user_id,
      car_id,
      order_date,
      order_time,
      email,
      status: 'ожидание',
      price
    });

    const links = services.map(service_id => ({
      order_id: order.id,
      service_id,
    }));
    await OrderService.bulkCreate(links);

    // Получаем названия услуг по их ID
    const serviceList = await Service.findAll({
      where: {
        id: services
      }
    });

    const serviceNames = serviceList.map(s => s.name).join(', ');

    // ✉️ Отправка email-подтверждения
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "nstrukov876@gmail.com",
        pass: "niof cvck wsos dfqk"
      },
    });

    const message = {
      from: "nstrukov876@gmail.com",
      to: email,
      subject: 'Запись в автосервис',
      text: `Вы успешно записались на следующие услуги: ${serviceNames}.\nДата: ${order_date}\nВремя: ${order_time}\nПожалуйста, ожидайте подтверждения.`,
    };

    await transporter.sendMail(message);

    res.status(201).json({ success: true, order_id: order.id });
  } catch (err) {
    console.error('Ошибка при создании заказа:', err);
    res.status(500).json({ message: 'Ошибка при создании заказа' });
  }
});

// 🔹 Обновить заказ
// 🔹 Обновить заказ и отправить email при смене статуса
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: Service, as: 'Service' }]
    });

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    const oldStatus = order.status;
    await order.update(req.body);

    // Если статус изменился → отправляем письмо
    if (req.body.status && req.body.status !== oldStatus) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "nstrukov876@gmail.com",
          pass: "niof cvck wsos dfqk"
        },
      });

      const serviceNames = order.Service.map(s => s.name).join(', ');

      const message = {
        from: "nstrukov876@gmail.com",
        to: order.email,
        subject: 'Обновление статуса заказа',
        text: `Статус вашего заказа №${order.id} был изменён.\n\n` +
              `Услуги: ${serviceNames}\nДата: ${order.order_date}\nВремя: ${order.order_time}\n` +
              `Новый статус: ${req.body.status}`,
      };

      await transporter.sendMail(message);
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Ошибка обновления заказа:', err);
    res.status(500).json({ message: 'Ошибка обновления заказа' });
  }
});


// 🔹 Удалить заказ
router.delete('/:id', async (req, res) => {
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
});


// 🔹 Отмена заказа
router.put('/:id/cancel', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    // Если заказ уже завершён – отменять нельзя
    if (order.status === 'завершён') {
      return res.status(400).json({ message: 'Нельзя отменить завершённый заказ' });
    }

    // Меняем статус на "отменён"
    order.status = 'отменён';
    await order.save();

    res.json({ success: true, message: 'Запись успешно отменена' });
  } catch (err) {
    console.error('Ошибка отмены заказа:', err);
    res.status(500).json({ message: 'Ошибка отмены заказа' });
  }
});


module.exports = router;
