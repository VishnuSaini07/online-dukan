import React from 'react'
import UserMenu from "../../components/UserMenu";
import { useAuth } from '../../context/auth';

const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <>
            <div className="container my-5 px-5">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h3>{auth?.user?.name}</h3>
                            <h3>{auth?.user?.email}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard