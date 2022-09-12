import axios from "axios";
import React from "react";
import { Link } from 'react-router-dom'

import { useNavigate } from "react-router-dom";

function Navbar(props) {
    let navigate = useNavigate();

    const host = "http://localhost:3002"
    const handleLogout = () => {
        axios.get(`${host}/logout`)
            .then((response) => {
                if (response.data.logout) {

                    localStorage.removeItem("token");
                    props.isUserLoggedIn(false)
                    props.setUserCreds("")
                    navigate('/')
                }
            })
    }



    return (

        <nav className={`navbar navbar-expand-lg bg-dark navbar-dark`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" >TheCaters</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">My Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Order Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Contact Us</Link>
                        </li>

                    </ul>
                    <ul className="navbar-nav mb-1 mb-lg-0">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </ul>
                    <ul className="navbar-nav mb-1 mb-lg-0">

                        <li className="nav-item">
                            <span style={{color:"white"}}>{props.userCreds.name}</span>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-light mx-2" onClick={handleLogout} >Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )

}

export default Navbar;