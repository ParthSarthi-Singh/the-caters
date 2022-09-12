import React from 'react'
import '../../CSS/Signup.css'
import { useNavigate } from 'react-router-dom'

// using env file to get the hostname 

export default function SignVendor() {
    let navigate = useNavigate();
    // const [pass, setPass] = u
    const hostname = "http://localhost:3002"
    const confirmPassword = async(e) => {

        e.preventDefault()
        var password = document.getElementById('venPassword')
        var confirmPassword = document.getElementById('venConfirmPassword')

        if (password.value === confirmPassword.value) {
            const name = document.getElementById('ownerName').value
            const shopName = document.getElementById('shopName').value
            const emailId = document.getElementById('venEmailAddress').value
            const shopAddress = document.getElementById('shopAddress').value
            const password = document.getElementById('venPassword').value

            const response = await fetch(`${hostname}/vendorSignup`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ name, emailId, password, shopName, shopAddress })
            });
            const res = await response.json();
            console.log(res)
            if (res.vendorStatus) {
                alert(res.msg)
                navigate('/vendorLogin')
            }
            else {
                alert(res.msg)
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
                            <span style={{ color: "hsl(218, 81%, 75%)" }}>for your Restraunt</span>
                        </h1>
                        <p className="mb-4 opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
                            Become a Vendor on our TheCaters WebApp, through which you can reach more masses and
                            give them a taste of your food dishes
                        </p>
                    </div>

                    <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="card bg-black">
                            <div className="card-body px-4 py-5 px-md-5">
                                <form>

                                    <div className="form-outline mb-4">
                                        <input required type="text" name='shopName' id="shopName" className="form-control"
                                            placeholder="Your Shop Name" />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input required type="text" name='ownerName' id="ownerName" className="form-control"
                                            placeholder="Owner's Name" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input required type="email" name='venEmailAddress' id="venEmailAddress" className="form-control"
                                            placeholder="Email address" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input required type="text" name='shopAddress' id="shopAddress" className="form-control"
                                            placeholder="Your Shop Address" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input required type="password" name='venPassword' id="venPassword" className="form-control"
                                            placeholder="Password" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input required type="password" name='venConfirmPassword' id="venConfirmPassword" className="form-control" placeholder="Confirm Password" />
                                    </div>

                                    <button type="submit" onClick={confirmPassword} className="btn btn-outline-primary my-3">
                                        Register as a Vendor
                                    </button>

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
