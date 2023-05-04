import React, { useState, useEffect } from 'react';
import axios from "axios";
import AdminMenu from '../../components/AdminMenu';
import { useAuth } from '../../context/auth';
import { AiFillDelete } from "react-icons/ai";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [auth, setAuth] = useAuth();

    //get all users
    const getAllUsers = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/all-users");
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <>
            <div className="container my-5 px-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All Users</h1>
                        <div className="border shadow">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        {/* <th scope='col'>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.map((u, i) => (
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{u?.name}</td>
                                            <td>{u?.email}</td>
                                            {/* <td><AiFillDelete /></td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;