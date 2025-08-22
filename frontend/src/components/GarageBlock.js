import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import carData from '../assets/file/cars.json'
import axios from "axios";
import closeIcon from '../assets/img/close-menu.svg';

const GarageBlock = () => {
    const { user } = useContext(AuthContext);
    const [isGarageMenu, setGarageOpen] = useState(false);
    const [showGarageMenu, setShowGarageMenu] = useState(false);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    ////
    const [allCarData, setAllCarData] = useState([]);
    const [availableMakes, setAvailableMakes] = useState([]);
    const [availableModels, setAvailableModels] = useState([]);

    useEffect(() => {
        setAllCarData(carData);
        setAvailableMakes(carData.map(make => make["name"]));
    }, [])

    ////
    
    const [carForm, setCarForm] = useState({
        mark: "",
        model: "",
        production_year: "",
        license_plate: ""
    });


    ///////
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCarId, setSelectedCarId] = useState(null);
    ///////


    const [minYear, setMinYear] = useState(1900);
    const [maxYear, setMaxYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const selectedMake = allCarData.find(make => make.name === carForm.mark);
        const selectedModel = selectedMake?.models.find(model => model.name === carForm.model);

        if (selectedModel) {
            const currentYear = new Date().getFullYear();
            const from = selectedModel["year-from"] || 1900;
            const to = Math.min(selectedModel["year-to"] || currentYear, currentYear);

            setMinYear(from);
            setMaxYear(to);

            // Если текущее значение вне допустимого диапазона — корректируем
            if (carForm.production_year < from || carForm.production_year > to) {
                setCarForm(prev => ({
                    ...prev,
                    production_year: to
                }));
            }
        }
    }, [carForm.mark, carForm.model]);

    ///////
    
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
        // setCarForm(initialState);
        setTimeout(() => setGarageOpen(false), 100);
        setFormErrors({});
    };

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        const fieldName = id.replace('car', '').toLowerCase();

        const newForm = {
            ...carForm,
            [fieldName === 'make' ? 'mark' : fieldName]: value
        };

        setCarForm(newForm);

        if (fieldName === 'make') {
            const selectedMake = carData.find(make => make.name === value);
            const models = selectedMake ? selectedMake.models.map(model => model.name) : [];
            setAvailableModels(models);
            setCarForm(prev => ({ ...prev, model: "" }));
        }
    };

    const [formErrors, setFormErrors] = useState({});


    const [licensePlateError, setLicensePlateError] = useState(false);
    const fullLicensePattern = /^[А-ВЕКМНОРСТУХ]{1}\d{3}[А-ВЕКМНОРСТУХ]{2}\s\d{2,3}$/;
    const handleSubmit = async () => {
        const errors = {};

        if (!carForm.mark) errors.mark = "Выберите марку автомобиля";
        if (!carForm.model) errors.model = "Выберите модель автомобиля";
        if (!carForm.production_year) errors.production_year = "Выберите год выпуска";

        const license = carForm.license_plate.trim();

        // Гос. номер не обязателен, но если введён — должен быть валидным
        if (license && !fullLicensePattern.test(license)) {
            errors.license_plate = "Неверный формат. Пример: А123ВС 77";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;

        try {
            const apiUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/cars`;

            if (editMode) {
                await axios.put(`${apiUrl}/${editCarId}`, {
                    mark: carForm.mark,
                    model: carForm.model,
                    production_year: parseInt(carForm.production_year),
                    license_plate: license || null
                }, { withCredentials: true });
            } else {
                await axios.post(apiUrl, {
                    mark: carForm.mark,
                    model: carForm.model,
                    production_year: parseInt(carForm.production_year),
                    license_plate: license || null
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


/////////////
  const allowedLetters = ['А', 'В', 'Е', 'К', 'М', 'Н', 'О', 'Р', 'С', 'Т', 'У', 'Х'];

const handleLicensePlateChange = (e) => {
    let value = e.target.value.toUpperCase();

    // Если пользователь набирает символ, а не стирает
    if (
        value.length === 6 &&                // ровно 6 символов
        !value.includes(' ') &&              // пробела ещё нет
        e.nativeEvent.inputType !== "deleteContentBackward" // не Backspace
    ) {
        value += ' ';
    }

    const format = [
        /^[А-ЯA-Z]$/,         // 1: буква
        /^\d$/,               // 2: цифра
        /^\d$/,               // 3: цифра
        /^\d$/,               // 4: цифра
        /^[А-ЯA-Z]$/,         // 5: буква
        /^[А-ЯA-Z]$/,         // 6: буква
        /^\s$/,               // 7: пробел
        /^\d$/,               // 8: цифра
        /^\d$/,               // 9: цифра
        /^\d?$/,              // 10 (опц.): цифра
    ];

    const chars = value.split("");

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];

        // Проверяем разрешённые буквы
        if (format[i] && format[i].toString().includes('[А-ЯA-Z]')) {
            if (!allowedLetters.includes(char)) return;
        }

        if (!format[i] || !format[i].test(char)) return;
    }

    setCarForm(prev => ({
        ...prev,
        license_plate: value
    }));
};
//////////





/////



const handleDeleteClick = (carId) => {
  setSelectedCarId(carId);
  setShowDeleteModal(true);
};

const confirmDelete = async () => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/cars/${selectedCarId}`, {
      withCredentials: true
    });
    fetchCars();
    setShowDeleteModal(false);
    setSelectedCarId(null);
  } catch (err) {
    console.error('Ошибка удаления автомобиля:', err);
    alert('Произошла ошибка при удалении автомобиля');
  }
};

