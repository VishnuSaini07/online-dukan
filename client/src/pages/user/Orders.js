import React, { useState, useEffect } from 'react';
import UserMenu from '../../components/UserMenu';
import axios from "axios";
import { BsArrowRepeat } from 'react-icons/bs';
import { useAuth } from '../../context/auth';
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/orders");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    return (
        <>
            <div className="container my-5 px-5">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All Orders</h1>
                        <div className="row mt-4">
                            {orders?.map((o, i) => {
                                return (
                                    <div className="border shadow">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Buyer</th>
                                                    <th scope="col"> date</th>
                                                    <th scope="col">Payment</th>
                                                    <th scope="col">Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{o?.status}</td>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>{moment(o?.createAt).fromNow()}</td>
                                                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                    <td>{o?.products?.length}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="container">
                                            {o?.products?.map((p, i) => (
                                                <div className="row mb-2 card flex-row" key={p._id}>
                                                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                                                        {/* <img src="./images/category1.jpg" className="img-fluid rounded-start" alt="..." style={{ height: '100%' }} /> */}
                                                        <img src={`/api/v1/product/product-image/${p._id}`} className="img-fluid rounded-start" alt={p.name} style={{ height: '100%' }} />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body mt-2 d-flex flex-column" >
                                                            <h4 className="card-title">{p.name}</h4>
                                                            <p className="card-text">{p.description.substring(0, 30)}...</p>

                                                            {/* <span>Size: L</span> */}
                                                            <div className="quantVendor d-flex justify-content-between">
                                                                <span>Quantity: 1</span>
                                                            </div>
                                                            <div className="priceRemove pt-2 d-flex justify-content-between">
                                                                <h4>Rs. {p.price}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Orders;