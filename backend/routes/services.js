const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// GET /services – все услуги
router.get('/', async (req, res) => {
  const services = await Service.findAll();
  res.json(services);
});

// GET /services/:id – одна услуга
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Некорректный id' });
  }
  const service = await Service.findByPk(id);
  res.json(service);
});
// POST /services – добавить услугу
router.post('/', async (req, res) => {
  const service = await Service.create(req.body);
  res.json(service);
});

// PUT /services/:id – обновить услугу
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Некорректный id' });
  }
  await Service.update(req.body, { where: { id } });
  res.json({ success: true });
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Некорректный id' });
  }
  await Service.destroy({ where: { id } });
  res.json({ success: true });
});

module.exports = router;