import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <>
            <div className="container">
                <div className="list-group">
                    <h4>Admin Panel</h4>
                    <NavLink to="/dashboard/admin/create-category" type="button" className="list-group-item list-group-item-action">Create Category</NavLink>
                    <NavLink to="/dashboard/admin/create-product" type="button" className="list-group-item list-group-item-action">Create Product</NavLink>
                    <NavLink to="/dashboard/admin/products" type="button" className="list-group-item list-group-item-action">Products</NavLink>
                    <NavLink to="/dashboard/admin/orders" type="button" className="list-group-item list-group-item-action">Orders</NavLink>
                    <NavLink to="/dashboard/admin/users" type="button" className="list-group-item list-group-item-action">Users</NavLink>
                </div>
            </div>
        </>
    );
};

export default AdminMenu;