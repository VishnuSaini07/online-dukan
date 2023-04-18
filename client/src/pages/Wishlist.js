import React from 'react'
import { Helmet } from 'react-helmet'
import {AiFillHeart} from 'react-icons/ai'

const Wishlist = () => {
  return (
    <>
    <Helmet>
      <title>Wishlist</title>
    </Helmet>
      <div className='container text-center' style={{ height: '90vh' }}>
        <h1 className='fs-1 fw-bold mt-5 mb-3'>Wishlist</h1>
        <p className='mx-auto fs-5 mb-4' style={{ width: '55%' }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae omnis quis obcaecati voluptate deserunt repellat distinctio illo atque fugit</p>
        <div className="btn border border-dark rounded-0 px-5 fs-6 mb-5">Shop all</div>
        <div className="row mb-5 mx-auto" style={{ width: '90%' }}>
          <div className="col-md-4">
            <div className="card img rounded-0 border-0">
              <img src="/images/category1.jpg" className="card-img-top rounded-0" alt="..." />
              <div className="card-body px-0">
              <div className="nameIcon d-flex justify-content-between">
                <p className="card-text text-start fw-bold fs-4">Shoes</p>
                <AiFillHeart className='fs-5' />
                </div>
                <p className="card-text text-start fw-normal fs-5">Rs.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card img rounded-0 border-0">
              <img src="/images/category2.jpg" className="card-img-top rounded-0" alt="..." />
              <div className="card-body px-0">
                <div className="nameIcon d-flex justify-content-between">
                <p className="card-text text-start fw-bold fs-4">Jeans</p>
                <AiFillHeart className='fs-5' />
                </div>
                <p className="card-text text-start fw-normal fs-5">Rs.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card img rounded-0 border-0">
              <img src="/images/category3.jpg" className="card-img-top rounded-0" alt="..." />
              <div className="card-body px-0">
              <div className="nameIcon d-flex justify-content-between">
                <p className="card-text text-start fw-bold fs-4">Shirt</p>
                <AiFillHeart className='fs-5' />
                </div>
                <p className="card-text text-start fw-normal fs-5">Rs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Wishlist
