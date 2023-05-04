import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/AdminMenu';
import toast from 'react-hot-toast';
import axios from "axios";
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from "antd";
import { AiFillDelete } from "react-icons/ai"
import { IoCreateOutline } from "react-icons/io5"

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    //handle form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/category/create-category", { name });
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form!");
        }
    };

    // get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName });
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    };

    //delete category
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${id}`);
            if (data.success) {
                toast.success(`Category is deleted`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <>
            <div className="container my-5 px-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className="p-3 w-50">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <>
                                            <tr >
                                                <td key = {c._id}>{c.name}</td>
                                                <td>
                                                    <button className="btn btn-primary ms-2" onClick={() => {
                                                        setVisible(true); setUpdatedName(c.name);
                                                        setSelected(c);
                                                    }}><IoCreateOutline /> Edit</button>
                                                    <button className="btn btn-danger ms-2" onClick={() => handleDelete(c._id)}><AiFillDelete /> Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default CreateCategory;