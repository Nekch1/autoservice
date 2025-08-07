const express = require('express');
const router = express.Router();
const OrderService = require('../models/OrderService');

// GET /order-services – все связи заказов и услуг
router.get('/', async (req, res) => {
  const orderServices = await OrderService.findAll();
  res.json(orderServices);
});

// POST /order-services – добавить услугу к заказу
router.post('/', async (req, res) => {
  const { order_id, service_id } = req.body;
  const orderService = await OrderService.create({ order_id, service_id });
  res.json(orderService);
});

// DELETE /order-services/:id – удалить связь
router.delete('/:id', async (req, res) => {
  await OrderService.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;