import axios from 'axios';
import React from 'react'
// import Item from '../Item.js'
import Item from '../Item.js'
import { useState,useEffect } from 'react';

function VendorProducts(props) {
  const [viewVendorProducts, setVendorProducts] = useState([])
  const [vendorProductStatus, setVendorProductStatus] = useState("")
  const hostname = 'http://localhost:3002'
  useEffect(() => {
    
    const vendorId = props.vendorCreds._id;
    const formData = new FormData()
    formData.append('vendorId', vendorId)
    axios.get(`${hostname}/vendorFetchProducts`, formData,
    {headers: { 'Content-Type': 'application/json' },})
    .then((response)=>{
      if(response.data.productStatus){
        setVendorProducts(response.data.fetchedProducts)
        setVendorProductStatus(true)
      }
      else{
        alert("No products to show")
        setVendorProductStatus(false)
      }
    })
  
   
  },[vendorProductStatus, viewVendorProducts])
  
  return (
    <>
    <div className="container-fluid bg-trasparent my-4 p-3" style={{ position: "relative" }}>
      <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
            { viewVendorProducts.map((product, index) => {
              return (
                <Item key={index} product={product} />
              );
            })}
        </div>
    </div>
      
    </>
  )
}

export default VendorProducts
