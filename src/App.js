import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import ProductContextProvider from "./context/ProductContext";
import CartContextProvider from "./context/CartContext";
import CircularProgress from '@mui/material/CircularProgress';
import Header from "./components/AppLayouts/Header/Header";
import Loadding from "./components/Loadding";
//import Footer from './AppLayouts/Footer/Footer'
import Home from "./pages/Home/Home";
const DangKi = React.lazy(() => import("./pages/DangKi/Dangki"));
const DangNhap = React.lazy(() => import("./pages/DangNhap/Dangnhap"));
const Cart = React.lazy(() => import("./pages/Cart/Cart"));
const User = React.lazy(() => import("./pages/UserAccount/User"));
const Products = React.lazy(() => import("./pages/Products/Products"));
const ProductDetail = React.lazy(() =>
  import("./pages/ProductDetail/ProductDetail")
);
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  return (
    <div style={{ position: "relative" }}>
      <AuthContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <Header />
            <Suspense fallback={<CircularProgress />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="sign-up" element={<DangKi />} />
                <Route path="sign-in" element={<DangNhap />} />
                <Route path="cart" element={<Cart />} />
                <Route path="user-profile" element={<User />} />
                <Route path="products" element={<Products />}>
                  <Route path=":id" element={<ProductDetail />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            {/* <Footer/> */}
          </CartContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
