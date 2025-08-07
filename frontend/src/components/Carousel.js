import React from 'react';
import SliderImg from '../assets/img/slider-img.jpg'
import SliderImg2 from '../assets/img/slider-img-2.png'
import { Link } from 'react-router-dom';

const Carousel = () => {
  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={SliderImg} className="d-block slider-img" alt="..." />
          <div className="carousel-caption d-block">
            <div>
              ВСЁ ДЛЯ ПОКРАСКИ <br /> АВТОМОБИЛЕЙ!
            </div>
            <Link to='/about'>
            <button style={{
              color:'#2f2f2f',
              textDecoration:'none'
            }}>ПОДРОБНЕЕ</button></Link>
          </div>
        </div>
        <div className="carousel-item">
          <img src={SliderImg2} className="d-block w-100 slider-img" alt="..." />
          <div className="carousel-caption d-block">
            <div>
              РАСКРАСЬ СВОЙ МИР <br /> С НАМИ!
            </div>
              <Link to='/about'>
              <button style={{
              color:'#2f2f2f',
              textDecoration:'none'
            }}>УЗНАТЬ ПОДРОБНЕЕ</button></Link>
          </div>
        </div>
      </div>

      <svg className="carousel-control-prev" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_prev)">
              <path d="M2.77783 25C2.77783 29.3951 4.08114 33.6916 6.52295 37.346C8.96476 41.0004 12.4354 43.8487 16.496 45.5307C20.5566 47.2126 25.0247 47.6527 29.3354 46.7952C33.6461 45.9378 37.6057 43.8213 40.7135 40.7135C43.8214 37.6056 45.9378 33.646 46.7953 29.3353C47.6527 25.0246 47.2127 20.5565 45.5307 16.4959C43.8488 12.4353 41.0005 8.9647 37.3461 6.5229C33.6916 4.08109 29.3952 2.77777 25.0001 2.77777C19.1064 2.77777 13.454 5.11904 9.28657 9.28651C5.1191 13.454 2.77783 19.1063 2.77783 25ZM24.4028 13.8889C24.7659 14.26 24.9692 14.7586 24.9692 15.2778C24.9692 15.797 24.7659 16.2955 24.4028 16.6667L18.0556 23.0556L37.6945 23.0556C38.2102 23.0556 38.7048 23.2604 39.0694 23.6251C39.4341 23.9897 39.6389 24.4843 39.6389 25C39.6389 25.5157 39.4341 26.0103 39.0694 26.3749C38.7048 26.7396 38.2102 26.9444 37.6945 26.9444L18.2501 26.9444L24.4028 33.0972C24.7712 33.4656 24.9781 33.9652 24.9781 34.4861C24.9781 35.007 24.7712 35.5066 24.4028 35.875C24.0345 36.2434 23.5349 36.4503 23.0139 36.4503C22.493 36.4503 21.9934 36.2434 21.6251 35.875L10.6945 24.8889L21.6528 13.8889C21.8334 13.7083 22.0478 13.5651 22.2837 13.4673C22.5196 13.3696 22.7725 13.3193 23.0278 13.3193C23.2832 13.3193 23.5361 13.3696 23.772 13.4673C24.0079 13.5651 24.2223 13.7083 24.4028 13.8889Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_prev">
              <rect width="50" height="50" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <svg className="carousel-control-next" data-bs-target="#carouselExampleCaptions" data-bs-slide="next" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_next)">
          <path d="M47.2222 25C47.2222 20.6049 45.9189 16.3084 43.477 12.654C41.0352 8.99957 37.5646 6.15129 33.504 4.46935C29.4434 2.7874 24.9753 2.34733 20.6646 3.20477C16.3539 4.06222 12.3943 6.17869 9.28646 9.28652C6.17863 12.3944 4.06217 16.354 3.20472 20.6647C2.34727 24.9754 2.78734 29.4435 4.46929 33.5041C6.15124 37.5647 8.99952 41.0353 12.6539 43.4771C16.3084 45.9189 20.6048 47.2222 24.9999 47.2222C30.8936 47.2222 36.546 44.881 40.7134 40.7135C44.8809 36.546 47.2222 30.8937 47.2222 25ZM25.5972 36.1111C25.2341 35.74 25.0308 35.2414 25.0308 34.7222C25.0308 34.203 25.2341 33.7045 25.5972 33.3333L31.9444 26.9444L12.3055 26.9444C11.7898 26.9444 11.2952 26.7396 10.9306 26.3749C10.5659 26.0103 10.3611 25.5157 10.3611 25C10.3611 24.4843 10.5659 23.9897 10.9306 23.6251C11.2952 23.2604 11.7898 23.0556 12.3055 23.0556L31.7499 23.0556L25.5972 16.9028C25.2288 16.5344 25.0219 16.0348 25.0219 15.5139C25.0219 14.993 25.2288 14.4934 25.5972 14.125C25.9655 13.7566 26.4651 13.5497 26.9861 13.5497C27.507 13.5497 28.0066 13.7566 28.3749 14.125L39.3055 25.1111L28.3472 36.1111C28.1666 36.2917 27.9522 36.4349 27.7163 36.5327C27.4804 36.6304 27.2275 36.6807 26.9722 36.6807C26.7168 36.6807 26.4639 36.6304 26.228 36.5327C25.9921 36.4349 25.7777 36.2917 25.5972 36.1111Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_next">
              <rect width="50" height="50" fill="white" />
            </clipPath>
          </defs>
        </svg>
    </div>
  );
};

export default Carousel;