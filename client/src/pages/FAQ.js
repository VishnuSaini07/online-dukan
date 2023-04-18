import React from 'react'
import { Helmet } from 'react-helmet'

const FAQ = () => {
  return (
    <>
    <Helmet>
      <title>FAQs</title>
    </Helmet>
      <div className="contianer mx-auto" style={{ height: '70vh', width: '70%' }}>
        <h1 className="my-3"> <center>FAQ</center></h1>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" >
                What is E-dukan's Convenience Fee?
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <p>A Convenience Fee of Rs. 99/- will be applicable to the orders under Rs. 799/-, and
                  Rs.69/- will be applicable for the orders with only personal care items under 499/-.<br />
                  1. If you return an order delivered to you, order Convenience Fee will not be refunded. However, if you self - ship your returns, we will reimburse self - shipment
                  charges based on Myntra 's Returns Policy.
                  For accounts whose return behavior violates our fair usage policy, Convenience fee will be non - refundable irrespective of order value.<br />
                  *Order value is calculated after applying discounts/VAT/GST or any other applicable charges
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                How do I check the status of my order?
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div className="accordion-body" >
                Please tap on “My Orders” section under main menu of App/Website/M-site to check your order status.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                How can I get my order delivered faster?
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                Sorry, currently we do not have any service available to expedite the order delivery.
                In future, if we are offering such service and your area pincode is serviceable, you will receive a communication from our end.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default FAQ
