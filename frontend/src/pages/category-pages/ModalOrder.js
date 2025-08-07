// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";
// import closeIcon from '../../assets/img/close-menu.svg';

// const ModalOrder = ({ isModalOpen, closeModal }) => {
//     const { user } = useContext(AuthContext);
//     const [cars, setCars] = useState([]);
//     const [services, setServices] = useState([]);
//     const [selectedServices, setSelectedServices] = useState([]);
//     const [selectedCar, setSelectedCar] = useState("");
//     const [addCarMode, setAddCarMode] = useState(false);
//     const [newCar, setNewCar] = useState({ mark: "", model: "", license_plate: "" });
//     const [orderDate, setOrderDate] = useState("");
//     const [orderTime, setOrderTime] = useState("");
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState("");
//     const [error, setError] = useState("");
//     const [isVisible, setIsVisible] = useState(false);

//     const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

//     useEffect(() => {
//         if (isModalOpen) {
//             setTimeout(() => setIsVisible(true), 10);
//         } else {
//             setIsVisible(false);
//         }
//     }, [isModalOpen]);

//     useEffect(() => {
//         if (user) {
//             setEmail(user.email);
//             fetchCars();
//         }
//         fetchServices();
//     }, [user]);

//     const fetchCars = async () => {
//         try {
//             const res = await axios.get(`${API}/cars`, { withCredentials: true });
//             setCars(res.data.cars || res.data);
//         } catch (err) {
//             setCars([]);
//         }
//     };

//     const fetchServices = async () => {
//         try {
//             const res = await axios.get(`${API}/services`);
//             setServices(res.data);
//         } catch (err) {
//             setServices([]);
//         }
//     };

//     const handleServiceChange = (serviceId) => {
//         setSelectedServices((prev) =>
//             prev.includes(serviceId)
//                 ? prev.filter((id) => id !== serviceId)
//                 : [...prev, serviceId]
//         );
//     };

//     const handleAddCar = async () => {
//         if (!newCar.mark || !newCar.model || !newCar.license_plate) {
//             setError("Заполните все поля для автомобиля");
//             return;
//         }
//         try {
//             const res = await axios.post(`${API}/cars`, newCar, { withCredentials: true });
//             setCars([...cars, res.data]);
//             setSelectedCar(res.data.id);
//             setAddCarMode(false);
//             setNewCar({ mark: "", model: "", license_plate: "" });
//             setError("");
//         } catch (err) {
//             setError("Ошибка при добавлении авто");
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setMessage("");
//         if (!orderDate || !orderTime || selectedServices.length === 0) {
//             setError("Выберите дату, время и хотя бы одну услугу");
//             return;
//         }
//         let carId = selectedCar;
//         let carData = null;

//         if (!user) {
//             if (!newCar.mark || !newCar.model || !newCar.license_plate) {
//                 setError("Заполните все поля для автомобиля");
//                 return;
//             }
//             carData = newCar;
//         }
//         if (!user && !email) {
//             setError("Введите email");
//             return;
//         }
//         try {
//             let createdCarId = carId;
//             if (!user) {
//                 const carRes = await axios.post(`${API}/cars`, carData);
//                 createdCarId = carRes.data.id;
//             }
//             const orderData = {
//                 user_id: user ? user.id : null,
//                 car_id: createdCarId,
//                 services: selectedServices,
//                 order_date: orderDate,
//                 order_time: orderTime,
//                 email: user ? user.email : email
//             };
//             const response = await axios.post(`${API}/orders`, orderData, { withCredentials: true });
//             if (response.data.success || response.status === 200) {
//                 alert("Вы успешно записались!");
//                 setError("");
//                 setSelectedServices([]);
//                 closeModal();
//             }
//         } catch (err) {
//             setError("Ошибка при создании заказа");
//         }
//     };

//     if (!isModalOpen) return null;

//     return (
//         <>
//             <div className={`modal-overlay ${isVisible ? "show" : ""}`} onClick={closeModal}></div>

