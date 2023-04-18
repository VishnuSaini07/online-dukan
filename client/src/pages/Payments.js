import React from 'react'
import { Helmet } from 'react-helmet'

const Payments = () => {
  return (
    <>
    <Helmet>
      <title>Payment</title>
    </Helmet>
      <div className="contianer mx-auto" style={{ height: '60vh', width: '70%' }}>
        <h1 className="my-3"> <center>Payments</center></h1>
        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <strong>How do I pay for a E-Dukan purchase?</strong>
            <p>E-Dukan offers you Cash on delivery payment method.
              Whatever your mode of payment, you can rest assured that E-Dukan's trusted payment gateway
            </p>
            <strong>  What is Cash on Delivery?</strong>
            <p>   If you are not comfortable making an online payment on E-dukaan, you can opt for the Cash on Delivery (C-o-D) payment method instead. <br />
              With C-o-D you can pay in cash at the time of actual delivery of the product at your doorstep,
              without requiring you to make any advance payment online.
              The maximum order value for a Cash on Delivery (C-o-D) payment is ₹50,000.
              It is strictly a cash-only payment method.
            </p>
            <strong>   Are there any hidden charges Octroi or Sales Tax) when I make a purchase on E-Dukan?</strong>
            <p> There are NO hidden charges when you make a purchase on E-Dukan.
              The prices listed for all the items are final and all-inclusive.
              The price you see on the product page is exactly what you pay.
              Delivery charges may be extra depending on the seller policy.
              Please check individual seller for the same. In case of seller WS Retail,
              the ₹50 delivery charge is waived off on orders worth ₹500 and over.
            </p>

          </div>
        </div>
      </div>
    </>

  )
}

export default Payments
