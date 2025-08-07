// import React from "react";
// import CatalogPage from "../../components/CatalogPage";
// import categoryAntiCorrosionProtect from '../../assets/img/category-anti-corrosion-protection.png'

// const AntiCorrosionProtect = () =>{
//     return(
//         <CatalogPage categoryImg={categoryAntiCorrosionProtect} textContent={"Антикоррозионная защита"}/>
//     )
// }

// export default AntiCorrosionProtect


import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import categoryAntiCorrosionProtect from '../../assets/img/category-anti-corrosion-protection.png'
import BrandsBlock from "../../components/BrandsBlock";
import ModalOrder from "./ModalOrder";

const CatalogPage = () => {
    const [service, setCategories] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/services/7')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCategories(data);
            })
            .catch(err => console.error(err));
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const carouselRef = useRef(null);
    const thumbnailsRef = useRef([]);

    const jumpToSlide = (index) => {
        const carousel = carouselRef.current;
        if (!carousel) return;
        const instance = window.bootstrap.Carousel.getOrCreateInstance(carousel);
        instance.to(index);

        thumbnailsRef.current.forEach((thumb, i) => {
            if (thumb) {
                thumb.classList.toggle('active', i === index);
            }
        });
    };

    useEffect(() => {
        if (carouselRef.current) {
            window.bootstrap.Carousel.getOrCreateInstance(carouselRef.current);
        }
    }, []);

    return (
        <main>
            <ModalOrder isModalOpen={isModalOpen} closeModal={closeModal} serviceId={service.id}/>
            <section className="catalog-item">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-12">
                            <div id="carouselExample" className="carousel slide" ref={carouselRef}>
                                <div className="carousel-inner">
                                    {[0, 1, 2].map((i) => (
                                        <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                                            <img src={categoryAntiCorrosionProtect} className="d-block w-100" alt={`Картинка ${i + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="thumbnails row mt-3">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="col-md-4 col-sm-4 col-4">
                                        <img
                                            ref={(el) => thumbnailsRef.current[i] = el}
                                            src={categoryAntiCorrosionProtect}
                                            alt={`Картинка ${i + 1}`}
                                            className={`thumbnail ${i === 0 ? 'active' : ''}`}
                                            onClick={() => jumpToSlide(i)}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-12">
                            <div className="title text-primary">{service.name}</div>
                            <div className="service-text">
                                <p>Автокраска33 — это ваш надёжный партнёр в области обновления и защиты вашего автомобиля...</p>
                                <p>Мы стремимся сделать ваш автомобиль не только красивым, но и защищенным...</p>
                                <p>Присоединяйтесь к сотням довольных клиентов...</p>
                                <button className="bg-primary text-white" onClick={openModal}>ЗАПИСАТЬСЯ</button>
                            </div>
                            <div class="service-link">
                                <Link to="/catalog/service-preparation">Подготовка кузова</Link>
                                <Link to="/catalog/service-painting">Покраска кузова</Link>
                                <Link to="/catalog/service-polishing">Полировка кузова</Link>
                                <Link to="/catalog/service-paste">Вклейка и полировка стёкол</Link>
                                <Link to="/catalog/service-plastic-repair">Ремонт пластика</Link>
                                <Link to="/catalog/service-aerosols">Аэрозоли</Link>
                                <Link to="/catalog/service-anti-corrosion-protection">Антикоррозионная защита</Link>
                                <Link to="/catalog/service-noise-insulation">Шумоизоляция</Link>
                                <Link to="/catalog/service-protect">Автокосметика</Link>
                                <Link to="/catalog/service-cosmetics">Средства индивидуальной защиты</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <BrandsBlock />
        </main>
    );
};

export default CatalogPage;