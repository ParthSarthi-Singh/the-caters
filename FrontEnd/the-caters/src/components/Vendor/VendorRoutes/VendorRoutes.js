import React from "react";
import { Routes, Route } from 'react-router-dom'
import VendorConsole from "../VendorConsole";
import ProductForm from "../ProductForm"
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import VendorNavbar from "../VendorNavbar";
import Home from "../../Home";
import VendorProducts from "../VendorProducts";


export default function VendorRoutes(props) {
    // done my part
    //let navigate = useNavigate();


    return (
        <>
            <VendorNavbar setVendorLoggedIn={props.setVendorLoggedIn} setVendorCreds={props.setVendorCreds} vendorCreds={props.vendorCreds}/>

            <Routes>
                <Route path="/vendor/vendorConsole" element={<VendorConsole />} />
                <Route path="/vendor/productForm" element={<ProductForm vendorCreds={props.vendorCreds} />} />
                <Route path="/vendor/VendorProducts" element={<VendorProducts vendorCreds={props.vendorCreds} />} />
                {/* <Route path="vendor/modifyProducts" element={<modifyProduct />}/> */}
                <Route path="/" element={<Home />} />
                <Route path='*' element={<VendorConsole />} />
            </Routes>
        </>
    )
}
