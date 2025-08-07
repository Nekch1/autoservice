const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize')


// Register new user
exports.register = async (req, res) => {
  try {
    const { name, surname, phone, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const user = await User.create({
      name,
      surname,
      phone,
      email,
      password: hashedPassword,
      role
    });
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict'
    });
    
    // Return user data (except password)
    const userData = { ...user.dataValues };
    delete userData.password;
    
    res.status(201).json({
      success: true,
      token,
      user: userData
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Ошибка сервера при регистрации' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: 'Ваш аккаунт заблокирован' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict'
    });
    
    // Return user data (except password)
    const userData = { ...user.dataValues };
    delete userData.password;
    
    res.json({
      success: true,
      token,
      user: userData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Ошибка сервера при входе в систему' });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    // Return user data (except password)
    const userData = { ...user.dataValues };
    delete userData.password;
    
    res.json({ user: userData });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Logout user
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Выход выполнен успешно' });
};





exports.updateProfile = async (req, res) => {
  try {
    const { name, surname, phone, email } = req.body;
    const userId = req.user.id;
    
    // Проверяем, не занят ли email другим пользователем
    if (email) {
      const existingUser = await User.findOne({ 
        where: { 
          email,
          id: { [sequelize.Op.ne]: userId } // Не текущий пользователь
        } 
      });
      
      if (existingUser) {
        return res.status(400).json({ message: 'Этот email уже используется' });
      }
    }
    
    // Обновляем данные
    await User.update(
      { name, surname, phone, email },
      { where: { id: userId } }
    );
    
    // Получаем обновленные данные пользователя
    const updatedUser = await User.findByPk(userId);
    
    // Возвращаем пользователя без пароля
    const userData = { ...updatedUser.dataValues };
    delete userData.password;
    
    res.json({
      success: true,
      message: 'Профиль успешно обновлен',
      user: userData
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Ошибка сервера при обновлении профиля' });
  }
};

// Изменить пароль
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    
    // Находим пользователя
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    // Проверяем текущий пароль
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Текущий пароль указан неверно' });
    }
    
    // Хешируем и устанавливаем новый пароль
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Обновляем пароль
    await User.update(
      { password: hashedPassword },
      { where: { id: userId } }
    );
    
    res.json({
      success: true,
      message: 'Пароль успешно изменен'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Ошибка сервера при изменении пароля' });
  }
};