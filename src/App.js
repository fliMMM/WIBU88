import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import ProductContextProvider from "./context/ProductContext";
import CartContextProvider from "./context/CartContext";
import OrderContextProvider from "./context/OrderContext";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "./components/AppLayouts/Header/Header";
import { SnackbarProvider } from "notistack";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
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
const ThanhToan = React.lazy(() => import("./pages/ThanhToan/index"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  const {
    authState: { isAuthenticated}
  } = useContext(AuthContext);
  return (
    <div style={{ position: "relative" }}>
      <SnackbarProvider maxSnack={4}>
        <ProductContextProvider>
          <CartContextProvider>
            <OrderContextProvider>
              <Header />
              <Suspense fallback={<CircularProgress />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="sign-up" element={<DangKi />} />
                  <Route path="sign-in" element={<DangNhap />} />
                  <Route path="products" element={<Products />}>
                    <Route path=":id" element={<ProductDetail />} />
                  </Route>


                  {isAuthenticated && <Route path="cart" element={<Cart />} />}
                  {isAuthenticated && (
                    <Route path="user-profile" element={<User />} />
                  )}
                  {isAuthenticated && (
                    <Route path="order" element={<ThanhToan />} />
                  )}
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </OrderContextProvider>
          </CartContextProvider>
        </ProductContextProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
