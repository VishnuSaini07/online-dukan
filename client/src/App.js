import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Payments from './pages/Payments';
import Returns from './pages/Returns';
import FAQ from './pages/FAQ';
import ScrollToTop from './pages/ScrollToTop';
import Order from './pages/Order';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import toast, { Toaster } from 'react-hot-toast';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import AdminOrders from './pages/Admin/AdminOrders';

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/category/:slug' element={<CategoryProduct />} />
            <Route path='/dashboard' element={<PrivateRoute />}>
              <Route path='user' element={<Dashboard />} />
              <Route path='user/orders' element={<Orders />} />
              <Route path='user/profile' element={<Profile />} />
            </Route>
            <Route path='/dashboard' element={<AdminRoute />}>
              <Route path='admin' element={<AdminDashboard />} />
              <Route path='admin/create-category' element={<CreateCategory />} />
              <Route path='admin/create-product' element={<CreateProduct />} />
              <Route path='admin/product/:slug' element={<UpdateProduct />} />
              <Route path='admin/products' element={<Products />} />
              <Route path='admin/users' element={<Users />} />
              <Route path='admin/orders' element={<AdminOrders />} />
            </Route>
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/login' element={<Login />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path='/product/:slug' element={<ProductDetail />} />
            <Route path='shop' element={<Shop />} />
            <Route path='wishlist' element={<Wishlist />} />
            <Route path='cart' element={<Cart />} />
            <Route path='payments' element={<Payments />} />
            <Route path='returns' element={<Returns />} />
            <Route path='faq' element={<FAQ />} />
            <Route path='order' element={<Order />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;