import React from "react";
import { Link } from "react-router-dom";

import logoWhite from '../assets/img/logo-white.svg';
import emailWhite from '../assets/img/email-white.svg';
import phoneWhite from '../assets/img/phone-white.svg';
import logoGS from '../assets/img/logo-gs.svg';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-white mt-5 pt-4 pb-3">
      <div className="container">
        <div className="row align-items-center">

          {/* Логотип */}
          <div className="col-lg-2 mb-3 mb-lg-0">
            <Link to="/">
              <img src={logoWhite} alt="Логотип" />
            </Link>
          </div>

          {/* График и политика */}
          <div className="col-lg-8 mb-3 mb-lg-0">
            <div className="row">
              <div className="col-lg-6 mb-2">
                <div>Пн-Сб с 9:00 до 18:00</div>
                <div>Вс с 9:00 до 14:00</div>
                <div className="mt-2">
                  <Link to="/policy" className="text-white text-decoration-underline">
                    Политика обработки информации
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-2">
                  <img src={emailWhite} alt="email" /> &nbsp; magazin-vas@mail.ru
                </div>
                <div className="mb-2">
                  <img src={phoneWhite} alt="phone" /> &nbsp; 8-905-612-25-18
                </div>
                <div className="text-white">2024 © ИП Кулибаба Ю. В</div>
              </div>
            </div>
          </div>

          {/* Пустая колонка (можно убрать или использовать) */}
          {/* <div className="col-lg-2 d-none d-lg-block"></div> */}

          {/* Разработка сайта */}
          {/* <div className="col-lg-2 text-lg-end text-center mb-3 mb-lg-0">
            <div>Разработка сайта:</div>
            <Link to="/profile">
              <img src={logoGS} alt="Разработчик" />
            </Link>
          </div> */}

          {/* Кнопка scroll to top */}
          <div className="col-lg-2 text-end">
            <div onClick={scrollToTop} style={{ cursor: 'pointer' }}>
              <svg id="scrollToTop" className="back-to-top" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <path d="M25 3C20.6 3 16.4 4.3 12.8 6.7C9.2 9.1 6.3 12.6 4.7 16.6C3 20.6 2.6 25 3.4 29.3C4.3 33.6 6.4 37.5 9.4 40.6C12.5 43.6 16.4 45.7 20.7 46.6C25 47.4 29.4 47 33.4 45.3C37.4 43.7 40.9 40.8 43.3 37.2C45.7 33.6 47 29.4 47 25C47 19.2 44.7 13.6 40.6 9.4C36.4 5.3 30.8 3 25 3ZM36 24.4C35.6 24.8 35.1 25 34.6 25C34.1 25 33.6 24.8 33.3 24.4L26.9 18.1V37.6C26.9 38.1 26.7 38.6 26.4 38.9C26 39.3 25.5 39.5 25 39.5C24.5 39.5 24 39.3 23.6 38.9C23.3 38.6 23.1 38.1 23.1 37.6V18.3L17 24.4C16.6 24.8 16.1 25 15.6 25C15.1 25 14.6 24.8 14.2 24.4C13.9 24 13.7 23.5 13.7 23C13.7 22.5 13.9 22 14.2 21.7L25.1 10.8L36 21.7C36.2 21.9 36.3 22.1 36.4 22.3C36.5 22.5 36.6 22.8 36.6 23C36.6 23.3 36.5 23.6 36.4 23.8C36.3 24 36.2 24.2 36 24.4Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
