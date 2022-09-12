import React from 'react'
import '../CSS/Carousel.css'
export default function Carousel() {

    return (
        <>
            {/* <img src="https://i.pinimg.com/originals/f0/98/b1/f098b1474bc51d35964b6faa032605dd.jpg" alt="loading" height="10px" width="1600px" /> */}
            {/* https://thumbs.dreamstime.com/b/assorted-american-food-top-view-109748438.jpg */}
            {/* https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000 */}

            <div id="carouselExampleControls" className="carousel slide my-2" data-mdb-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://i.pinimg.com/originals/f0/98/b1/f098b1474bc51d35964b6faa032605dd.jpg" className="d-block w-100" alt="Wild Landscape"/>
    </div>
    <div className="carousel-item ">
      <img src="https://thumbs.dreamstime.com/b/assorted-american-food-top-view-109748438.jpg" className="d-block w-100" alt="Camera"/>
    </div>
    <div className="carousel-item">
      <img src="https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000" className="d-block w-100" alt="Exotic Fruits"/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-mdb-target="#carouselExampleControls" data-mdb-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-mdb-target="#carouselExampleControls" data-mdb-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        </>
    )
}
