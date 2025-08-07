import React from "react";
import { Link } from "react-router-dom";

const AboutBlock = ({aboutImg, textContent}) =>{
    return(
        <section className="about-company">
        <div className="container">
            <div className="title text-primary text-center">О КОМПАНИИ</div>
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <div className="about-text">
                        {textContent}
                        {/* <Link to="/about"><button className="bg-primary text-white">УЗНАТЬ ПОДРОБНЕЕ</button></Link> */}
                    </div>
                </div>
                <div className="col-lg-8 col-md-6">
                    <img src={aboutImg} alt="" />
                </div>
            </div>
        </div>
      </section>
    )
}

export default AboutBlock