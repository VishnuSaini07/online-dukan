import React from 'react'
import AdminMenu from '../../components/AdminMenu'

const Users = () => {
    return (
        <>
            <div className="container my-5 px-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All Users</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users