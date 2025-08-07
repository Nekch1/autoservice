import React from "react";
import {Link} from "react-router-dom";

const OrderHistoryBlock = () => {
    return(
        <section className="order-history-block">
            <div className="container">
                <div className="profile-block order-history">
                    <div className="d-flex justify-content-between">
                        <div className="title">История заказов</div>
                        <div className="to-catalog"><Link to="/catalog">Запись на сервис <svg style={{transform: "rotate(90deg)"}} width="15" height="15" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-inside-1_2048_102" fill="white">
                            <path d="M7.07129 4L3.53575 0.464461L0.000212009 4L3.53575 7.53554L7.07129 4Z"/>
                            </mask>
                            <path d="M3.53575 0.464461L2.12154 -0.949752L3.53575 -2.36397L4.94996 -0.949752L3.53575 0.464461ZM5.65708 5.41421L2.12154 1.87868L4.94996 -0.949752L8.4855 2.58579L5.65708 5.41421ZM4.94996 1.87868L1.41443 5.41421L-1.414 2.58579L2.12154 -0.949752L4.94996 1.87868Z" fill="#2F2F2F" mask="url(#path-1-inside-1_2048_102)"/>
                            </svg></Link></div>
                    </div>
                    
                    <div className="empty">История заказов пуста</div>
                    <div id="serviceList" className="list-group"></div>
                </div>
            </div>
        </section>
    )
}

export default OrderHistoryBlock