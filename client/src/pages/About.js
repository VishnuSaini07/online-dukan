import React from 'react'
import { Helmet } from 'react-helmet'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About us</title>
      </Helmet>

      <div className="contianer mx-auto" style={{ height: '50vh', width: '70%' }}>
        <h1 className="my-3"> <center>About US</center></h1>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" >
                Who we are?
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>This is the first item's accordion body.</strong>
                It is shown by default, until the collapse plugin adds the appropriate classNamees that we use to style each element.
                These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions.
                You can modify any of this with custom CSS or overriding our default variables.
                It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,
                though the transition does limit overflow.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                What we provide?
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div className="accordion-body" >
                This is the second item's accordion body It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Accordion Item #3
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is hidden by default,
                until the collapse plugin adds the appropriate classNamees that we use to style each element.
                These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions.
                You can modify any of this with custom CSS or overriding our default variables.
                It's also worth noting that just about any HTML can go within th though the transition does limit overflow.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
