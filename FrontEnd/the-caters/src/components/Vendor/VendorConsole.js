import React from 'react'
import { Link } from 'react-router-dom'
export default function VendorConsole(props) {
  return (
    // huzefa is doing this

    // design this
    <div className='d-flex justify-content-center align-items-stretch' >
      <Link className="btn btn-outline-dark" to="/vendor/productForm" type='button'>Add Product </Link>
      <Link className="btn btn-outline-dark" to="/vendor/VendorProducts" type='button'>View Products</Link>
      <button className='btn btn-outline-dark' >Modified product</button>
    </div>
  )
}
