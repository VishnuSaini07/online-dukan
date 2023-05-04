import React from 'react'
import { useSearch } from "../context/Search"
import toast from 'react-hot-toast';
import { useCart } from "../context/cart";
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [values, setValues] = useSearch();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

  return (
      <>
          <div className="container">
              <div className="text-center">
                  <h1>Search Results</h1>
                  <h6>{values?.results.length < 1 ? "No Products Found" : `Found ${values?.results.length}`}</h6>
                  <div className="d-flex flex-wrap mt-4">
                      {values?.results.map(p => (
                          <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                              {/* <img src={`/api/v1/product/product-image/${p._id}`} className="card-img-top" alt={p.name} /> */}
                              <img src={`/api/v1/product/product-image/${p._id}`} className="card-img-top rounded-0" onClick={() => navigate(`/product/${p.slug}`)} alt={p.name} />
                              <div className="card-body">
                                  <h5 className="card-title">{p.name}</h5>
                                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                                  <p className="card-text">₹{p.price}</p>
                                  {/* <button className="btn btn-primary">More Details</button>
                                  <button className="btn btn-warning ms-1">ADD TO CART</button> */}
                                  <button className="btn btn-warning" onClick={() => {
                                      setCart([...cart, p]);
                                      localStorage.setItem('cart', JSON.stringify([...cart, p]));
                                      toast.success("Item Added to Cart");
                                  }}>ADD TO CART</button>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </>
  )
}

export default Search