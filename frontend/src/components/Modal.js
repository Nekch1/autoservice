import React, { useEffect, useState } from "react";
import closeIcon from '../assets/img/close-menu.svg';

const Modal = ({ isModalOpen, closeModal }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
        }
    }, [isModalOpen]);

    if (!isModalOpen) return null;

    return (
        <>
            <div className={`modal-overlay ${isVisible ? "show" : ""}`} onClick={closeModal}></div>

            <div className={`modal fade d-block ${isVisible ? "show" : ""}`} id="exampleModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Оставьте заявку, и мы свяжемся с вами для уточнения деталей
                            </h5>
                            <button type="button" className="btn-close" onClick={closeModal} aria-label="Закрыть">
                                <img src={closeIcon} alt="Закрыть" />
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-4">
                                    <input type="text" placeholder="Ваше имя" />
                                </div>
                                <div className="mb-4">
                                    <input type="tel" placeholder="+7 (777) - 777 - 77 - 77" />
                                </div>
                                <div className="mb-4">
                                    <input type="email" placeholder="E-mail" />
                                </div>
                                <div className="mb-4">
                                    <input type="text" className="question-input" placeholder="Напишите суть вопроса" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer col-12">
                            <div className="row w-100">
                                <div className="col-md-8">
                                    Я даю согласие на обработку персональных данных <br />
                                    и соглашаетесь с условиями политики конфиденциальности
                                </div>
                                <div className="col-md-4">
                                    <button type="button" className="btn bg-primary text-white">Отправить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
