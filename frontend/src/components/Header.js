import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';

import logo from '../assets/img/logo.svg';
import burgerMenu from '../assets/img/burger-menu.svg';
import locationIcon from '../assets/img/location.svg';
import emailIcon from '../assets/img/email.svg';
import phoneIcon from '../assets/img/phone.svg';
import whatsappIcon from '../assets/img/whatsapp-icon.svg';
import closeIcon from '../assets/img/close-menu.svg';
import UserIconHeader from '../assets/img/user_icon_header.svg'
import { AuthContext } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Header = () => {

    const { user, logout } = useContext(AuthContext);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);


    const [isMenuOpen, setIsMenuOpen] = useState(false);      // отвечает за бургер-меню
    const [isModalOpen, setIsModalOpen] = useState(false);    // отвечает за модалку (если есть)
    const [showCatalog, setShowCatalog] = useState(false);    // отвечает за подменю "Каталог"
    const [isCatalogOpen, setCatalogOpen] = useState(false);
    
    // открыть/закрыть бургер-меню
    const toggleBurgerMenu = () => {
      setIsMenuOpen(prev => !prev);
      setShowCatalog(false); // закрываем каталог при открытии/закрытии меню
    };
    
    // просто закрыть меню
    const closeBurgerMenu = () => {
      setIsMenuOpen(false);
      setShowCatalog(false); // тоже закрываем подменю на всякий случай
      
    };
    
    // открыть модалку
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    
    // показать/скрыть подменю "Каталог"
    const toggleCatalogMenu = () => setShowCatalog(prev => !prev);
    

    const toggleCatalog = () => {
        setCatalogOpen(prev => !prev);
      };
    
    return (
        <>
            <header>
                <div className="container">
                    <div className="logo my-auto">
                        <Link to="/"><img src={logo} alt="Логотип" /></Link>
                        <div className="burger-menu">
                            <img src={burgerMenu} alt="Меню" onClick={toggleBurgerMenu} />
                        </div>
                    </div>

                    <div className="header-contact my-auto">
                        <div className="working-hours d-flex flex-column gap-2">
                            <div>Пн-Сб с 9:00 до 18:00</div>
                            <div>Вс с 9:00 до 14:00</div>
                        </div>

                        <div className="contact-info d-flex flex-column gap-2">
                            <div><img src={locationIcon} alt="" /> &nbsp; г.Владимир, ул.Кулибина, 13а</div>
                            <div><img src={emailIcon} alt="" /> &nbsp; magazin-vas@mail.ru</div>
                        </div>

                        <div className="contact-info d-flex flex-column gap-2">
                            <div><img src={locationIcon} alt="" /> &nbsp; г.Владимир, ул.Куйбышева, 22д</div>
                            <div><img src={emailIcon} alt="" /> &nbsp; magazin-m7@mail.ru</div>
                        </div>
                    </div>

                    <div className="auth-section">
                        {user ? (
  
                            <div className="user-menu">
                                {user.role === 'client' && (
                                    <Link to="/profile" aria-label="Профиль пользователя"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g id="about"><path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z"/><path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z"/></g></svg></Link>
                                )}

                                {user.role === 'admin' && (
                                    <Link to="/admin-dashboard" aria-label="Панель администратора"><svg height="32px" id="Layer_3" version="1.1" viewBox="0 0 48 48" width="32px"><g><path d="M23.999,22.863c-10.014,0-18.131,8.119-18.131,18.133v1.727v3.34v1.906h36.264v-1.906v-2.189v-2.877   C42.132,30.982,34.013,22.863,23.999,22.863z" fill="#241F20"/><path d="M14.479,15.936l1.859-0.656c0.502,0.837,1.148,1.593,1.916,2.236l-0.898,1.877l4.033,1.928l0.896-1.877   c0.963,0.189,1.933,0.22,2.88,0.095l0.682,1.934l3.371-1.191l-0.674-1.904c0.864-0.507,1.636-1.168,2.298-1.957l1.875,0.897   l1.923-4.02L32.763,12.4c0.195-0.986,0.225-1.983,0.09-2.951l1.858-0.655l-1.19-3.371l-1.859,0.655   c-0.499-0.834-1.144-1.587-1.907-2.229l0.898-1.879l-4.051-1.938l-0.898,1.881c-1.001-0.195-2.016-0.224-2.997-0.079l-0.63-1.785   l-3.373,1.191l0.641,1.815c-0.812,0.493-1.548,1.124-2.176,1.872l-1.879-0.898l-1.935,4.046l1.88,0.898   c-0.193,0.98-0.221,1.972-0.086,2.936l-1.859,0.655L14.479,15.936z M24,7.562c1.657,0,3,1.343,3,3s-1.343,3-3,3   c-1.657,0-3-1.343-3-3S22.343,7.562,24,7.562z" fill="#241F20"/></g></svg></Link>
                                )}
                                <button onClick={logout} className="logout-btn auth-btn">Выйти</button>
                            </div>
                        ) : (
                            <button onClick={() => setIsAuthModalOpen(true)} className="auth-btn">
                            Войти
                            </button>
                        )}
                    </div>

                </div>
                
                <nav className={`mx-auto ${isMenuOpen ? 'show-menu' : ''}`}>
                    <div
                        onMouseEnter={() => setShowCatalog(true)}
                        onMouseLeave={() => setShowCatalog(false)}
                    >
                        <Link to="/catalog" className="nav-link d-flex gap-1" id="hoverButtonCatalog">
                            <div>КАТАЛОГ</div>
                            <svg className="my-auto" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-inside-1_2054_364" fill="white">
                            <path d="M7.07104 4L3.53551 7.53554L-3.21316e-05 4L3.53551 0.464461L7.07104 4Z"/>
                            </mask>
                            <path d="M3.53551 7.53554L2.12129 8.94975L3.53551 10.364L4.94972 8.94975L3.53551 7.53554ZM5.65683 2.58579L2.12129 6.12132L4.94972 8.94975L8.48526 5.41421L5.65683 2.58579ZM4.94972 6.12132L1.41418 2.58579L-1.41425 5.41421L2.12129 8.94975L4.94972 6.12132Z" fill="#2F2F2F" mask="url(#path-1-inside-1_2054_364)"/>
                            </svg>
                        </Link>
                        {showCatalog && (
                            <div className={`catalog-menu ${showCatalog ? 'show' : ''}`} id="CatalogMenu">
                                <div className="container">
                                    <div className="catalog-item"><Link to="/catalog/service-preparation">ПОДГОТОВКА КУЗОВА</Link></div>
                                    <div className="catalog-item"><Link to="/catalog/service-painting">ПОКРАСКА КУЗОВА</Link></div>
                                    <div className="catalog-item"><Link to="/catalog/service-polishing">ПОЛИРОВКА КУЗОВА</Link></div>
                                    <div className="catalog-item"><Link to="/catalog/service-paste">ВКЛЕЙКА И ПОЛИРОВКА СТЁКОЛ</Link></div>
                                    <div className="catalog-item"><Link to="/catalog/service-plastic-repair">РЕМОНТ ПЛАСТИКА</Link></div>
                                    <div className="catalog-item"><Link to="/catalog/service-aerosols">АЭРОЗОЛИ</Link></div>
                                    <div className="catalog-item"><Link to="/catalog/service-anti-corrosion">АНТИКОРРОЗИОННАЯ ЗАЩИТА</Link></div>
                                    <div className="catalog-item"><Link to="/catalog/service-noise-insulation">ШУМОИЗОЛЯЦИЯ</Link></div>
                                    <div className="catalog-item"><Link to="/catalog/service-personal-protective ">СРЕДСТВА ИНДИВИДУАЛЬНОЙ ЗАЩИТЫ</Link></div>
                                    <div className="catalog-item"><Link to="/catalog/service-cosmetics">АВТОКОСМЕТИКА</Link></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div><Link to="/about" className="nav-link">О КОМПАНИИ</Link></div>
                    <div><Link to="/contact" className="nav-link">КОНТАКТЫ</Link></div>
                </nav>
            </header>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            <Modal isModalOpen={isModalOpen} closeModal={closeModal} />


            {isMenuOpen && (
            <div id="movingMenu" className={`moving-menu ${isMenuOpen ? 'show' : ''}`}>
                <div className="container">
                <div id="close" className="close d-flex justify-content-end">
                    <img
                    src={closeIcon}
                    onClick={toggleBurgerMenu}
                    alt=""
                    />
                </div>
                <div className="burger-items">
                    <div className="burger-item burger-nav-item" onClick={toggleCatalog}>
                    КАТАЛОГ
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <mask id="path-1-inside-1_2048_102" fill="white">
                        <path d="M7.07129 4L3.53575 0.464461L0.000212009 4L3.53575 7.53554L7.07129 4Z"/>
                        </mask>
                        <path d="M3.53575 0.464461L2.12154 -0.949752L3.53575 -2.36397L4.94996 -0.949752L3.53575 0.464461ZM5.65708 5.41421L2.12154 1.87868L4.94996 -0.949752L8.4855 2.58579L5.65708 5.41421ZM4.94996 1.87868L1.41443 5.41421L-1.414 2.58579L2.12154 -0.949752L4.94996 1.87868Z" fill="#2F2F2F" mask="url(#path-1-inside-1_2048_102)"/>
                        </svg>
                    </div>
                    {isCatalogOpen && (
                        <div className={`burger-catalog-menu ${isCatalogOpen ? 'open' : ''}`}>
                            <div className="catalog-item"><Link to="/catalog/service-preparation" onClick={closeBurgerMenu}>ПОДГОТОВКА КУЗОВА</Link></div>
                            <div className="catalog-item"><Link to="/catalog/service-painting" onClick={closeBurgerMenu}>ПОКРАСКА КУЗОВА</Link></div>
                            <div className="catalog-item"><Link to="/catalog/service-polishing" onClick={closeBurgerMenu}>ПОЛИРОВКА КУЗОВА</Link></div>
                            <div className="catalog-item"><Link to="/catalog/service-paste" onClick={closeBurgerMenu}>ВКЛЕЙКА И ПОЛИРОВКА СТЁКОЛ</Link></div>
                            <div className="catalog-item"><Link to="/catalog/service-plastic-repair" onClick={closeBurgerMenu}>РЕМОНТ ПЛАСТИКА</Link></div>
                            <div className="catalog-item"><Link to="/catalog/service-aerosols" onClick={closeBurgerMenu}>АЭРОЗОЛИ</Link></div>
                            <div className="catalog-item"><Link to="/catalog/service-anti-corrosion-protection" onClick={closeBurgerMenu}>АНТИКОРРОЗИОННАЯ ЗАЩИТА</Link></div>
                            <div className="catalog-item"><Link to="/catalog/service-noise-insulation" onClick={closeBurgerMenu}>ШУМОИЗОЛЯЦИЯ</Link></div>
                            <div className="catalog-item"><Link to="/catalog/service-protect" onClick={closeBurgerMenu}>СРЕДСТВА ИНДИВИДУАЛЬНОЙ ЗАЩИТЫ</Link></div>
                            <div className="catalog-item"><Link to="/catalog/service-cosmetics" onClick={closeBurgerMenu}>АВТОКОСМЕТИКА</Link></div>
                        </div>
                    )}

                    <div className="burger-item burger-nav-item"><Link to="/about"  onClick={closeBurgerMenu}>О КОМПАНИИ</Link></div>
                    <div className="burger-item burger-nav-item"><Link to="/contact"  onClick={closeBurgerMenu}>КОНТАКТЫ</Link></div>
                    <div className="burger-item">Пн-Сб с 9:00 до 18:00 &nbsp; Вс с 9:00 до 14:00</div>
                    <div className="burger-item"><img src={locationIcon} alt="" /> &nbsp; г.Владимир, ул.Кулибина, 13а</div>
                    <div className="burger-item"><img src={locationIcon} alt="" /> &nbsp; г.Владимир, ул.Куйбышева, 22д</div>
                    <div className="burger-item"><img src={phoneIcon} alt="" /> 8-905-612-25-18</div>
                    <div className="burger-item"><img src={whatsappIcon} alt="" /> 8(4922)-600-217</div>
                </div>
                </div>
            </div>
            )}

        </>
    );
};

export default Header;
