import React from "react";
import MoneyCardImg from '../assets/img/money-card.svg'
import TruckImg from '../assets/img/truck.svg'
import DeliveryImg from '../assets/img/delivery-img.png'

const DeliveryBlock = () => {
    return(
        <section className="delivery">
        <div className="container">
            <div className="title text-center text-primary">ДОСТАВКА И ОПЛАТА</div>
            <div className="row">
                <div className="col-md-5 column">
                    <div className="col-md-6 delivery-block">
                        <div><img src={MoneyCardImg} alt="" /></div>
                        <div>Оплата любым удобным способом</div>
                    </div>
                    <div className="col-md-6 delivery-block">
                        <div><img src={TruckImg} alt="" /></div>
                        <div>Доставка бесплатная от 10 тысяч</div>
                    </div>
                </div>
                <div className="col-md-7">
                    <img src={DeliveryImg} alt="" />
                </div>
            </div>
        </div>
      </section>
    )
}

export default DeliveryBlock