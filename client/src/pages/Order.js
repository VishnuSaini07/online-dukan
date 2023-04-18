import React from 'react'
import { BsArrowRepeat } from 'react-icons/bs'
import { Helmet } from 'react-helmet';

const Order = () => {
    return (
        <>
            <Helmet>
                <title>Your orders</title>
            </Helmet>
            <div className="container my-5 px-5">
                <h1>Your Order</h1>
                <div className="row mt-4">
                    <div className="col-md-8 mb-3">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center pb-0">
                                <div className="orderInfo d-flex">
                                    <div className="orderPlaced">
                                        <span style={{ fontSize: '14px' }}>ORDER PLACED</span>
                                        <p>8 February 2023</p>
                                    </div>
                                    <div className="total mx-5">
                                        <span style={{ fontSize: '14px' }}>TOTAL</span>
                                        <p>Rs.</p>
                                    </div>
                                    <div className="shipTo">
                                        <span style={{ fontSize: '14px' }}>SHIP TO</span>
                                        <p>Vishnu Saini</p>
                                    </div>
                                </div>
                                <div className="orderId">
                                    <span>ORDER # 405-8823807-0514728</span>
                                </div>
                            </div>
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div className="orderStatus">
                                    <h5 className="card-title">Delivered</h5>
                                    <div className="card-content d-flex align-items-center">
                                        <img className='me-4' src="./images/category1.jpg" style={{ height: '100px', width: '100px' }} alt="" />
                                        <div className="productName">
                                            <p>Shoes</p>
                                            <button className="btn btn-sm btn-warning"><BsArrowRepeat className='fs-5 me-1' /> Buy it again</button>
                                            <button className="btn btn-light btn-sm border shadow-sm ms-2">View your item</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="someBtns d-flex align-items-center flex-column">
                                    <button className="btn btn-light btn-sm border shadow-sm mb-2" style={{ width: '220px' }}>Track package</button>
                                    <button className="btn btn-light btn-sm border shadow-sm" style={{ width: '220px' }}>Write a product review</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 mb-3">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center pb-0">
                                <div className="orderInfo d-flex">
                                    <div className="orderPlaced">
                                        <span style={{ fontSize: '14px' }}>ORDER PLACED</span>
                                        <p>8 February 2023</p>
                                    </div>
                                    <div className="total mx-5">
                                        <span style={{ fontSize: '14px' }}>TOTAL</span>
                                        <p>Rs.</p>
                                    </div>
                                    <div className="shipTo">
                                        <span style={{ fontSize: '14px' }}>SHIP TO</span>
                                        <p>Vishnu Saini</p>
                                    </div>
                                </div>
                                <div className="orderId">
                                    <span>ORDER # 405-8823807-0514728</span>
                                </div>
                            </div>
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div className="orderStatus">
                                    <h5 className="card-title">Refunded</h5>
                                    <div className="card-content d-flex align-items-center">
                                        <img className='me-4' src="./images/category3.jpg" style={{ height: '100px', width: '100px' }} alt="" />
                                        <div className="productName">
                                            <p>Shirts</p>
                                            <button className="btn btn-sm btn-warning"><BsArrowRepeat className='fs-5 me-1' /> Buy it again</button>
                                            <button className="btn btn-light btn-sm border shadow-sm ms-2">View your item</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="someBtns d-flex align-items-center flex-column">
                                    <button className="btn btn-warning btn-sm border shadow-sm mb-2" style={{ width: '220px' }}>View return/refund status</button>
                                    <button className="btn btn-light btn-sm border shadow-sm" style={{ width: '220px' }}>Write a product review</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order