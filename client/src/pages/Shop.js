import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Checkbox, Radio } from "antd";
import Prices from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/cart";
import toast from 'react-hot-toast';

const Shop = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);

    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data?.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    // get total count
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setProducts([...products, ...data?.products]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //filter by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter(c => c !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    // get filter product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`/api/v1/product/product-filters`, { checked, radio });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Helmet>
                <title>Shop</title>
            </Helmet>
            {/* <div className="container mt-5 px-5" style={{ height: '100%' }}>
                <h1>Shop</h1>
                <p style={{ width: '40%' }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut suscipit dolorem, consequuntur deserunt laudantium quam repellendus voluptatum quo atque commodi nulla sunt.</p>
                <div className="row row-2">
                    <div className="col-3">
                        <div className="filter py-5">
                            <p className='fs-4'>Filters <a href="/" className='text-secondary px-4 fs-6 text-decoration-underline'>Clear filters</a></p>
                            <h6 className='mb-3'>Categories</h6>
                            <div class="form-check">
                                <input class="form-check-input border-dark" type="checkbox" value="" id="Jeans" />
                                <label class="form-check-label" for="Jeans">
                                    Jeans
                                </label><br />
                                <input class="form-check-input border-dark" type="checkbox" value="" id="Shirts" />
                                <label class="form-check-label" for="Shirts">
                                    Shirts
                                </label><br />
                                <input class="form-check-input border-dark" type="checkbox" value="" id="Jackets" />
                                <label class="form-check-label" for="Jackets">
                                    Jackets
                                </label><br />
                                <input class="form-check-input border-dark" type="checkbox" value="" id="T-Shirts" />
                                <label class="form-check-label" for="T-Shirts">
                                    T-Shirts
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-9 py-5">
                        <div className="sortProduct d-flex flex-column">
                            <div className='d-flex align-items-center border border-dark rounded ms-auto' style={{ padding: '0 10px' }}>
                                <span className='text-secondary'>Sort by</span>
                                <div class="dropdown">
                                    <button class="btn text-dark dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Popular
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="/">Popular</a></li>
                                        <li><a class="dropdown-item" href="/">Newest</a></li>
                                        <li><a class="dropdown-item" href="/">Oldest</a></li>
                                    </ul>
                                </div>
                            </div>
                            <span className='mt-2 ms-auto'>Showing 1003 Products</span>
                        </div>
                        <div className="productList">
                            <div className="container mt-4">
                                <div className="row mb-4 mx-auto">
                                    <div className="col-md-4">
                                        <div className="card img rounded-0 border-0">
                                            <img src="/images/category1.jpg" className="card-img-top rounded-0" alt="..." />
                                            <div className="card-body px-0">
                                                <span className="card-text text-start fw-bold fs-4">Shoes</span>
                                                <p className="card-text text-start fw-normal fs-5 pt-0">Rs.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card img rounded-0 border-0">
                                            <img src="/images/category2.jpg" className="card-img-top rounded-0" alt="..." />
                                            <div className="card-body px-0">
                                                <span className="card-text text-start fw-bold fs-4">Jeans</span>
                                                <p className="card-text text-start fw-normal fs-5 pt-0">Rs.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card img rounded-0 border-0">
                                            <img src="/images/category3.jpg" className="card-img-top rounded-0" alt="..." />
                                            <div className="card-body px-0">
                                                <span className="card-text text-start fw-bold fs-4">Shirts</span>
                                                <p className="card-text text-start fw-normal fs-5 pt-0">Rs.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card img rounded-0 border-0">
                                            <img src="/images/category1.jpg" className="card-img-top rounded-0" alt="..." />
                                            <div className="card-body px-0">
                                                <span className="card-text text-start fw-bold fs-4">Shoes</span>
                                                <p className="card-text text-start fw-normal fs-5 pt-0">Rs.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card img rounded-0 border-0">
                                            <img src="/images/category2.jpg" className="card-img-top rounded-0" alt="..." />
                                            <div className="card-body px-0">
                                                <span className="card-text text-start fw-bold fs-4">Jeans</span>
                                                <p className="card-text text-start fw-normal fs-5 pt-0">Rs.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card img rounded-0 border-0">
                                            <img src="/images/category3.jpg" className="card-img-top rounded-0" alt="..." />
                                            <div className="card-body px-0">
                                                <span className="card-text text-start fw-bold fs-4">Shirts</span>
                                                <p className="card-text text-start fw-normal fs-5 pt-0">Rs.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card img rounded-0 border-0">
                                            <img src="/images/category1.jpg" className="card-img-top rounded-0" alt="..." />
                                            <div className="card-body px-0">
                                                <span className="card-text text-start fw-bold fs-4">Shoes</span>
                                                <p className="card-text text-start fw-normal fs-5 pt-0">Rs.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card img rounded-0 border-0">
                                            <img src="/images/category2.jpg" className="card-img-top rounded-0" alt="..." />
                                            <div className="card-body px-0">
                                                <span className="card-text text-start fw-bold fs-4">Jeans</span>
                                                <p className="card-text text-start fw-normal fs-5 pt-0">Rs.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card img rounded-0 border-0">
                                            <img src="/images/category3.jpg" className="card-img-top rounded-0" alt="..." />
                                            <div className="card-body px-0">
                                                <span className="card-text text-start fw-bold fs-4">Shirts</span>
                                                <p className="card-text text-start fw-normal fs-5 pt-0">Rs.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="loadproduct">
                                    <div className='d-flex justify-content-center'>
                                        <button className="btn border border-dark rounded-0 px-5 fs-5 mt-4 mb-5">Load more products</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="container px-5 my-5">
                <div className="row mt-3">
                    <p className='fs-4'>Filters <button className='text-secondary px-4 fs-6 text-decoration-underline border-0 bg-transparent' onClick={() => window.location.reload()}>Clear filters</button></p>

                    {/* <div className="position-relative">
                        <span className='position-absolute top-0 end-0 mt-2 ms-auto me-4'>Showing {total} Products</span>
                    </div> */}

                    <div className="col-md-3">
                        <h6 className='mb-3'>Categories</h6>
                        <div className="d-flex flex-column mb-2">
                            {categories?.map(c => (
                                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                    {c.name}
                                </Checkbox>
                            ))}
                        </div>

                        {/* price filter */}
                        <h6 className='my-3'>Price</h6>
                        <div className="d-flex flex-column mb-2">
                            <Radio.Group onChange={e => setRadio(e.target.value)}>
                                {Prices?.map(p => (
                                    <div key={p._id}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        {/* <div className="d-flex flex-column">
                            <button className='btn btn-danger btn-sm w-50' onClick={() => window.location.reload()}>Reset filter</button>
                        </div> */}
                    </div>
                    <div className="col-md-9">
                        {/* <h1 className="text-center">All Products</h1> */}



                        <div className="row mb-4 mx-auto">
                            {products?.map(p => (
                                <>
                                    <div className="col-md-4 mb-5">
                                        <div className="card img rounded-2 border-0" >
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

                                    {/* <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                                        <img src="" className="card-img-top" alt="" />
                                        <div className="card-body">
                                            <h5 className="card-title"></h5>
                                            <p className="card-text">{p.description.substring(0, 30)}...</p>
                                            <p className="card-text"></p>
                                            <button className="btn btn-primary" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                            <button className="btn btn-warning ms-1" onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem('cart', JSON.stringify([...cart, p]));
                                                toast.success("Item Added to Cart");
                                            }}>ADD TO CART</button>
                                        </div>
                                    </div> */}
                                </>
                            ))}
                        </div>
                        <div className='m-2 p-3 text-center'>
                            {products && products.length < total && (
                                <button className="btn border border-dark rounded-0 px-5 fs-5 mt-4 mb-5" onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}>
                                    {loading ? "Loading..." : "Load more products"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shop;