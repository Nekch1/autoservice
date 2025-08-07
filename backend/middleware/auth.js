const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Нет токена, доступ запрещён' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log('🔍 User model:', User);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: 'Ваш аккаунт заблокирован' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('auth middleware error:', error);
    res.status(401).json({ message: 'Недействительный токен' });
  }
};
