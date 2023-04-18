import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='container mt-5'>
      <hr style={{ border: '1px solid black', opacity: '0.9' }} />
      <div className="row mb-5 pt-4 px-5">
        <div className="col-md-4">
          <h2>Sign up for our newsletter</h2>
          <p style={{ fontSize: '14px' }}>Be the first to know about our special offers, news, and updates.</p>
          <div className="email">
            <input className='py-2 ps-3' type="text" placeholder='Email Address' style={{ width: '100%' }} />
            <a className='signup' href="/">Sign Up</a>
          </div>
        </div>
        <div className="col-md-8">
          <div className="row px-5">
            <div className="col-md-3 d-flex flex-column">
              <h4 className='mb-3'>Get to know us</h4>
              <Link to="about">About Us</Link>
              <Link to="contact">Contact Us</Link>
              <Link to=""> Site Map</Link>
            </div>
            <div className="col-md-3 d-flex flex-column">
              <h4 className='mb-3'>Customer Policies</h4>

              <Link to="payments">Payments</Link>
              <Link to="returns">Cancellation & Returns</Link>
              <Link to="faq"> FAQ</Link>

            </div>
            <div className="col-md-3 d-flex flex-column">
              <h4 className='mb-3'>Connect with us</h4>
              <Link to="">Instagram</Link>
              <Link to="">Facebook</Link>
              <Link to="">Twitter</Link>
            </div>
            <div className="col-md-3 d-flex flex-column">
              <h4 className='mb-3'>Connect with us</h4>
              <Link to="">Instagram</Link>
              <Link to="">Facebook</Link>
              <Link to="">Twitter</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright text-center fs-5" style={{ background: 'black', color: 'white' }}>
        <p className='text-uppercase'>copyrights all right reserved</p>
      </div>
    </div>
  )
}

export default Footer