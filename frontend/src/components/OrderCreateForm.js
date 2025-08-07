import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './OrderCreateForm.css'; 

const OrderCreateForm = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchServices();
    fetchCars();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API}/services`);
      setServices(res.data);
    } catch (err) {
      console.error('Ошибка загрузки услуг:', err);
    }
  };

  const fetchCars = async () => {
    try {
      const res = await axios.get(`${API}/cars`, { withCredentials: true });
      setCars(res.data.cars || res.data);
    } catch (err) {
      console.error('Ошибка загрузки машин:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!selectedService || !selectedCar || !orderDate) {
      setErrorMessage('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      const res = await axios.post(
        `${API}/orders`,
        {
          user_id: user.id,
          car_id: selectedCar,
          services: [selectedService],
          order_date: orderDate,
          email: user.email
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setSuccessMessage('Запись успешно создана! Подтверждение отправлено на почту.');
        setSelectedCar('');
        setSelectedService('');
        setOrderDate('');
      }
    } catch (err) {
      console.error('Ошибка записи:', err);
      setErrorMessage('Не удалось записаться. Попробуйте позже.');
    }
  };

  return (
    <div className="order-form">
      <h3>Записаться на услугу</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="service">Выберите услугу:</label>
          <select
            id="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
          >
            <option value="">-- выберите услугу --</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="car">Выберите автомобиль:</label>
          <select
            id="car"
            value={selectedCar}
            onChange={(e) => setSelectedCar(e.target.value)}
            required
          >
            <option value="">-- выберите авто --</option>
            {cars.map((c) => (
              <option key={c.id} value={c.id}>{`${c.mark} ${c.model} (${c.license_plate})`}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="date">Выберите дату:</label>
          <input
            id="date"
            type="datetime-local"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Записаться</button>

        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default OrderCreateForm;