//             <div className={`modal fade d-block ${isVisible ? "show" : ""}`} tabIndex="-1">
//                 <div className="modal-dialog" style={{"maxWidth":"900px"}}>
//                     <div className="modal-content">

//                         <div className="modal-header">
//                             <h5 className="modal-title">Запись на услуги</h5>
//                             <button type="button" className="btn-close" onClick={closeModal}>
//                                 <img src={closeIcon} alt="Закрыть" />
//                             </button>
//                         </div>

//                         <div className="modal-body">
//                             <form onSubmit={handleSubmit} className="order-from">
//                                 {user ? (
//                                     <div className="car-change">
//                                         <label>Выберите автомобиль:</label>
//                                         <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)} required>
//                                             <option value="">Выберите...</option>
//                                             {cars.map((car) => (
//                                                 <option key={car.id} value={car.id}>
//                                                     {car.mark} {car.model} ({car.license_plate})
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         {/* <button type="button" onClick={() => setAddCarMode(!addCarMode)}>
//                                             {addCarMode ? "Отмена" : "Добавить авто"}
//                                         </button> */}
//                                     </div>
                                    
                                    
//                                 ) 
//                                 : (
//                                     <div className="car-add-order">
//                                         <label>Введите данные автомобиля:</label>
//                                         <input
//                                             placeholder="Марка"
//                                             value={newCar.mark}
//                                             onChange={(e) => setNewCar({ ...newCar, mark: e.target.value })}
//                                         />
//                                         <input
//                                             placeholder="Модель"
//                                             value={newCar.model}
//                                             onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
//                                         />
//                                         <input
//                                             placeholder="Номер"
//                                             value={newCar.license_plate}
//                                             onChange={(e) => setNewCar({ ...newCar, license_plate: e.target.value })}
//                                         />
//                                         <label style={{"margin-top":"30px"}}>Введите email</label>
//                                         <input
//                                             placeholder="Email"
//                                             value={email}
//                                             onChange={(e) => setEmail(e.target.value)}
//                                         />
//                                     </div>
//                                     // <div>Для записи, сначала зарегестрируйтесь или войдети в профиль</div>
//                                 )
//                                 }

//                                 {/* {addCarMode && (
//                                     <div>
//                                         <input
//                                             placeholder="Марка"
//                                             value={newCar.mark}
//                                             onChange={(e) => setNewCar({ ...newCar, mark: e.target.value })}
//                                         />
//                                         <input
//                                             placeholder="Модель"
//                                             value={newCar.model}
//                                             onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
//                                         />
//                                         <input
//                                             placeholder="Номер"
//                                             value={newCar.license_plate}
//                                             onChange={(e) => setNewCar({ ...newCar, license_plate: e.target.value })}
//                                         />
//                                         <button type="button" onClick={handleAddCar}>Добавить авто</button>
//                                     </div>
//                                 )} */}

//                                 <div className="order-service-list">
//                                     <label>Выберите услуги:</label>
//                                     {services.map((service) => (
//                                     <div key={service.id} className="order-service">
//                                         <input
//                                             type="checkbox"
//                                             checked={selectedServices.includes(service.id)}
//                                             onChange={() => handleServiceChange(service.id)}
//                                         />
//                                         <div>{service.name}</div>
                                        
//                                     </div>
//                                 ))}
//                                 </div>

//                                 <label>Дата:</label>
//                                 <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />
//                                 <label>Время:</label>
//                                 <input type="time" value={orderTime} onChange={(e) => setOrderTime(e.target.value)} required />

//                                 {error && <p className="error">{error}</p>}
//                                 {message && <p className="success">{message}</p>}

