import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import toast from 'react-hot-toast';

const Cart = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => { total = total + item.price; });
            return total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR"
            });
        } catch (error) {
            console.log(error);
        }
    };

    //delete item from cart
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    //get paymment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/braintree/token");
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getToken();
    }, [auth?.token]);

    //handle payments
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post('/api/v1/product/braintree/payment', {
                nonce, cart
            });
            setLoading(false);
            localStorage.removeItem('cart');
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success("Payment successfully");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Cart</title>
            </Helmet>
            <div className="container my-5 px-5">
                <div className="row">
                    <div className="col-md-12">
                        <h4 className='text-center '>
                            {cart?.length ? `You have ${cart.length} items  in your cart ${auth?.token ? "" : "Please login to checkout"}` : "Your cart is empty"}
                        </h4>
                    </div>
                </div>

                <h1>Your Cart</h1>
                <div className="row">
                    <div className="col-md-6">
                        <p>Not ready to checkout? Continue shopping</p>
                        <div className="col-md-12">
                            {cart?.map(p => (
                                <>
                                    <div className="card mb-3" style={{ maxWidth: '540px' }} key={p._id}>
                                        <div className="row g-0">
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
                                                        <span className='pt-3 text-secondary fs-6 text-decoration-underline' style={{ cursor: 'pointer' }} onClick={() => removeCartItem(p._id)}>Remove</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-6" style={{ width: '40%' }}>
                        <h4>Order summary</h4>
                        <div className="orderDetail mb-2 d-flex justify-content-between">
                            <span>Subtotal</span>
                            <span>Rs.</span>
                        </div>
                        <div className="shipping charges d-flex justify-content-between">
                            <span>Shipping</span>
                            <span>Calculated at the next step</span>
                        </div>
                        <hr style={{ width: '100%' }} />
                        <div className="total charges d-flex justify-content-between">
                            <span>Total</span>
                            <span>{totalPrice()}</span>
                        </div>
                        {/* <button className='btn btn-dark mt-5 w-100 mb-3' style={{ padding: '15px 150px' }}>Continue to checkout</button> */}
                        {auth?.user?.address ? (
                            <>
                                <div className="my-3">
                                    <h4>Current Address : {auth?.user?.address}</h4>
                                    <button className='btn btn-outline-warning' onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {
                                    auth?.token ? (
                                        <button className='btn btn-outline-warning' onClick={() => navigate("/dashboard/user/profile")} >Update Address</button>
                                    ) : (
                                        <button className='btn btn-outline-warning' onClick={() => navigate("/login", {
                                            state: '/cart'
                                        })} >Please login to checkout</button>
                                    )
                                }
                            </div>
                        )}
                        <div className="mt-3">
                            {
                                !clientToken || !cart?.length ? ("") : (
                                    <>
                                        <DropIn options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: 'vault'
                                            }
                                        }}
                                            onInstance={(instance) => setInstance(instance)} />
                                        <button className='btn btn-primary' onClick={handlePayment} disabled={loading || !instance || !auth?.user?.address}>{loading ? "Processing..." : "Make Payment"}</button>
                                    </>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;