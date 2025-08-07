import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

const GarageBlock = () => {
    const { user } = useContext(AuthContext);
    const [isGarageMenu, setGarageOpen] = useState(false);
    const [showGarageMenu, setShowGarageMenu] = useState(false);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const [carForm, setCarForm] = useState({
        mark: "",
        model: "",
        production_year: "",
        license_plate: ""
    });
    
    const [editMode, setEditMode] = useState(false);
    const [editCarId, setEditCarId] = useState(null);

    useEffect(() => {
        fetchCars();
    }, [currentPage]);

    const fetchCars = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/cars`, {
                params: { page: currentPage, limit: 5 },
                withCredentials: true
            });
            
            setCars(response.data.cars);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        } catch (err) {
            setError('Ошибка при загрузке автомобилей');
            setLoading(false);
            console.error('Ошибка загрузки автомобилей:', err);
        }
    };

    const openGarageMenu = (car = null) => {
        if (car) {
            setCarForm({
                mark: car.mark,
                model: car.model,
                production_year: car.production_year,
                license_plate: car.license_plate || ""
            });
            setEditMode(true);
            setEditCarId(car.id);
        } else {
            setCarForm({
                mark: "",
                model: "",
                production_year: "",
                license_plate: ""
            });
            setEditMode(false);
            setEditCarId(null);
        }
        
        setGarageOpen(true);
        setTimeout(() => setShowGarageMenu(true), 10);
    };

    const closeGarageMenu = () => {
        setShowGarageMenu(false);
        setTimeout(() => setGarageOpen(false), 300);
    };

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        const fieldName = id.replace('car', '').toLowerCase();
        
        setCarForm(prev => ({
            ...prev,
            [fieldName === 'make' ? 'mark' : fieldName]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (!carForm.mark || !carForm.model || !carForm.production_year) {
                alert('Пожалуйста, заполните обязательные поля: Марка, Модель и Год выпуска');
                return;
            }
            
            const apiUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/cars`;
            
            if (editMode) {
                await axios.put(`${apiUrl}/${editCarId}`, {
                    mark: carForm.mark,
                    model: carForm.model,
                    production_year: parseInt(carForm.production_year),
                    license_plate: carForm.license_plate
                }, { withCredentials: true });
            } else {
                await axios.post(apiUrl, {
                    mark: carForm.mark,
                    model: carForm.model,
                    production_year: parseInt(carForm.production_year),
                    license_plate: carForm.license_plate
                }, { withCredentials: true });
            }
            
            fetchCars();
            closeGarageMenu();
        } catch (err) {
            console.error('Ошибка сохранения автомобиля:', err);
            alert('Произошла ошибка при сохранении автомобиля');
        }
    };

    const handleDelete = async (carId) => {
        if (window.confirm('Вы действительно хотите удалить этот автомобиль?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/cars/${carId}`, {
                    withCredentials: true
                });
                
                fetchCars();
            } catch (err) {
                console.error('Ошибка удаления автомобиля:', err);
                alert('Произошла ошибка при удалении автомобиля');
            }
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <>
            {isGarageMenu && (
                <>
                    <div className={`modal-overlay ${showGarageMenu ? "show" : ""}`} onClick={closeGarageMenu}></div>
                    <div className={`modal show d-block ${showGarageMenu ? "d-block" : ""}`} tabIndex="-1" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {editMode ? "Редактировать автомобиль" : "Добавить автомобиль"}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Закрыть"
                                        onClick={closeGarageMenu}
                                    >
                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 0C6.2 0 0 6.2 0 14C0 21.8 6.2 28 14 28C21.8 28 28 21.8 28 14C28 6.2 21.8 0 14 0ZM19.4 21L14 15.6L8.6 21L7 19.4L12.4 14L7 8.6L8.6 7L14 12.4L19.4 7L21 8.6L15.6 14L21 19.4L19.4 21Z" fill="#0059C2"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form id="carForm">
                                        <div className="mb-4">
                                            <input 
                                                type="text" 
                                                id="carMake" 
                                                placeholder="Марка" 
                                                value={carForm.mark}
                                                onChange={handleFormChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input 
                                                type="text" 
                                                id="model" 
                                                placeholder="Модель" 
                                                value={carForm.model}
                                                onChange={handleFormChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input 
                                                type="number" 
                                                id="production_year" 
                                                placeholder="Год выпуска" 
                                                value={carForm.production_year}
                                                onChange={handleFormChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input 
                                                type="text" 
                                                id="license_plate" 
                                                placeholder="Гос. номер" 
                                                value={carForm.license_plate}
                                                onChange={handleFormChange}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer ">
                                    <div className="row w-100">
                                        <div className="">
                                            <button 
                                                type="button" 
                                                className="btn bg-primary text-white w-100"
                                                onClick={handleSubmit}
                                            >
                                                {editMode ? "Сохранить" : "Добавить"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <section className="garage-block">
                <div className="container">
                    <div className="garage profile-block">
                        <div className="d-flex justify-content-between">
                            <div className="title">Мой гараж</div>
                            <div className="add-auto" onClick={() => openGarageMenu()}>
                                Добавить автомобиль
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center mt-4">Загрузка...</div>
                        ) : error ? (
                            <div className="text-center mt-4 text-danger">{error}</div>
                        ) : cars.length === 0 ? (
                            <div className="empty">В вашем гараже пока пусто</div>
                        ) : (
                            <>
                                <div id="garageList" className="list-group">
                                    {cars.map(car => (
                                        <div key={car.id} className="car-item mb-3 p-3 ">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <h3>{car.mark} {car.model}</h3>
                                                    <p><strong>Год выпуска:</strong> {car.production_year}</p>
                                                    {car.license_plate && <p><strong>Гос. номер:</strong> {car.license_plate}</p>}
                                                    <button 
                                                        className="btn btn-edit bg-primary text-white"
                                                        onClick={() => openGarageMenu(car)}
                                                    >
                                                        Редактировать
                                                    </button>
                                                </div>
                                                <div className="col-md-4 d-flex justify-content-end align-items-center car-edit-block">

                                                    <button 
                                                        className="btn btn-delete"
                                                        onClick={() => handleDelete(car.id)}
                                                    >
                                                        Удалить
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {totalPages > 1 && (
                                    <div className="pagination d-flex justify-content-center mt-4">
                                        <button 
                                            className="btn me-2 bg-primary text-white" 
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                        >
                                            Предыдущая
                                        </button>
                                        <span className="d-flex align-items-center mx-2">
                                            {currentPage} из {totalPages}
                                        </span>
                                        <button 
                                            className="btn ms-2 bg-primary text-white" 
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                        >
                                            Следующая
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default GarageBlock;