import React from 'react'
import { useSearch } from "../context/Search"

const Search = () => {
    const [values, setValues] = useSearch()
  return (
      <>
          <div className="container">
              <div className="text-center">
                  <h1>Search Results</h1>
                  <h6>{values?.results.length < 1 ? "No Products Found" : `Found ${values?.results.length}`}</h6>
                  <div className="d-flex flex-wrap mt-4">
                      {values?.results.map(p => (
                          <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                              <img src={`/api/v1/product/product-image/${p._id}`} className="card-img-top" alt={p.name} />
                              <div className="card-body">
                                  <h5 className="card-title">{p.name}</h5>
                                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                                  <p className="card-text">₹{p.price}</p>
                                  <button className="btn btn-primary">More Details</button>
                                  <button className="btn btn-warning ms-1">ADD TO CART</button>
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