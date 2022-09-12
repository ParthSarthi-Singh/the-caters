import React ,{useEffect,useState}from 'react'
import { Link } from 'react-router-dom'
import './Item.css'

export default function Item() {
    const [data, setData] = useState([])

    const fetchdata = () => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(data => setData(data))
    }
  return (
    <>

{data.map((item, index) => (
            <>

                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{row.id}</td>
                    <td><img src={row.thumbnailUrl} /></td>
                    <td>{row.title}</td>
                    <td>{row.completed === true ? "Completed" : "Not Completed"}</td>
                </tr>

            </>
        ))}

      <div className="container-fluid bg-trasparent my-4 p-3" style={{ position: "relative" }}>
        <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
          <div className="col hp">
            <div className="card h-100 shadow-sm">
              <Link to="/">
                <img src="https://m.media-amazon.com/images/I/81gK08T6tYL._AC_SL1500_.jpg" className="card-img-top" alt="product.title" />
              </Link>

              <div className="label-top shadow-sm">
                
              </div>
              <div className="card-body">
                <div className="clearfix mb-3">
                  <span className="float-start badge rounded-pill bg-success">1.245$</span>

                  <span className="float-end"><Link to="#" className="small text-muted text-uppercase aff-link">reviews</Link></span>
                </div>
                <h5 className="card-title">
                  <Link target="_blank" to="#">ASUS TUF FX505DT Gaming Laptop- 15.6", 120Hz Full HD, AMD Ryzen 5 R5-3550H Processor, GeForce GTX 1650 Graphics, 8GB DDR4, 256GB PCIe SSD, RGB Keyboard, Windows 10 64-bit - FX505DT-AH51</Link>
                </h5>

                <div className="d-grid gap-2 my-4">

                  <Link to="#" className="btn btn-warning bold-btn">add to cart</Link>

                </div>
                <div className="clearfix mb-1">

                  <span className="float-start"><Link to="#"><i className="fas fa-question-circle"></i></Link></span>

                  <span className="float-end">
                    <i className="far fa-heart" style={{ cursor: "pointer" }}></i>

                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




    </>
  )
}
