import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { HiShoppingCart } from 'react-icons/hi';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import SearchInput from './Form/SearchInput';
import useCategory from '../hooks/useCategory';
import { useCart } from "../context/cart";
import { Badge } from 'antd';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    localStorage.removeItem('auth');
    toast.success("Logout Successfully");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container px-5">
          <Link className="navbar-brand fw-bold fs-4" to="/">E-Dukan</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="">Man</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="">Woman</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="">Kids</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to={"/categories"} data-bs-toggle="dropdown">
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to={"/categories"}>All Categories</Link></li>
                  {categories?.map(c => (
                    <li key={c._id}><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
                  ))}
                </ul>
              </li>
            </ul>

            {/* <div className="input-group me-4" style={{ width: '45%' }} >
              <input type="text" className="form-control" placeholder="Search Product" aria-label="Search Product" aria-describedby="basic-addon2" />
              <span className="input-group-text" id="basic-addon2">
                <BsSearch />
              </span>
            </div> */}

            <div className="me-auto">
              <SearchInput />
            </div>

            <NavLink to="wishlist">
              <AiFillHeart className='fs-2 fw-light me-3' />
            </NavLink>
            <NavLink to="cart" className="position-relative">
              {/* <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                {cart?.length}
                <span class="visually-hidden">unread messages</span>
              </span> */}
              <Badge count={cart?.length} showZero>
                <HiShoppingCart className='fs-2 fw-light me-3' />
              </Badge>
            </NavLink>
            {
              !auth.user ? (
                <>
                  <NavLink to="/register" className="btn btn-dark text-white btn-sm me-3">Register</NavLink>
                  <NavLink to="/login" className="btn btn-dark text-white btn-sm">Login</NavLink>
                </>
              ) : (
                <>
                  <li className="navbar-nav nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} >Dashboard</NavLink>
                      </li>
                      <li>
                        <NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout</NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )
            }
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;