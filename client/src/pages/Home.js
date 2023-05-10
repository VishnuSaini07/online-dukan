import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>E-Dukan</title>
      </Helmet>
      {/* Carousel */}
      <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="4000">
            <img src="/images/carousel1.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval="4000">
            <img src="/images/carousel2.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval="4000">
            <img src="/images/carousel3.jpg" className="d-block w-100" alt="..." />
          </div>

        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Category */}
      <div className='container text-center' style={{ height: '90vh' }}>
        <h1 className='fs-1 fw-bold mt-5 mb-3'>Top Picks</h1>
        {/* <p className='mx-auto fs-5 mb-4' style={{ width: '55%' }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae omnis quis obcaecati voluptate deserunt repellat distinctio illo atque fugit</p> */}
        <Link to="shop" className="btn border border-dark rounded-0 px-5 fs-6 mb-5">Shop all</Link>
        <div className="row mb-5 mx-auto" style={{ width: '90%' }}>
          <div className="col-md-4">
            <div className="card img rounded-0 border-0">
              <img src="/images/category1.jpg" className="card-img-top rounded-0" alt="..." />
              <div className="card-body">
                <p className="card-text fw-bold fs-4">Shoes</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card img rounded-0 border-0">
              <img src="/images/category2.jpg" className="card-img-top rounded-0" alt="..." />
              <div className="card-body">
                <p className="card-text fw-bold fs-4">Jeans</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card img rounded-0 border-0">
              <img src="/images/category3.jpg" className="card-img-top rounded-0" alt="..." />
              <div className="card-body">
                <p className="card-text fw-bold fs-4">Shirts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrival */}
      <div className='container text-center'>
        <h1 className='fs-1 fw-bold mt-5 mb-3'>Latest Arrivals</h1>
        {/* <p className='mx-auto fs-5 mb-4' style={{ width: '55%' }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae omnis quis obcaecati voluptate deserunt repellat distinctio illo atque fugit</p> */}
        <Link to="shop" className="btn border border-dark rounded-0 px-5 fs-6 mb-5">Shop all</Link>
        <div className="row mb-5 mx-auto" style={{ width: '90%' }}>
          <div className="col-md-4 mt-5">
            <div className="card img rounded-0 border-0">
              <img src="/images/arrival1.jpg" className="card-img-top rounded-0" alt="..." />
              <div className="card-body">
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card img rounded-0 border-0">
              <img src="/images/arrival2.jpg" className="card-img-top rounded-0" alt="..." />
              <div className="card-body">
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-5">
            <div className="card img rounded-0 border-0">
              <img src="/images/arrival3.jpg" className="card-img-top rounded-0" alt="..." />
              <div className="card-body">
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Product */}
      {/* <div className='container text-center' style={{ height: '90vh' }}>
        <h1 className='fs-1 fw-bold mt-5 mb-3'>Our products</h1>
        <p className='mx-auto fs-5 mb-4' style={{ width: '55%' }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae omnis quis obcaecati voluptate deserunt repellat distinctio illo atque fugit</p>
        <div className="btn border border-dark rounded-0 px-5 fs-6 mb-5">Shop all</div>
        <div className="row mb-5 mx-auto" style={{ width: '90%' }}>
          <div className="col-md-4">
            <div className="card img rounded-0 border-0">
              <img src="/images/category1.jpg" className="card-img-top rounded-0" alt="..." />
              <div className="card-body px-0">
                <p className="card-text text-start fw-bold fs-4">Shoes</p>
                <p className="card-text text-start fw-normal fs-5">Rs.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card img rounded-0 border-0">
              <img src="/images/category2.jpg" className="card-img-top rounded-0" alt="..." />
              <div className="card-body px-0">
                <p className="card-text text-start fw-bold fs-4">Jeans</p>
                <p className="card-text text-start fw-normal fs-5">Rs.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card img rounded-0 border-0">
              <img src="/images/category3.jpg" className="card-img-top rounded-0" alt="..." />
              <div className="card-body px-0">
                <p className="card-text text-start fw-bold fs-4">Shirts</p>
                <p className="card-text text-start fw-normal fs-5">Rs.</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Home;