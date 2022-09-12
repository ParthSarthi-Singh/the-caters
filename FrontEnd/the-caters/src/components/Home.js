import React from 'react'
import Carousel from './Carousel'
import ViewProductsToUsers from './ViewProductsToUsers'
import { useEffect, useState } from 'react'
import axios from 'axios'


function Home() {
  const hostname = 'http://localhost:3002'
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    axios.get(`${hostname}/fetchProducts`, {
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      if (response.data.productStatus) {

        setProducts(response.data.fetchedProducts)

      }
      else {

      }
    })

  }, [])

  return (
    <>

      <Carousel />
      <ViewProductsToUsers products={products} />
    </>
  )
}

export default Home
