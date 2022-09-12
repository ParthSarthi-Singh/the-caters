import React from 'react'
import Item from './Item'



function Cart(props) {
  // const [items, setItems ]= useState([])



  return (

    <>
    <div className="container-fluid bg-trasparent my-4 p-3" style={{ position: "relative" }}>
      <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
            {props.products.map((product, index) => {
              return (
                <Item key={index} product={product} />
              );
            })}
        </div>
    </div>
      
    </>
  )
}

export default Cart
