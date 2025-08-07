import React from "react";
import CategoryBlock from '../components/CategoryBlock'
import DeliveryBlock from "../components/DeliveryBlock";
import BrandsBlock from "../components/BrandsBlock";
const Catalog = () =>{
    return(
        <main>
            <CategoryBlock />
            <DeliveryBlock />
            <BrandsBlock />
        </main>
    )
}

export default Catalog