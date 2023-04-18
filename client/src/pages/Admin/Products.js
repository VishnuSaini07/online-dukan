import React, { useState, useEffect } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import AdminMenu from '../../components/AdminMenu';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios("/api/v1/product/get-product");
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <>
            <div className="container my-5 px-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All Products List</h1>
                        <div className="d-flex flex-wrap">
                            {products?.map(p => (
                                <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id}>
                                    <div className="card m-2" style={{ width: "18rem" }}>
                                        <img src={`/api/v1/product/product-image/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;