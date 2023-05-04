import React, { useState, useEffect } from 'react';
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { useAuth } from '../../context/auth';
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancel"]);
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/all-orders");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
                status: value,
            });
            getOrders();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="container px-5 my-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All Orders</h1>
                        {/* {JSON.stringify(orders,null, 4)} */}
                        {orders?.map((o, i) => {
                            return (
                                <>
                                    <div className="border shadow" key={o?._id}>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">CUSTOMER NAME</th>
                                                    <th scope="col">PAYMENT STATUS</th>
                                                    <th scope="col">AMOUNT</th>
                                                    <th scope='col'>ORDER DATE</th>
                                                    <th scope="col">QUANTITY</th>
                                                    <th scope="col">STATUS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                    <td>{o?.payment.transaction.amount}</td>
                                                    <td>{moment(o?.createAt).calendar()}</td>
                                                    <td>{o?.products?.length}</td>
                                                    <td>
                                                        <Select
                                                            bordered={false}
                                                            onChange={(value) => handleChange(o?._id, value)}
                                                            defaultValue={o?.status}
                                                        >
                                                            {status.map((s, i) => (
                                                                <Option key={i} value={s}>
                                                                    {s}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </td>
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
                                    <br />
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminOrders;