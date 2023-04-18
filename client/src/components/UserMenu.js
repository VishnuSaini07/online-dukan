import React from 'react'
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
    return (
        <>
            <div className="container">
                <div className="list-group">
                    <h4>Dashboard</h4>
                    <NavLink to="/dashboard/user/profile" type="button" className="list-group-item list-group-item-action">Profile</NavLink>
                    <NavLink to="/dashboard/user/orders" type="button" className="list-group-item list-group-item-action">Orders</NavLink>
                </div>
            </div>
        </>
    )
}

export default UserMenu