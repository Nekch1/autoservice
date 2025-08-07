import React from "react";
import CategoryBlock from "../components/CategoryBlock";
import AdvantagesBlock from "../components/AdvantegesBlock";
import BrandsBlock from '../components/BrandsBlock' 
// import ContactBlock from "../components/ContactBlock";
import Carousel from "../components/Carousel";
import AboutBlock from "../components/AboutBlock";
import aboutSectionImg from '../assets/img/about-section.png'
// import {Link} from 'react-router-dom'

const AboutText = (
    <>
        <p>Автокраска33 — это ваш надёжный партнёр в области обновления и защиты вашего автомобиля. Мы предлагаем широкий спектр услуг по окраске и ремонту кузова, придавая вашему транспортному средству новый внешний вид и долговечную защиту.</p>
        <p>Мы стремимся сделать ваш автомобиль не только красивым, но и защищенным от внешних воздействий, чтобы вы могли наслаждаться его внешним видом на долгие годы.</p>
        <p>Присоединяйтесь к сотням довольных клиентов, которые выбрали нас для обновления своих автомобилей! Свяжитесь с нами прямо сейчас, и мы с удовольствием поможем вам достичь идеального внешнего вида вашего автомобиля.</p>
    </>
 )

const Home = () => {
    return(
        <main>
            <Carousel />
            <CategoryBlock />
            <AboutBlock aboutImg={aboutSectionImg} textContent={AboutText}  />
            <AdvantagesBlock />
            <BrandsBlock />
        </main>
    )
} 

export default Home