import React, { useState } from "react";
import locationIcon from '../assets/img/location.svg';
import emailIcon from '../assets/img/email.svg';
import phoneIcon from '../assets/img/phone.svg';
import Modal from './Modal'; // Импортируем новый компонент

const ContactBlock = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            {/* Подключаем модальное окно */}
            <Modal isModalOpen={isModalOpen} closeModal={closeModal} />

            <section className="contacts">
                <div className="container">
                    <div className="title text-primary text-center">КОНТАКТЫ</div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="contact-block">
                                <div><img src={locationIcon} alt="" /> &nbsp; г.Владимир, ул.Кулибина, 13а</div>
                                <div>
                                    <span><img src={emailIcon} alt="" /> &nbsp; magazin-vas@mail.ru</span>
                                    <span><img src={phoneIcon} alt="" /> &nbsp; +7-(4922)-600-200</span>
                                </div>
                            </div>
                            <div className="contact-block">
                                <div><img src={locationIcon} alt="" /> &nbsp; г.Владимир, Куйбышева 22Д, к1</div>
                                <div>
                                    <span><img src={emailIcon} alt="" /> &nbsp; magazin-m7@mail.ru</span>
                                    <span><img src={phoneIcon} alt="" /> &nbsp; +7-(4922)-600-200</span>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-6 requisite">
                            <div className="contact-block">
                                <div>Реквизиты</div>
                                <div>
                                    <span>ИНН: XXXXXXXXXXX</span>
                                    <span>ОГРН: XXXXXXXXXXXXXXX</span>
                                    <span>Расчетный счет: XXXX XXXX XXXX XXXX XXXX</span>
                                </div>
                            </div>
                            {/* <button className="bg-primary text-white" onClick={openModal}>ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ</button> */}
                        </div>
                        <div className="col-md-6 btn-consultation">
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactBlock;
