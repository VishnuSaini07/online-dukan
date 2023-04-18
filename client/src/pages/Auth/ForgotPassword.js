import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/v1/auth/forgot-password", { email, newPassword, answer });

            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <div className="container my-5 d-flex align-items-center justify-content-center flex-column">
                <h1>Forgot Password</h1>
                <form style={{ width: '400px' }} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Enter your secret answer</label>
                        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" required />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Reset</button>
                </form>
            </div>
        </>
    )
}

export default ForgotPassword