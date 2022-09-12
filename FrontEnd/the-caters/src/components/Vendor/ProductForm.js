import React from 'react'
// eslint-disable-next-line
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
function ProductForm(props) {
  //huzefa currently working on this
  const host = "http://localhost:3002"
  // eslint-disable-next-line
  let navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null)
  const onInputChange = (e) => {
    setImageFile(e.target.files[0])
  }
  const handleClick = async (e) => {

    e.preventDefault()

    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemDescription = document.getElementById('itemDescription').value;
    const formData = new FormData()
    formData.append('itemName', itemName)
    formData.append('itemPrice', itemPrice)
    formData.append('itemDescription', itemDescription)
    formData.append('imageUrl', imageFile)
    console.log(imageFile)

    axios.post(`${host}/vendor/addFoodDishes`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": localStorage.getItem("vendorToken"),
      },
    }).then((response) => {
      if (response.data.dishStatus) {

        const inputs = document.querySelectorAll('#itemName, #itemPrice, #itemDescription');
        inputs.forEach(input => {
          input.value = '';
        });
        alert(response.data.msg)
      }
      else {
        alert(response.data.msg)
      }
    }).catch((err) => {
      console.log(err)
      alert("Enter Proper Product Details")
    })

  }
  return (

    <form className="vh-120" >
      <div className="container py-4">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-light text-dark" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-4 text-center">
                <div className="mb-md-2 mt-md-3 pb-4">
                  <h2 className="fw-bold text-uppercase mb-4">Add Product</h2>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="itemName"
                      name="itemName"
                      placeholder="Item name"
                      className="form-control form-control-lg"
                      minLength={3}
                      required
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="number"
                      id="itemPrice"
                      name="itemPrice"
                      placeholder="Item price"
                      className="form-control form-control-lg"
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="form-outline form-white mb-4">

                  <textarea className="form-control" id="itemDescription" name="itemDescription" rows="3" placeholder="About your item" ></textarea>

                  </div>
                  {/* <div className="form-outline form-white mb-4">

                    <input type="radio" className="btn-check" name="open" id="open" autoComplete="off" defaultChecked />
                    <label className="btn btn-outline-success mx-2" htmlFor="success-outlined">Open</label>

                    <input type="radio" className="btn-check" name="close" id="close" autoComplete="off" />
                    <label className="btn btn-outline-danger" htmlFor="danger-outlined">Close</label>

                  </div> */}


                  <div className="form-outline form-white mb-5">

                    <label className="form-label" htmlFor="customFile" >Upload Image of item</label>
                    <input type="file" className="form-control" onChange={onInputChange} name="imageUrl" id="imageUrl" />


                  </div>

                  {/* <p className="small pb-lg-2">
                    <Link className="text-dark" to="#!">
                      Forgot password?
                    </Link>
                  </p> */}

                  <button
                    className="btn btn-outline-dark px-5"
                    type="submit"
                    onClick={handleClick} >
                    Add Product
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ProductForm  