//                                 <div className="d-flex justify-content-between mt-3">
//                                     <button type="submit" className="btn bg-primary text-white w-100">Записаться</button>
//                                     {/* <button type="button" className="btn btn-secondary" onClick={closeModal}>Отмена</button> */}
//                                 </div>
//                             </form>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ModalOrder;








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

    const handleAddCar = async () => {
        if (!newCar.mark || !newCar.model || !newCar.license_plate) {
            setError("Заполните все поля для автомобиля");
            return;
        }
        try {
            const res = await axios.post(`${API}/cars`, newCar, { withCredentials: true });
            setCars([...cars, res.data]);
            setSelectedCar(res.data.id);
            setAddCarMode(false);
            setNewCar({ mark: "", model: "", license_plate: "" });
            setError("");
        } catch (err) {
            setError("Ошибка при добавлении авто");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        if (!orderDate || !orderTime || selectedServices.length === 0) {
            setError("Выберите дату, время и хотя бы одну услугу");
            return;
        }
        let carId = selectedCar;
        let carData = null;

        if (!user) {
            if (!newCar.mark || !newCar.model || !newCar.license_plate) {
                setError("Заполните все поля для автомобиля");
                return;
            }
            carData = newCar;
        }
        if (!user && !email) {
            setError("Введите email");
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
                alert("Вы успешно записались!");
                setError("");
                setSelectedServices([]);
                closeModal();
            }
        } catch (err) {
            setError("Ошибка при создании заказа");
        }
    };

    if (!isModalOpen) return null;

    return (
        <>
            <div className={`modal-overlay ${isVisible ? "show" : ""}`} onClick={closeModal}></div>

            <div className={`modal fade d-block ${isVisible ? "show" : ""}`} tabIndex="-1">
                <div className="modal-dialog" style={{"maxWidth":"900px"}}>
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Запись на услуги</h5>
                            <button type="button" className="btn-close" onClick={closeModal}>
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
                                        {/* <button type="button" onClick={() => setAddCarMode(!addCarMode)}>
                                            {addCarMode ? "Отмена" : "Добавить авто"}
                                        </button> */}
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
                                <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />
                                <label>Время:</label>
                                <input type="time" value={orderTime} onChange={(e) => setOrderTime(e.target.value)} required />

                                {error && <p className="error">{error}</p>}
                                {message && <p className="success">{message}</p>}

                                <div className="d-flex justify-content-between mt-3">
                                    <button type="submit" className="btn bg-primary text-white w-100">Записаться</button>
                                    {/* <button type="button" className="btn btn-secondary" onClick={closeModal}>Отмена</button> */}
                                </div>
                                </>
                                    
                                    
                                ) 
                                : (
                                    // <div className="car-add-order">
                                    //     <label>Введите данные автомобиля:</label>
                                    //     <input
                                    //         placeholder="Марка"
                                    //         value={newCar.mark}
                                    //         onChange={(e) => setNewCar({ ...newCar, mark: e.target.value })}
                                    //     />
                                    //     <input
                                    //         placeholder="Модель"
                                    //         value={newCar.model}
                                    //         onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                                    //     />
                                    //     <input
                                    //         placeholder="Номер"
                                    //         value={newCar.license_plate}
                                    //         onChange={(e) => setNewCar({ ...newCar, license_plate: e.target.value })}
                                    //     />
                                    //     <label style={{"margin-top":"30px"}}>Введите email</label>
                                    //     <input
                                    //         placeholder="Email"
                                    //         value={email}
                                    //         onChange={(e) => setEmail(e.target.value)}
                                    //     />
                                    // </div>
                                    <div style={{"font-size":"20px"}}>Для записи, пожалуйста, сначала зарегестрируйтесь или войдите в профиль.</div>
                                )
                                }

                                {/* {addCarMode && (
                                    <div>
                                        <input
                                            placeholder="Марка"
                                            value={newCar.mark}
                                            onChange={(e) => setNewCar({ ...newCar, mark: e.target.value })}
                                        />
                                        <input
                                            placeholder="Модель"
                                            value={newCar.model}
                                            onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                                        />
                                        <input
                                            placeholder="Номер"
                                            value={newCar.license_plate}
                                            onChange={(e) => setNewCar({ ...newCar, license_plate: e.target.value })}
                                        />
                                        <button type="button" onClick={handleAddCar}>Добавить авто</button>
                                    </div>
                                )} */}


                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalOrder;
