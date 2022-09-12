import React from 'react'
import { Link } from 'react-router-dom'
import './Item.css'

export default function Item(props) {

  return (
    <>
          <div className="col hp">

            
            <div className="card h-100 shadow-sm">

              <Link to="/">
                <img src={require(`C:/PARTH/Projects/TheCaters/BackEnd/uploads/${props.product.imageUrl}`)} className="card-img-top" alt="Food" />
              </Link>

              <div className="label-top shadow-sm">
                <Link className="text-white" to="#">{props.product.shopName}</Link>
              </div>
              <div className="card-body">
                <div className="clearfix mb-3">
                  <span className="float-start badge rounded-pill bg-success">{props.product.itemPrice}₹</span>
                </div>
                <h2 className="card-title text-center text-bold">
                  <Link target="_blank" to="#">{props.product.itemName}</Link>
                </h2>

                <div className="d-grid gap-2 my-4">

                  <Link to="#" className="btn btn-warning bold-btn">add to cart</Link>

                </div>
                {/* <div className="clearfix mb-1">

                  <span className="float-start"><Link to="#"><i className="fas fa-question-circle"></i></Link></span>

                  <span className="float-end">
                    <i className="far fa-heart" style={{ cursor: "pointer" }}></i>

                  </span>
                </div> */}
              </div>

            </div>

          </div>





    </>
  )
}
