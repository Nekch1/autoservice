const express = require('express');
const router = express.Router();
const User = require('../models/User');
const upload = require('../config/multer');
const fs = require('fs');
const path = require('path');

// GET /users – все пользователи
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      total: count,
      pages: totalPages,
      currentPage: parseInt(page),
      data: rows
    });
  } catch (err) {
    console.error('Ошибка загрузки пользователей:', err);
    res.status(500).json({ message: 'Ошибка загрузки пользователей' });
  }
});

// GET /users/:id – один пользователь
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

// POST /users – создать пользователя
router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// PUT /users/:id – обновить пользователя
router.put('/:id', async (req, res) => {
  await User.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});

// DELETE /users/:id – удалить пользователя
router.delete('/:id', async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

// POST /users/:id/photo - загрузить фото профиля
router.post('/:id/photo', upload.single('photo'), async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'Пользователь не найден' });
    }
    
    // Если у пользователя уже есть фото, удаляем старый файл
    if (user.photo) {
      const oldPhotoPath = path.join(__dirname, '..', user.photo);
      
      // Проверяем существование файла перед удалением
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      }
    }
    
    // Сохраняем путь к новому файлу в БД
    const photoPath = '/uploads/avatars/' + req.file.filename;
    await User.update({ photo: photoPath }, { where: { id: userId } });
    
    // Отправляем обновленные данные пользователя
    const updatedUser = await User.findByPk(userId);
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Ошибка при загрузке фото:', error);
    res.status(500).json({ success: false, message: 'Ошибка при загрузке фото' });
  }
});

// DELETE /users/:id/photo - удалить фото профиля
router.delete('/:id/photo', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'Пользователь не найден' });
    }
    
    // Если у пользователя есть фото, удаляем файл
    if (user.photo) {
      const photoPath = path.join(__dirname, '..', user.photo);
      
      // Проверяем существование файла перед удалением
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
      
      // Обнуляем путь к фото в БД
      await User.update({ photo: null }, { where: { id: userId } });
    }
    
    // Отправляем обновленные данные пользователя
    const updatedUser = await User.findByPk(userId);
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Ошибка при удалении фото:', error);
    res.status(500).json({ success: false, message: 'Ошибка при удалении фото' });
  }
});

router.put('/:id/block', async (req, res) => {
  try {
    await User.update({ isBlocked: true }, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    console.error('Ошибка блокировки:', err);
    res.status(500).json({ success: false });
  }
});

router.put('/:id/unblock', async (req, res) => {
  try {
    await User.update({ isBlocked: false }, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    console.error('Ошибка разблокировки:', err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;

