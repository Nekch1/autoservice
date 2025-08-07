import React from "react";
import AboutBlock from "../components/AboutBlock";
import DeliveryBlock from "../components/DeliveryBlock";
import AdvantagesBlock from "../components/AdvantegesBlock";
import PrinciplesBlock from "../components/PrinciplesBlock";
import BrandsBlock from "../components/BrandsBlock";
import aboutSectionImg from '../assets/img/about-car.png'

const AboutText = (
    <>
        <p>Мы начали свой путь в мире автомобильной краски с ясной целью: предоставить нашим клиентам лучшие продукты и сервис. </p>
        <p>С каждым годом мы укрепляли свою репутацию благодаря инновационным подходам к разработке и производству, а также непрерывному стремлению к совершенству. </p>
        <p>Автокраска33 - это не просто компания, это сообщество единомышленников, где каждый сотрудник делает все возможное для того, чтобы ваш автомобиль выглядел невероятно. </p>
    </>
 )

const About = () =>{
    return (
        <main>
            <AboutBlock aboutImg={aboutSectionImg} textContent={AboutText}/>
            <AdvantagesBlock />
            <PrinciplesBlock />
            <DeliveryBlock />
            <BrandsBlock />
        </main>
    )
}

export default About