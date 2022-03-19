import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./AppLayouts/Header/Header";
import DangNhap from "./pages/DangNhap/Dangnhap";
import DangKi from "./pages/DangKi/Dangki";
import Cart from "./pages/Cart/Cart";
import User from "./pages/UserAccount/User";
import Home from "./pages/Home/Home";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<DangKi />} />
        <Route path="/sign-in" element={<DangNhap />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user-profile" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
