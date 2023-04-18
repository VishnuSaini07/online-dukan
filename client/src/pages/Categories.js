import React, { useState, useEffect } from 'react';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();

    return (
        <>
            <div className="container my-5 px-5">
                <h1 className='text-center'>All Categories</h1>
                <div className="row gap-3 my-5">
                    {categories?.map(c => (
                        <Link to={`/category/${c.slug}`} className="col border rounded p-5" key={c._id}>
                            <p className='text-uppercase fs-4 fw-bold' >{c.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Categories;