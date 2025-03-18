import './App.css';
import React, { useState } from 'react';
import Home from './components/home/Home';
import {  Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import ProductDetail from './components/product/ProductDetail';
import Cart from './components/cart/Cart';
import CategoryView from './components/category/CategoryView';
import Login from './components/Login';

function App() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  )
  return (
    <>
    <Header cart={cart}/>
      <Routes>
        <Route path="/" element={<Home setCart={setCart} />} />
        <Route path="/product/:slug" element={<ProductDetail setCart={setCart} />}/>
        <Route path="/category/:categorySlug" element={<CategoryView />} />
        <Route path="/login" element={<Login />} />
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    <Footer/>
    </>
  );
}

export default App;
