import React from 'react'
import { Helmet } from 'react-helmet'

const Returns = () => {
  return (
    <>
    <Helmet>
      <title>Return</title>
    </Helmet>
        <div className ="contianer mx-auto" style={{height: '60vh', width: '70%'}}>
     <h1 className = "my-3"> <center>Cancellations & Returns</center></h1>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" >
            If I request for a replacement, when will I get it?
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
                <p>Visit My Orders to check the status of your replacement.

                    In most locations, the replacement item is delivered to you at the time of pick-up. 
                    In all other areas, the replacement is initiated after the originally delivered item is picked up. 
                    Please check the SMS & email we send you for your replacement request for more details.
                </p>      
        </div>
      </div>
    </div>
    <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            How do returns work?
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body" >
            You can raise a request to return your items with these simple steps:<br/>

                1. Log into your E-Dukan account<br/>

                2. Go to My Orders<br/>

                3. Click on 'Return' against the item you wish to return or exchange. <br/>

                4. Fill in the details and raise a return request.<br/>

                Once you raise a request, you'll get an email and SMS confirming that your request is being processed. 
                Based on the item, your request may be automatically approved or you may be contacted for more details. 
                If the request is approved, the item will be picked up after which you will get a replacement or refund. 
                You can also track the status of your return request instantly from the 'My Orders' section of your 
                E-Dukan account.            </div>
          </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Returns