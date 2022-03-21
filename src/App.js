import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./AppLayouts/Header/Header";
// import Footer from "./AppLayouts/Footer/Footer";
import DangNhap from "./pages/DangNhap/Dangnhap";
import DangKi from "./pages/DangKi/Dangki";
import Cart from "./pages/Cart/Cart";
import User from "./pages/UserAccount/User";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import NotFound from "./pages/NotFound/NotFound";
import Products from "./pages/Products/Products";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/WIBU88" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="sign-up" element={<DangKi />} />
        <Route path="sign-in" element={<DangNhap />} />
        <Route path="cart" element={<Cart />} />
        <Route path="user-profile" element={<User />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
