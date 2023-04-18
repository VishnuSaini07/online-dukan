import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state ||"/");
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
        <h1>Login Page</h1>
        <form style={{ width: '400px' }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" required />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-2">Sign In</button>
          <button type="submit" onClick={() => {navigate('/forgot-password')}} className="btn btn-primary w-100">Forgot Password?</button>
        </form>
      </div>
    </>
  )
}

export default Login