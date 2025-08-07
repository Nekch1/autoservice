// import React from "react";
// import { Link, } from 'react-router-dom'; 
// import categoryPreparation from '../assets/img/category-preparation.png';
// import categoryPainting from '../assets/img/category-painting.png';
// import categoryPolishing from '../assets/img/category-polishing.png';
// import categoryPaste from '../assets/img/category-paste.png';
// import categoryPlasticRepair from '../assets/img/category-plastic-repair.png';
// import categoryAerosols from '../assets/img/category-aerosols.png';
// import categoryAntiCorrosionProtection from '../assets/img/category-anti-corrosion-protection.png';
// import categoryNoiseInsulation from '../assets/img/category-noise-insulation.png';
// import categoryProtect from '../assets/img/category-protect.png';
// import categoryCosmetics from '../assets/img/category-cosmetics.png';

// const CategoryBlock = () => {
//     return(
//         <section className="category">
//             <div className="container">
//                 <div className="title text-primary text-center">ПОПУЛЯРНЫЕ КАТЕГОРИИ</div>
//                 <div className="row">
//                     <div className="col-lg-4 col-sm-6">
//                         <div className="card">
//                             <img src={categoryPreparation} alt="" />
//                             <div className="bg-primary text-white">
//                                 <Link to="/catalog/service-preparation" className="bg-primary text-white">Подготовка кузова</Link>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-4 col-sm-6">
//                         <div className="card">
//                             <img src={categoryPainting} alt="" />
//                             <div className="bg-primary">
//                                 <Link to="/catalog/service-painting" className="bg-primary text-white">Покраска кузова</Link>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-4 col-sm-6">
//                         <div className="card">
//                             <img src={categoryPolishing} alt="" />
//                             <div className="bg-primary">
//                                 <Link to="/catalog/service-polishing" className="bg-primary text-white">Полировка кузова</Link>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-4 col-sm-6">
//                         <div className="card">
//                             <img src={categoryPaste} alt="" />
//                             <div className="bg-primary">
//                                 <Link to="/catalog/service-paste" className="bg-primary text-white">Вклейка и полировка стёкол</Link>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-4 col-sm-6">
//                         <div className="card">
//                             <img src={categoryPlasticRepair} alt="" />
//                             <div className="bg-primary">
//                                 <Link to="/catalog/service-plastic-repair" className="bg-primary text-white">Ремонт пластика</Link>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-4 col-sm-6">
//                         <div className="card">
//                             <img src={categoryAerosols} alt="" />
//                             <div className="bg-primary">
//                                 <Link to="/catalog/service-aerosols" className="bg-primary text-white">Аэрозоли</Link>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-4 col-sm-6">
//                         <div className="card">
//                             <img src={categoryAntiCorrosionProtection} alt="" />
//                             <div className="bg-primary">
//                                 <Link to="/catalog/service-anti-corrosion-protection" className="bg-primary text-white">Антикоррозионная защита</Link>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-4 col-sm-6">
//                         <div className="card">
//                             <img src={categoryNoiseInsulation} alt="" />
//                             <div className="bg-primary">
//                                 <Link to="/catalog/service-noise-insulation" className="bg-primary text-white">Шумоизоляция</Link>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-4 col-sm-6">
//                         <div className="card">
//                             <img src={categoryProtect} alt="" />
//                             <div className="bg-primary">
//                                 <Link to="/catalog/service-protect" className="bg-primary text-white">Средства индивидуальной защиты</Link>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-4 col-sm-6">
//                         <div className="card">
//                             <img src={categoryCosmetics} alt="" />
//                             <div className="bg-primary">
//                                 <Link to="/catalog/service-cosmetics" className="bg-primary text-white">Автокосметика</Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>     
//             </div>
//         </section>
//     );
// };

// export default CategoryBlock;



import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; 
import categoryPreparation from '../assets/img/category-preparation.png';
import categoryPainting from '../assets/img/category-painting.png';
import categoryPolishing from '../assets/img/category-polishing.png';
import categoryPaste from '../assets/img/category-paste.png';
import categoryPlasticRepair from '../assets/img/category-plastic-repair.png';
import categoryAerosols from '../assets/img/category-aerosols.png';
import categoryAntiCorrosionProtection from '../assets/img/category-anti-corrosion-protection.png';
import categoryNoiseInsulation from '../assets/img/category-noise-insulation.png';
import categoryProtect from '../assets/img/category-protect.png';
import categoryCosmetics from '../assets/img/category-cosmetics.png';
// остальные импорты картинок...

const images = {
    "service-preparation":categoryPreparation,
    "service-painting":categoryPainting,
    "service-polishing":categoryPolishing,
    "service-paste":categoryPaste,
    "service-plastic-repair":categoryPlasticRepair,
    "service-aerosols":categoryAerosols,
    "service-anti-corrosion-protection":categoryAntiCorrosionProtection,
    "service-noise-insulation":categoryNoiseInsulation,
    "service-protect":categoryProtect,
    "service-cosmetics":categoryCosmetics,

};

const CategoryBlock = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/services')  // адрес API меняешь под свой бэкенд
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section className="category">
            <div className="container">
                <div className="title text-primary text-center">ПОПУЛЯРНЫЕ КАТЕГОРИИ</div>
                <div className="row">
                    {categories.map(category => (
                        <div className="col-lg-4 col-sm-6" key={category.id}>
                            <div className="card">
                                <img src={images[category.slug]} alt="" />
                                <div className="bg-primary">
                                    <Link to={`/catalog/${category.slug}`} className="bg-primary text-white">
                                        {category.name}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryBlock;