/////

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
                                            <select className="car-select" id="carMake" value={carForm.mark} onChange={handleFormChange}>
                                                <option value="">Выберите марку</option>
                                                {availableMakes.map(make => (
                                                    <option key={make} value={make}>{make}</option>
                                                ))}
                                            </select>
                                            {formErrors.mark && <p className="text-danger mt-1">{formErrors.mark}</p>}
                                        </div>

                                        <div className="mb-4">
                                            <select  className="car-select" id="model" value={carForm.model} onChange={handleFormChange} disabled={!availableModels.length}>
                                                <option value="">Выберите модель</option>
                                                {availableModels.map(model => (
                                                    <option key={model} value={model}>{model}</option>
                                                ))}
                                            </select>
                                            {formErrors.model && <p className="text-danger mt-1">{formErrors.model}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <select
                                                className="car-select"  
                                                id="production_year"
                                                value={carForm.production_year}
                                                onChange={handleFormChange}
                                                disabled={!carForm.model}
                                            >
                                                <option value="">Выберите год выпуска</option>
                                                {Array.from({ length: maxYear - minYear + 1 }, (_, i) => {
                                                    const year = maxYear - i;
                                                    return <option key={year} value={year}>{year}</option>;
                                                })}
                                            </select>
                                            {formErrors.production_year && <p className="text-danger mt-1">{formErrors.production_year}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                id="license_plate"
                                                placeholder="Гос. номер"
                                                value={carForm.license_plate}
                                                onChange={handleLicensePlateChange}
                                                style={{
                                                    borderColor: formErrors.license_plate ? 'red' : '#ccc',
                                                    borderWidth: '1px',
                                                    padding: '6px',
                                                    outline: 'none',
                                                }}
                                            />
                                            {formErrors.license_plate && (
                                                <p className="text-danger mt-1">{formErrors.license_plate}</p>
                                            )}
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
                                                <div className="col-8">
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
                                                <div className="col-4 edit-block">

                                                    <button 
                                                        className="btn btn-delete"
                                                        onClick={() => handleDeleteClick(car.id)}
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
                                            Назад
                                        </button>
                                        <span className="d-flex align-items-center mx-2">
                                            {currentPage} / {totalPages}
                                        </span>
                                        <button 
                                            className="btn ms-2 bg-primary text-white" 
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                        >
                                            Вперёд
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>

            {showDeleteModal && (
                <div className="modal fade show confirm" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title">Вы действительно хотите удалить этот автомобиль?</h5>
                        
                        <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}>
                            <img src={closeIcon} alt="Закрыть" />
                        </button>
                        </div>
                        <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Отмена</button>
                        <button className="btn btn-delete" onClick={confirmDelete}>Удалить</button>
                        </div>
                    </div>
                    </div>
                </div>
                )}
        </>
    );
};

export default GarageBlock;