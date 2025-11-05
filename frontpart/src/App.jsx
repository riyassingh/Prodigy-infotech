import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './Pages/Home';
import Footer from './components/Footer';
import ProductListing from './Pages/ProductListing';
import ProductDetail from './Pages/ProductDetails';
import ForgotPassword from './Pages/ForgotPassword';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Cart from './Pages/Cart';
import Verify from './Pages/verify/index';
import Checkout from './Pages/Checkout';

import toast, { Toaster } from 'react-hot-toast';
import MyAccount from './Pages/MyAccount';
import WishList from './Pages/WishList';
import Order from './Pages/Order';
import VerifyEmail from './Pages/verify1';
import SendVerificationEmail from './Pages/sendverify';
//const apiUrl = process.env.REACT_APP_API_URL


export const AuthContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(true); // ✅ Consistent state name

  
  const alertBox = (status, msg) => {
    if (status === 'success') toast.success(msg);
    if (status === 'error') toast.error(msg);
  };

  // ✅ Context Values
  const authValues = { alertBox, isLogin, setIsLogin };

  return (
    <BrowserRouter>
      <AuthContext.Provider value={authValues}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ProductListing" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Verify" element={<Verify />} />
          <Route path="/verify/:token" element={<VerifyEmail/>} />
          <Route path="/send-verification" element={<SendVerificationEmail/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/MyAccount" element={<MyAccount/>} />
          <Route path="/WishList" element={<WishList/>} />
          <Route path="/Order" element={<Order/>} />
        </Routes>
        <Footer />
        <Toaster />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;