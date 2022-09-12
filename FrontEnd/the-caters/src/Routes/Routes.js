import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import axios from "axios";
import Home from "../components/Home"
import About from "../components/About";
import Contactus from "../components/Contactus";
// eslint-disable-next-line
import NavbarAuth from "../Navbar/NavbarAuth";
// eslint-disable-next-line
import Navbar from "../Navbar/Navbar";
import Login from "../components/Login";
import LogVendor from "../components/Vendor/LogVendor";
import SignVendor from "../components/Vendor/SignVendor";
import Signup from "../components/Signup";
import ViewProductsToUsers from "../components/ViewProductsToUsers";
import VendorRoutes from "../components/Vendor/VendorRoutes/VendorRoutes";

function Routing(props) {
// final done segregated the routes of vendor and user
    const host = "http://localhost:3002"

    const [navbarAuth, setNavbarAuth] = useState("")
    const [isUserLoggedIn, setIsUserLoggedIn] = useState("")
    const [userCreds, setUserCreds] = useState("")



    // vendor 

    const [isVendorLoggedIn, setVendorLoggedIn] = useState("")
    const [vendorRoute, setVendorRoute] = useState("")
    const [vendorCreds, setVendorCreds] = useState("")


    // checking for user logged in

    useEffect(() => {
        if (localStorage.getItem("token")) {
            console.log("user token")
            axios.get(`${host}/isUserAuth`, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            }).then((response) => {
                if (response.data.auth) {
                    setIsUserLoggedIn(true)
                    setNavbarAuth(<NavbarAuth isUserLoggedIn={setIsUserLoggedIn} setUserCreds={setUserCreds} userCreds={response.data.userCreds} />)
                }
                else {
                    setIsUserLoggedIn(false)
                    setNavbarAuth(<Navbar isUserLoggedIn={setIsUserLoggedIn} setUserCreds={setUserCreds} userCreds={response.data.userCreds} />)
                }
            }).catch((err) => {
                console.log("error in user auth(axios) : ", err)
            })
        }

        // checking for vendor

        else if (localStorage.getItem("vendorToken")) {
          
            axios.get(`${host}/isVendorAuth`, {
                headers: {
                    "x-access-token": localStorage.getItem("vendorToken"),
                },
            }).then((response) => {
                if (response.data.vendorAuth) {
                    setVendorLoggedIn(true)
                    setVendorRoute(<VendorRoutes isVendorLoggedIn={isVendorLoggedIn} setVendorLoggedIn={setVendorLoggedIn} setVendorCreds={setVendorCreds} vendorCreds={response.data.vendorCreds} />)
                }
                else {
                    setVendorLoggedIn(false)
                    // setVendorRoute(<Routing isVendorLoggedIn={isVendorLoggedIn} setVendorLoggedIn={setVendorLoggedIn} setVendorCreds={setVendorCreds} vendorCreds={vendorCreds} />)
                }
            }).catch((err) => {
                console.log("error in user auth(axios) : ", err)
            })
        }
        else {
            
            setVendorLoggedIn(false)
            setIsUserLoggedIn(false)
            setNavbarAuth(<Navbar isUserLoggedIn={setIsUserLoggedIn} setUserCreds={setUserCreds} userCreds={userCreds} />)

            // setVendorRoute(<Routing isVendorLoggedIn={isVendorLoggedIn} setVendorLoggedIn={setVendorLoggedIn} setVendorCreds={setVendorCreds} vendorCreds={vendorCreds} />)
        }

    }, [isUserLoggedIn, userCreds, isVendorLoggedIn, vendorCreds]);

    return (
        <>

            {isVendorLoggedIn ?
                <>
                    {vendorRoute}

                </>
                :
                isUserLoggedIn ?

                    <>
                        {navbarAuth}

                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contactus" element={<Contactus />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/products" element={<ViewProductsToUsers />} />
                            <Route path='*' element={<Home />} />
                        </Routes>
                    </>
                    :
                    <>
                        {navbarAuth}

                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contactus" element={<Contactus />} />
                            <Route path="/login" element={<Login isUserLoggedIn={setIsUserLoggedIn} setUserCreds={setUserCreds} userCreds={userCreds} />} />
                            <Route path="/vendorLogin" element={<LogVendor setVendorLoggedIn={setVendorLoggedIn} setVendorCreds={setVendorCreds} />} />
                            <Route path="/vendorSignup" element={<SignVendor />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path='*' element={<Home />} />
                        </Routes>
                    </>
            }

        </>
    )
}

export default Routing