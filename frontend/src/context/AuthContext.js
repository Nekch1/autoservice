import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data on app load
useEffect(() => {
  const checkLoggedIn = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const res = await axios.get('http://localhost:5000/auth/me');
        setUser(res.data.user);
      }
    } catch (err) {
      // Обработка ошибки блокировки
      if (err.response?.status === 403) {
        alert('Ваш аккаунт заблокирован администратором');
      }

      // Удаляем токен и обнуляем пользователя
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  checkLoggedIn();
}, []);


  // Register user
  const register = async (userData) => {
    try {
      setError(null);
      const res = await axios.post('http://localhost:5000/auth/register', userData);
      
      // Save token and set auth header
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      setUser(res.data.user);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при регистрации');
      return false;
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      setError(null);
      const res = await axios.post('http://localhost:5000/auth/login', userData);
      
      // Save token and set auth header
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      setUser(res.data.user);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при входе');
      return false;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Remove token from localStorage and auth header
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };




  // Функция обновления профиля
const updateProfile = async (userData) => {
  try {
    setError(null);
    const res = await axios.put('http://localhost:5000/auth/profile', userData);
    setUser(res.data.user);
    return { success: true, message: res.data.message };
  } catch (err) {
    setError(err.response?.data?.message || 'Ошибка при обновлении профиля');
    return { success: false, message: err.response?.data?.message || 'Ошибка при обновлении профиля' };
  }
};

// Функция изменения пароля
const changePassword = async (passwordData) => {
  try {
    setError(null);
    const res = await axios.put('http://localhost:5000/auth/password', passwordData);
    return { success: true, message: res.data.message };
  } catch (err) {
    setError(err.response?.data?.message || 'Ошибка при изменении пароля');
    return { success: false, message: err.response?.data?.message || 'Ошибка при изменении пароля' };
  }
};



const uploadProfilePhoto = async (userId, photoFile) => {
  try {
    const formData = new FormData();
    formData.append('photo', photoFile);
    
    const response = await axios.post(`http://localhost:5000/users/${userId}/photo`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Обновляем данные пользователя в контексте
    setUser(response.data.user);
    
    return { success: true, user: response.data.user };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Ошибка при загрузке фото'
    };
  }
};



// Функция для удаления фото профиля
const deleteProfilePhoto = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/users/${userId}/photo`, {
      withCredentials: true
    });
    
    // Обновляем данные пользователя в контексте
    setUser(response.data.user);
    
    return { success: true, user: response.data.user };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Ошибка при удалении фото'
    };
  }
};



return (
  <AuthContext.Provider value={{ 
    user, 
    loading, 
    error, 
    register, 
    login, 
    logout, 
    setUser,
    updateProfile, 
    changePassword,
    uploadProfilePhoto,
    deleteProfilePhoto
  }}>
    {children}
  </AuthContext.Provider>
);
};