import React from 'react'
import '../CSS/Signup.css'
import { Link, useNavigate } from 'react-router-dom'
export default function Signup() {

    let navigate = useNavigate();
    // const [pass, setPass] = u
    const host = "http://localhost:3002"

    const confirmPassword = async (e) => {

        e.preventDefault()
        const password = document.getElementById('password')
        const confirmPassword = document.getElementById('confirmPassword')
       

        if (password.value === confirmPassword.value) {
            
            const emailId = document.getElementById('emailAddress').value
            const firstName = document.getElementById('firstName').value
            const lastName = document.getElementById('lastName').value
            const password = document.getElementById('password').value


           
            const response = await fetch(`${host}/signup`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ firstName, lastName, emailId, password })
            });
            const json = await response;
            
            if(json.status === 200){
                navigate('/login')
                
            }
            else{
                alert("")
            }
            
        }
        else {
            alert('Password doesnt match')
        }

    }


    return (
        <>
            <section className="background-radial-gradient overflow-hidden">


                <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
                            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                                The best offer <br />
                                <span style={{ color: "hsl(218, 81%, 75%)" }}>for your business</span>
                            </h1>
                            <p className="mb-4 opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Temporibus, expedita rahul veniam atque, magni tempora mollitia
                                dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                                ab ipsum nisi dolorem modi. Quos?
                            </p>
                        </div>

                        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                            <div className="card bg-black">
                                <div className="card-body px-4 py-5 px-md-5">
                                    <form>

                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input required type="text" name='firstName' id="firstName" className="form-control"
                                                        placeholder="First name" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input required type="text" name='lastName' id="lastName" className="form-control"
                                                        placeholder="Last name" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input required type="email" name='emailAddress' id="emailAddress" className="form-control"
                                                placeholder="Email address" />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input required type="password" name='password' id="password" className="form-control"
                                                placeholder="Password" />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input required type="password" name='confirmPassword' id="confirmPassword" className="form-control" placeholder="Confirm Password" />
                                        </div>




                                        <button type="submit" onClick={confirmPassword} className="btn btn-outline-primary my-3">
                                            Sign up
                                        </button>

                                        <div className="pt-1 mb-4">
                                            <Link className="btn btn-dark " to="/vendorSignup" role="button">Register as a Vendor</Link>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
