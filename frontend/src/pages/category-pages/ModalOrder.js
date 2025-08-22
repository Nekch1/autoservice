import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import closeIcon from '../../assets/img/close-menu.svg';

const ModalOrder = ({ isModalOpen, closeModal }) => {
    const { user } = useContext(AuthContext);
    const [cars, setCars] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedCar, setSelectedCar] = useState("");
    const [addCarMode, setAddCarMode] = useState(false);
    const [newCar, setNewCar] = useState({ mark: "", model: "", license_plate: "" });
    const [orderDate, setOrderDate] = useState("");
    const [orderTime, setOrderTime] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const resetForm = () => {
        setSelectedCar("");
        setSelectedServices([]);
        setOrderDate("");
        setOrderTime("");
        setError("");
        setMessage("");
        setNewCar({ mark: "", model: "", license_plate: "" });
    };

    // новое состояние для всплывающего уведомления
    const [showToast, setShowToast] = useState(false);

    const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
        }
    }, [isModalOpen]);

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            fetchCars();
        }
        fetchServices();
    }, [user]);

    const fetchCars = async () => {
        try {
            const res = await axios.get(`${API}/cars`, { withCredentials: true });
            setCars(res.data.cars || res.data);
        } catch (err) {
            setCars([]);
        }
    };

    const fetchServices = async () => {
        try {
            const res = await axios.get(`${API}/services`);
            setServices(res.data);
        } catch (err) {
            setServices([]);
        }
    };

    const handleServiceChange = (serviceId) => {
        setSelectedServices((prev) =>
            prev.includes(serviceId)
                ? prev.filter((id) => id !== serviceId)
                : [...prev, serviceId]
        );
    };

        const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return; // защита от двойного клика
        setIsSubmitting(true);

        setError("");
        setMessage("");

        if (!orderDate || !orderTime || selectedServices.length === 0) {
            setError("Выберите дату, время и хотя бы одну услугу");
            setIsSubmitting(false);
            return;
        }

        let carId = selectedCar;
        let carData = null;

        if (!user) {
            if (!newCar.mark || !newCar.model || !newCar.license_plate) {
                setError("Заполните все поля для автомобиля");
                setIsSubmitting(false);
                return;
            }
            carData = newCar;
        }
        if (!user && !email) {
            setError("Введите email");
            setIsSubmitting(false);
            return;
        }

        try {
            let createdCarId = carId;
            if (!user) {
                const carRes = await axios.post(`${API}/cars`, carData);
                createdCarId = carRes.data.id;
            }
            const orderData = {
                user_id: user ? user.id : null,
                car_id: createdCarId,
                services: selectedServices,
                order_date: orderDate,
                order_time: orderTime,
                email: user ? user.email : email
            };
            const response = await axios.post(`${API}/orders`, orderData, { withCredentials: true });
            if (response.data.success || response.status === 200) {
                resetForm()
                setError("");
                setSelectedServices([]);
                closeModal();

                setTimeout(() => {
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                }, 300);
            }
        } catch (err) {
            setError("Ошибка при создании заказа");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        resetForm();
        closeModal();
    };

    if (!isModalOpen && !showToast) return null;

    const generateTimes = () => {
        if (!orderDate) return [];
        const times = [];
        const today = new Date();
        const selectedDate = new Date(orderDate);
        const isToday = today.toDateString() === selectedDate.toDateString();
        const day = selectedDate.getDay();
        let startHour = 9;
        let endHour = day === 0 ? 14 : 18;
        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();

        for (let h = startHour; h <= endHour; h++) {
            const formattedH = String(h).padStart(2, "0");
            if (isToday && (h < currentHour || (h === currentHour && currentMinute >= 0))) {
                continue;
            }
            times.push(`${formattedH}:00`);
        }
        return times;
    };

    return (
        <>
            {isModalOpen && (
                <>
                    <div className={`modal-overlay ${isVisible ? "show" : ""}`} onClick={handleClose}></div>
                    <div className={`modal fade d-block ${isVisible ? "show" : ""}`} tabIndex="-1">
                        <div className="modal-dialog" style={{"maxWidth":"900px"}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Запись на услуги</h5>
                                    <button type="button" className="btn-close" onClick={handleClose}>
                                        <img src={closeIcon} alt="Закрыть" />
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit} className="order-from">
                                        {user ? (
                                            <>
                                                <div className="car-change">
                                                    <label>Выберите автомобиль:</label>
                                                    <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)} required>
                                                        <option value="">Выберите...</option>
                                                        {cars.map((car) => (
                                                            <option key={car.id} value={car.id}>
                                                                {car.mark} {car.model} ({car.license_plate})
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="order-service-list">
                                                    <label>Выберите услуги:</label>
                                                    {services.map((service) => (
                                                        <div key={service.id} className="order-service">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedServices.includes(service.id)}
                                                                onChange={() => handleServiceChange(service.id)}
                                                            />
                                                            <div>{service.name}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <label>Дата:</label>
                                                <input
                                                    type="date"
                                                    value={orderDate}
                                                    min={new Date().toISOString().split("T")[0]}
                                                    onChange={(e) => {
                                                        setOrderDate(e.target.value);
                                                        setOrderTime("");
                                                    }}
                                                    required
                                                />
                                                <label>Время:</label>
                                                <select
                                                    className="car-select"
                                                    style={{height:'61px'}}
                                                    value={orderTime}
                                                    onChange={(e) => setOrderTime(e.target.value)}
                                                    required
                                                    disabled={!orderDate}
                                                >
                                                    <option value="">Выберите время...</option>
                                                    {generateTimes().map((time) => (
                                                        <option key={time} value={time}>{time}</option>
                                                    ))}
                                                </select>
                                                {error && <p className="error">{error}</p>}
                                                {message && <p className="success">{message}</p>}
                                                <div className="d-flex justify-content-between mt-3">
                                                    <button type="submit" className="btn bg-primary text-white w-100">{isSubmitting ? "Отправка..." : "Записаться"}</button>
                                                </div>
                                            </>
                                        ) : (
                                            <div style={{fontSize:"20px"}}>
                                                Для записи, пожалуйста, сначала зарегестрируйтесь или войдите в профиль.
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Всплывающее уведомление */}
            {showToast && (
                <div className="toast-success">
                    ✅ Вы успешно записались!
                </div>
            )}

        </>
    );
};

export default ModalOrder;
