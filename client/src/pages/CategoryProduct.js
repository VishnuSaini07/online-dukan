import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from "../context/cart";
import toast from 'react-hot-toast';

const CategoryProduct = () => {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart();
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (params.slug) getProductsByCat();
    }, [params.slug]);

    const getProductsByCat = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="container my-5 px-5">
                <h1>Category - {category?.name}</h1>
                <h4>{products?.length} result found</h4>
                <div className="row mb-4 mx-auto">
                        {products?.map(p => (
                            <>
                                <div className="col-md-4 mb-5">
                                    <div className="card img rounded-2 border-0" style={{width: "18rem"}} >
                                            <img src={`/api/v1/product/product-image/${p._id}`} className="card-img-top rounded-0" onClick={() => navigate(`/product/${p.slug}`)} alt={p.name} />
                                            <div className="card-body px-0">
                                                <span className="card-text text-start fw-bold fs-3">{p.name}</span><br />
                                                <span className="card-text text-secondary">{p.description.substring(0, 30)}...</span><br />
                                                <span className="card-text text-start fw-normal fs-4 pt-3">₹{p.price}</span>
                                            </div>
                                            <button className="btn btn-warning" onClick={() => {
                                                setCart([...cart, p]);
                                            localStorage.setItem('cart', JSON.stringify([...cart, p]));
                                            toast.success("Item Added to Cart");
                                            }}>ADD TO CART</button>
                                        </div>
                                    </div>
                                </>
                        ))}
                </div>
            </div>
        </>
    );
};

export default CategoryProduct;