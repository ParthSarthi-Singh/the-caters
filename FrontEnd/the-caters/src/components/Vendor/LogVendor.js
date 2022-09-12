import React from 'react'
import '../../CSS/Login.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function LogVendor(props) {

    const host = "http://localhost:3002"
    let navigate = useNavigate();

    const loggedIn = async (e) => {

        e.preventDefault()
        const emailId = document.getElementById('emailAddress').value
        const password = document.getElementById('password').value

        const response = await fetch(`${host}/vendorLogin`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailId, password })
        });
        const json = await response.json();
        if (json.vendorAuth) {
            //save the auth token and redirect to home page
            // you might have to add "Bearer " +     with the token
            
            localStorage.setItem("vendorToken",json.token);
            props.setVendorLoggedIn(true)
            props.setVendorCreds(json.vendorCreds)
            
        }
        else {
            alert(json.msg)
        }
    }

    return (
        <>
            <section className="vh-90" >
                <div className="container py-2 h-90">
                    <div className="row d-flex justify-content-center align-items-center h-90">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                            alt="login form" className="img-fluid h-85" style={{ borderRadius: "1rem 0 0 1rem" }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">

                                            <form>

                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <span className="material-symbols-outlined text-5xl" style={{ color: "#ad1fff" }}>restaurant_menu</span> <span className="h1 fw-bold mb-0"> The Caters</span>
                                                </div>

                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your Vendor account</h5>

                                                <div className="form-outline mb-4">
                                                    <input required type="email" id="emailAddress" name='emailAddress' placeholder="Email address" className="form-control form-control-lg" />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input required type="password" id="password" name='password' placeholder="Password" className="form-control form-control-lg" />
                                                </div>

                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-dark" type="button" onClick={loggedIn} style={{ backgroundColor: "black" }}>Vendor Login</button>
                                                </div>

                                                {/* <Link className="small" to="/signup">Forgot password?</Link> */}

                                                <p className="mb-5 pb-lg-2 italic text-muted " style={{ cursor: "default" }} >Want to become a Vendor? &ensp;
                                                    <Link to="/vendorSignup" style={{ color: "#393f81" }} className="text-decoration-underline" ><u>Register here</u> </Link></p>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
