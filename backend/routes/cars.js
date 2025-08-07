const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const auth = require('../middleware/auth');

// Защищаем все маршруты с помощью middleware авторизации
router.use(auth);

// GET /cars – получение автомобилей текущего пользователя с пагинацией
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    
    const { count, rows: cars } = await Car.findAndCountAll({
      where: { user_id: req.user.id },
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      cars,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalItems: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка получения автомобилей', error: error.message });
  }
});

// GET /cars/:id – получение одного автомобиля (проверка владельца)
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findOne({ 
      where: { 
        id: req.params.id,
        user_id: req.user.id 
      }
    });
    
    if (!car) {
      return res.status(404).json({ message: 'Автомобиль не найден' });
    }
    
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка получения автомобиля', error: error.message });
  }
});

// POST /cars – добавление автомобиля
router.post('/', async (req, res) => {
  try {
    const { mark, model, production_year, license_plate } = req.body;
    
    if (!mark || !model || !production_year) {
      return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' });
    }
    
    const car = await Car.create({
      mark,
      model,
      production_year,
      license_plate,
      user_id: req.user.id // Привязываем автомобиль к текущему пользователю
    });
    
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка создания автомобиля', error: error.message });
  }
});

// PUT /cars/:id – обновление автомобиля (проверка владельца)
router.put('/:id', async (req, res) => {
  try {
    const { mark, model, production_year, license_plate } = req.body;
    
    // Проверяем, что автомобиль принадлежит пользователю
    const car = await Car.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    });
    
    if (!car) {
      return res.status(404).json({ message: 'Автомобиль не найден или не принадлежит пользователю' });
    }
    
    // Обновляем данные
    await Car.update(
      { mark, model, production_year, license_plate },
      { where: { id: req.params.id } }
    );
    
    // Получаем обновленные данные
    const updatedCar = await Car.findByPk(req.params.id);
    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка обновления автомобиля', error: error.message });
  }
});

// DELETE /cars/:id – удаление автомобиля (проверка владельца)
router.delete('/:id', async (req, res) => {
  try {
    // Проверяем, что автомобиль принадлежит пользователю
    const car = await Car.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    });
    
    if (!car) {
      return res.status(404).json({ message: 'Автомобиль не найден или не принадлежит пользователю' });
    }
    
    await Car.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Автомобиль успешно удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка удаления автомобиля', error: error.message });
  }
});

module.exports = router;