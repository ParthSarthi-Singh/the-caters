import React from "react";
import { Link, useLocation } from 'react-router-dom'



function Navbar() {

    let location = useLocation();


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
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/contactus" ? "active" : ""}`} to="/contactus">Contact Us</Link>
                        </li>
                    </ul>
                    <ul>

                        <form className="mx-5" role="search">
                            <input className="form-control me-3" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </ul>

                    <ul className="navbar-nav mb-1 mb-lg-0">


                        <li className="nav-item">

                            <Link className="btn btn-outline-primary mx-2" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">

                            <Link className="active btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )

}

export default Navbar;