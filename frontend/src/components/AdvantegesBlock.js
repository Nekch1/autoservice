import React from "react";
import BrushImg from '../assets/img/brush.svg'
import PaletteImg from '../assets/img/palette.svg'
import SaleImg from '../assets/img/sale.svg'
import StarImg from '../assets/img/star.svg'
import WalletImg from '../assets/img/wallet.svg'


const AdvantagesBlock = () => {
    return(
        <section className="advantages bg-primary">
        <div className="container">
            <div className="title text-white text-center">ПРЕИМУЩЕСТВА</div>
            <div className="row">
                <div className="col-md-4">
                    <div className="gradient-adv-block">
                        <img src={BrushImg} alt="" />
                        <div className="text text-white">Работаем с 1998</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="outer">
                        <div className="bg-white adv-block">
                            <img src={PaletteImg} alt="" />
                            <div>Огромный ассортимент</div>
                        </div>
                        <div className="bg-white adv-block">
                            <img src={SaleImg} alt="" />
                            <div>Скидки постоянным клиентам</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="outer">
                        <div className="bg-white adv-block">
                            <img src={StarImg} alt="" />
                            <div>Высокое качество материалов</div>
                        </div>
                        <div className="bg-white adv-block">
                            <img src={WalletImg} alt="" />
                            <div>Наличный и безналичный расчёт</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </section>
    )
}

export default AdvantagesBlock